'use client';

import type {
  GengokaSession,
  SessionResponse,
  StudentProfile,
} from '../types';
import { CLASSROOM_CODE } from '../constants';
import { shouldResetClassroom } from './session-life';
import { allVoted } from './utils';

const STORAGE_KEY = 'gengoka-local-store-v1';
const CHANNEL_NAME = 'gengoka-local-store-v1';

type Persisted = {
  sessions: Record<string, GengokaSession>;
  students: Record<string, StudentProfile>;
};

function emptyPersisted(): Persisted {
  return { sessions: {}, students: {} };
}

function readPersisted(): Persisted {
  if (typeof window === 'undefined') return emptyPersisted();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyPersisted();
    return JSON.parse(raw) as Persisted;
  } catch {
    return emptyPersisted();
  }
}

function writePersisted(data: Persisted): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  if (typeof BroadcastChannel !== 'undefined') {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage({ type: 'update' });
    channel.close();
  }
}

function mutate(mutator: (data: Persisted) => void): Persisted {
  const data = readPersisted();
  mutator(data);
  writePersisted(data);
  return data;
}

export function subscribeLocalStore(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => undefined;

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange();
  };
  window.addEventListener('storage', onStorage);

  let channel: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== 'undefined') {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = () => onChange();
  }

  return () => {
    window.removeEventListener('storage', onStorage);
    channel?.close();
  };
}

export function getLocalSession(code: string): GengokaSession | null {
  return readPersisted().sessions[code] ?? null;
}

export function getLocalStudent(studentId: string): StudentProfile | null {
  return readPersisted().students[studentId] ?? null;
}

export function ensureLocalClassroom(questionId: string): GengokaSession {
  const existing = getLocalSession(CLASSROOM_CODE);
  if (!shouldResetClassroom(existing, questionId)) {
    return existing!;
  }
  return openLocalClassroom(questionId);
}

export function openLocalClassroom(questionId: string): GengokaSession {
  const session: GengokaSession = {
    code: CLASSROOM_CODE,
    questionId,
    phase: 'voting',
    distributionRevealedAt: null,
    mvpStudentId: null,
    createdAt: Date.now(),
    responses: {},
  };

  mutate((d) => {
    d.sessions[CLASSROOM_CODE] = session;
  });

  return session;
}

export function upsertLocalStudent(profile: StudentProfile): void {
  mutate((d) => {
    d.students[profile.id] = profile;
  });
}

export function joinLocalSession(
  code: string,
  studentId: string,
  grade: string,
  nickname: string,
): GengokaSession | null {
  const session = getLocalSession(code);
  if (!session) return null;

  mutate((d) => {
    const s = d.sessions[code];
    if (!s) return;
    if (!s.responses[studentId]) {
      s.responses[studentId] = {
        studentId,
        grade,
        nickname,
        choice: null,
        reasonPart1: '',
        reasonPart2: '',
        votedAt: null,
        reasonSubmittedAt: null,
      };
    }
  });

  return getLocalSession(code);
}

export function submitLocalVote(
  code: string,
  studentId: string,
  choice: SessionResponse['choice'],
): GengokaSession | null {
  const session = getLocalSession(code);
  if (!session || session.phase !== 'voting') return null;
  const existing = session.responses[studentId];
  if (!existing || existing.choice !== null) return null;

  mutate((d) => {
    const s = d.sessions[code];
    const r = s?.responses[studentId];
    if (!s || !r || r.choice !== null) return;
    r.choice = choice;
    r.votedAt = Date.now();
  });

  const updated = getLocalSession(code);
  if (updated && allVoted(updated.responses)) {
    revealLocalDistribution(code);
  }

  return getLocalSession(code);
}

export function revealLocalDistribution(code: string): GengokaSession | null {
  const session = getLocalSession(code);
  if (!session || session.phase !== 'voting') return null;

  mutate((d) => {
    const s = d.sessions[code];
    if (!s) return;
    s.phase = 'writing';
    s.distributionRevealedAt = Date.now();
  });

  return getLocalSession(code);
}

export function submitLocalReason(
  code: string,
  studentId: string,
  reasonPart1: string,
  reasonPart2: string,
): GengokaSession | null {
  const session = getLocalSession(code);
  if (!session || session.phase !== 'writing') return null;
  const existing = session.responses[studentId];
  if (!existing || existing.reasonSubmittedAt !== null) return null;

  mutate((d) => {
    const s = d.sessions[code];
    const r = s?.responses[studentId];
    if (!s || !r || r.reasonSubmittedAt !== null) return;
    r.reasonPart1 = reasonPart1.trim();
    r.reasonPart2 = reasonPart2.trim();
    r.reasonSubmittedAt = Date.now();
  });

  return getLocalSession(code);
}

export function pickLocalMvp(
  code: string,
  studentId: string,
): GengokaSession | null {
  const session = getLocalSession(code);
  if (!session || !session.responses[studentId]) return null;
  if (session.phase !== 'writing' && session.phase !== 'mvp') return null;

  mutate((d) => {
    const s = d.sessions[code];
    if (!s?.responses[studentId]) return;
    s.phase = 'mvp';
    s.mvpStudentId = studentId;

    const student = d.students[studentId];
    if (student) {
      student.stars += 1;
      student.updatedAt = Date.now();
    } else {
      const response = s.responses[studentId];
      d.students[studentId] = {
        id: studentId,
        grade: response.grade,
        nickname: response.nickname,
        stars: 1,
        updatedAt: Date.now(),
      };
    }
  });

  mutate((d) => {
    const s = d.sessions[code];
    if (s) s.phase = 'done';
  });

  return getLocalSession(code);
}
