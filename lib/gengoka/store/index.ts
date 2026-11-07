'use client';

export { isLocalDemoMode } from '../config';
export { subscribeLocalStore } from './local-store';
export { allVoted, allReasonsSubmitted, countChoices } from './utils';

import type { Choice } from '../types';
import type { GengokaSession, StudentProfile } from '../types';
import { isLocalDemoMode } from '../config';
import { getTodaysQuestionId } from '../questions';
import {
  ensureLocalClassroom,
  openLocalClassroom,
  getLocalSession,
  getLocalStudent,
  joinLocalSession,
  pickLocalMvp,
  revealLocalDistribution,
  submitLocalReason,
  submitLocalVote,
  upsertLocalStudent,
  subscribeLocalStore,
} from './local-store';
import { CLASSROOM_CODE } from '../constants';
import {
  ensureFirestoreClassroom,
  openFirestoreClassroom,
  getFirestoreSession,
  getFirestoreStudent,
  joinFirestoreSession,
  pickFirestoreMvp,
  revealFirestoreDistribution,
  subscribeFirestoreSession,
  submitFirestoreReason,
  submitFirestoreVote,
} from './firestore-store';

export { CLASSROOM_CODE };

export async function openClassroom(questionId: string): Promise<GengokaSession> {
  if (isLocalDemoMode()) return openLocalClassroom(questionId);
  return openFirestoreClassroom(questionId);
}

/** 今日の問いでセッションを自動準備（先生操作なし） */
export async function ensureClassroomSession(
  questionId = getTodaysQuestionId(),
): Promise<GengokaSession> {
  if (isLocalDemoMode()) return ensureLocalClassroom(questionId);
  return ensureFirestoreClassroom(questionId);
}

export async function getSession(code: string): Promise<GengokaSession | null> {
  if (isLocalDemoMode()) return getLocalSession(code);
  return getFirestoreSession(code);
}

export function subscribeSession(
  code: string,
  onData: (session: GengokaSession | null) => void,
): () => void {
  if (isLocalDemoMode()) {
    onData(getLocalSession(code));
    return subscribeLocalStore(() => onData(getLocalSession(code)));
  }
  return subscribeFirestoreSession(code, onData);
}

export async function getStudent(
  studentId: string,
): Promise<StudentProfile | null> {
  if (isLocalDemoMode()) return getLocalStudent(studentId);
  return getFirestoreStudent(studentId);
}

export async function saveStudent(profile: StudentProfile): Promise<void> {
  if (isLocalDemoMode()) {
    upsertLocalStudent(profile);
    return;
  }
  const { setDoc, doc, getFirestore } = await import('firebase/firestore');
  const { initializeApp, getApps } = await import('firebase/app');
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  };
  const app = getApps().length ? getApps()[0] : initializeApp(config);
  const db = getFirestore(app);
  await setDoc(doc(db, 'gengoka_students', profile.id), profile);
}

export async function joinSession(
  code: string,
  studentId: string,
  grade: string,
  nickname: string,
): Promise<GengokaSession | null> {
  if (isLocalDemoMode()) return joinLocalSession(code, studentId, grade, nickname);
  return joinFirestoreSession(code, studentId, grade, nickname);
}

export async function submitVote(
  code: string,
  studentId: string,
  choice: Choice,
): Promise<GengokaSession | null> {
  if (isLocalDemoMode()) return submitLocalVote(code, studentId, choice);
  return submitFirestoreVote(code, studentId, choice);
}

export async function revealDistribution(
  code: string,
): Promise<GengokaSession | null> {
  if (isLocalDemoMode()) return revealLocalDistribution(code);
  return revealFirestoreDistribution(code);
}

export async function submitReason(
  code: string,
  studentId: string,
  reasonPart1: string,
  reasonPart2: string,
): Promise<GengokaSession | null> {
  if (isLocalDemoMode()) {
    return submitLocalReason(code, studentId, reasonPart1, reasonPart2);
  }
  return submitFirestoreReason(code, studentId, reasonPart1, reasonPart2);
}

export async function pickMvp(
  code: string,
  studentId: string,
): Promise<GengokaSession | null> {
  if (isLocalDemoMode()) return pickLocalMvp(code, studentId);
  return pickFirestoreMvp(code, studentId);
}
