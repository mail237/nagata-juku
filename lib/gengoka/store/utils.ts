import type { Choice } from '../types';

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateSessionCode(length = 4): string {
  let code = '';
  for (let i = 0; i < length; i += 1) {
    code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return code;
}

export function countChoices(
  responses: Record<string, { choice: Choice | null }>,
): Record<Choice, number> {
  const counts: Record<Choice, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const r of Object.values(responses)) {
    if (r.choice) counts[r.choice] += 1;
  }
  return counts;
}

export function allVoted(
  responses: Record<string, { choice: Choice | null }>,
): boolean {
  const list = Object.values(responses);
  return list.length > 0 && list.every((r) => r.choice !== null);
}

export function allReasonsSubmitted(
  responses: Record<string, { reasonSubmittedAt: number | null }>,
): boolean {
  const list = Object.values(responses);
  return list.length > 0 && list.every((r) => r.reasonSubmittedAt !== null);
}
