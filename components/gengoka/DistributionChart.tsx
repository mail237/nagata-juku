'use client';

import type { Choice } from '@/lib/gengoka/types';

const LABELS: Choice[] = ['A', 'B', 'C', 'D'];

type Props = {
  counts: Record<Choice, number>;
  myChoice?: Choice | null;
};

export default function DistributionChart({ counts, myChoice }: Props) {
  const total = LABELS.reduce((sum, key) => sum + counts[key], 0);
  const max = Math.max(...LABELS.map((key) => counts[key]), 1);

  return (
    <div className="rounded-2xl border border-gray-custom-200 bg-white p-5 shadow-card">
      <h2 className="mb-4 text-sm font-bold text-dark">みんなの予想</h2>
      <div className="space-y-3">
        {LABELS.map((label) => {
          const count = counts[label];
          const width = total > 0 ? (count / max) * 100 : 0;
          const isMine = myChoice === label;
          return (
            <div key={label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className={`font-bold ${isMine ? 'text-primary-dark' : 'text-dark'}`}>
                  {label}
                  {isMine ? '（あなた）' : ''}
                </span>
                <span className="text-gray-custom-500">{count}人</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-surface-alt">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isMine ? 'bg-primary' : 'bg-gray-custom-200'
                  }`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      {total === 0 ? (
        <p className="mt-3 text-xs text-gray-custom-500">まだ回答がありません</p>
      ) : null}
    </div>
  );
}
