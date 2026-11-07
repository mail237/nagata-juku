import type { GengokaSession } from '../types';

export function startOfTodayMs(now = new Date()): number {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

export function shouldResetClassroom(
  session: GengokaSession | null,
  questionId: string,
  now = new Date(),
): boolean {
  if (!session) return true;
  if (session.questionId !== questionId) return true;
  if (session.createdAt < startOfTodayMs(now)) return true;
  if (session.phase === 'done') return true;
  return false;
}
