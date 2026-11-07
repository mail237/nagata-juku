'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  type Firestore,
} from 'firebase/firestore';
import type {
  GengokaSession,
  SessionResponse,
  StudentProfile,
  Choice,
} from '../types';
import { CLASSROOM_CODE } from '../constants';
import { shouldResetClassroom } from './session-life';
import { allVoted } from './utils';

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

function getDb(): Firestore {
  if (db) return db;
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  if (!config.apiKey || !config.projectId) {
    throw new Error('Firebase is not configured');
  }
  app = getApps().length ? getApps()[0] : initializeApp(config);
  db = getFirestore(app);
  return db;
}

type SessionDoc = Omit<GengokaSession, 'responses'> & {
  responses: Record<string, SessionResponse>;
};

function sessionRef(code: string) {
  return doc(getDb(), 'gengoka_sessions', code);
}

function studentRef(studentId: string) {
  return doc(getDb(), 'gengoka_students', studentId);
}

function toSession(code: string, data: SessionDoc): GengokaSession {
  return {
    code,
    questionId: data.questionId,
    phase: data.phase,
    distributionRevealedAt: data.distributionRevealedAt,
    mvpStudentId: data.mvpStudentId,
    createdAt: data.createdAt,
    responses: data.responses ?? {},
  };
}

export async function getFirestoreSession(
  code: string,
): Promise<GengokaSession | null> {
  const snap = await getDoc(sessionRef(code));
  if (!snap.exists()) return null;
  return toSession(code, snap.data() as SessionDoc);
}

export function subscribeFirestoreSession(
  code: string,
  onData: (session: GengokaSession | null) => void,
): () => void {
  return onSnapshot(sessionRef(code), (snap) => {
    if (!snap.exists()) {
      onData(null);
      return;
    }
    onData(toSession(code, snap.data() as SessionDoc));
  });
}

export async function getFirestoreStudent(
  studentId: string,
): Promise<StudentProfile | null> {
  const snap = await getDoc(studentRef(studentId));
  if (!snap.exists()) return null;
  return snap.data() as StudentProfile;
}

export async function ensureFirestoreClassroom(
  questionId: string,
): Promise<GengokaSession> {
  const existing = await getFirestoreSession(CLASSROOM_CODE);
  if (!shouldResetClassroom(existing, questionId)) {
    return existing!;
  }
  return openFirestoreClassroom(questionId);
}

export async function openFirestoreClassroom(
  questionId: string,
): Promise<GengokaSession> {
  const session: SessionDoc = {
    code: CLASSROOM_CODE,
    questionId,
    phase: 'voting',
    distributionRevealedAt: null,
    mvpStudentId: null,
    createdAt: Date.now(),
    responses: {},
  };

  await setDoc(sessionRef(CLASSROOM_CODE), session);
  return toSession(CLASSROOM_CODE, session);
}

export async function joinFirestoreSession(
  code: string,
  studentId: string,
  grade: string,
  nickname: string,
): Promise<GengokaSession | null> {
  const ref = sessionRef(code);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const data = snap.data() as SessionDoc;
  if (!data.responses[studentId]) {
    const response: SessionResponse = {
      studentId,
      grade,
      nickname,
      choice: null,
      reasonPart1: '',
      reasonPart2: '',
      votedAt: null,
      reasonSubmittedAt: null,
    };
    await updateDoc(ref, {
      [`responses.${studentId}`]: response,
    });
  }

  return getFirestoreSession(code);
}

export async function submitFirestoreVote(
  code: string,
  studentId: string,
  choice: Choice,
): Promise<GengokaSession | null> {
  const session = await getFirestoreSession(code);
  if (!session || session.phase !== 'voting') return null;
  const existing = session.responses[studentId];
  if (!existing || existing.choice !== null) return null;

  await updateDoc(sessionRef(code), {
    [`responses.${studentId}.choice`]: choice,
    [`responses.${studentId}.votedAt`]: Date.now(),
  });

  const updated = await getFirestoreSession(code);
  if (updated && allVoted(updated.responses)) {
    await revealFirestoreDistribution(code);
  }

  return getFirestoreSession(code);
}

export async function revealFirestoreDistribution(
  code: string,
): Promise<GengokaSession | null> {
  const session = await getFirestoreSession(code);
  if (!session || session.phase !== 'voting') return null;

  await updateDoc(sessionRef(code), {
    phase: 'writing',
    distributionRevealedAt: Date.now(),
  });

  return getFirestoreSession(code);
}

export async function submitFirestoreReason(
  code: string,
  studentId: string,
  reasonPart1: string,
  reasonPart2: string,
): Promise<GengokaSession | null> {
  const session = await getFirestoreSession(code);
  if (!session || session.phase !== 'writing') return null;
  const existing = session.responses[studentId];
  if (!existing || existing.reasonSubmittedAt !== null) return null;

  await updateDoc(sessionRef(code), {
    [`responses.${studentId}.reasonPart1`]: reasonPart1.trim(),
    [`responses.${studentId}.reasonPart2`]: reasonPart2.trim(),
    [`responses.${studentId}.reasonSubmittedAt`]: Date.now(),
  });

  return getFirestoreSession(code);
}

export async function pickFirestoreMvp(
  code: string,
  studentId: string,
): Promise<GengokaSession | null> {
  const session = await getFirestoreSession(code);
  if (!session || !session.responses[studentId]) return null;

  const studentSnap = await getDoc(studentRef(studentId));
  const response = session.responses[studentId];

  if (studentSnap.exists()) {
    const student = studentSnap.data() as StudentProfile;
    await setDoc(studentRef(studentId), {
      ...student,
      stars: student.stars + 1,
      updatedAt: Date.now(),
    });
  } else {
    await setDoc(studentRef(studentId), {
      id: studentId,
      grade: response.grade,
      nickname: response.nickname,
      stars: 1,
      updatedAt: Date.now(),
    } satisfies StudentProfile);
  }

  await updateDoc(sessionRef(code), {
    phase: 'done',
    mvpStudentId: studentId,
  });

  return getFirestoreSession(code);
}
