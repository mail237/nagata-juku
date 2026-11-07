const STORAGE_KEY = 'gengoka-student-id';

export type StoredLogin = {
  grade: string;
  nickname: string;
  rosterId: string;
};

export function getStudentId(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY) ?? '';
}

export function setStudentId(id: string): void {
  localStorage.setItem(STORAGE_KEY, id);
}

/** @deprecated 名簿登録生徒は setStudentId(rosterId) を使う */
export function getOrCreateStudentId(): string {
  const existing = getStudentId();
  if (existing) return existing;
  const id = crypto.randomUUID();
  setStudentId(id);
  return id;
}

export function getStoredLogin(): StoredLogin | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('gengoka-login');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredLogin;
  } catch {
    return null;
  }
}

export function saveLogin(grade: string, nickname: string, rosterId: string): void {
  setStudentId(rosterId);
  localStorage.setItem(
    'gengoka-login',
    JSON.stringify({ grade, nickname, rosterId } satisfies StoredLogin),
  );
}
