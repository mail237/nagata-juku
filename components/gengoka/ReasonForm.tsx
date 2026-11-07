'use client';

import { useState } from 'react';
import { REASON_TEMPLATE } from '@/lib/gengoka/constants';

type Props = {
  disabled?: boolean;
  onSubmit: (part1: string, part2: string) => void | Promise<void>;
};

export default function ReasonForm({ disabled = false, onSubmit }: Props) {
  const [part1, setPart1] = useState('');
  const [part2, setPart2] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = part1.trim().length > 0 && part2.trim().length > 0 && !disabled;

  return (
    <form
      className="rounded-2xl border border-gray-custom-200 bg-white p-5 shadow-card"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!canSubmit || submitting) return;
        setSubmitting(true);
        try {
          await onSubmit(part1, part2);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <h2 className="text-sm font-bold text-dark">理由を書こう</h2>
      <p className="mt-2 text-xs leading-relaxed text-gray-custom-500">
        {REASON_TEMPLATE.hint}
      </p>

      <label className="mt-4 block">
        <span className="text-xs font-semibold text-primary-dark">
          {REASON_TEMPLATE.part1Label}
        </span>
        <input
          value={part1}
          onChange={(e) => setPart1(e.target.value)}
          placeholder={REASON_TEMPLATE.part1Placeholder}
          disabled={disabled || submitting}
          className="mt-2 w-full rounded-xl border border-gray-custom-200 bg-surface px-4 py-3 text-sm outline-none ring-primary/30 transition focus:border-primary focus:ring-2"
        />
      </label>

      <p className="mt-4 text-center text-sm font-medium text-gray-custom-500">
        と書いてあったから、
      </p>

      <label className="mt-2 block">
        <span className="text-xs font-semibold text-primary-dark">
          {REASON_TEMPLATE.part2Label}
        </span>
        <input
          value={part2}
          onChange={(e) => setPart2(e.target.value)}
          placeholder={REASON_TEMPLATE.part2Placeholder}
          disabled={disabled || submitting}
          className="mt-2 w-full rounded-xl border border-gray-custom-200 bg-surface px-4 py-3 text-sm outline-none ring-primary/30 transition focus:border-primary focus:ring-2"
        />
      </label>

      <p className="mt-2 text-center text-sm font-medium text-gray-custom-500">
        だと思った
      </p>

      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="mt-5 w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-cta transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? '送信中…' : '理由を送信する'}
      </button>
      <p className="mt-2 text-center text-[11px] text-gray-custom-500">
        送信したら変更できません
      </p>
    </form>
  );
}
