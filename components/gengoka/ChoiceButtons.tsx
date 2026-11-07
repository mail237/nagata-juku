'use client';

import type { Choice, GengokaQuestion } from '@/lib/gengoka/types';

const LABELS: Choice[] = ['A', 'B', 'C', 'D'];

type Props = {
  question: GengokaQuestion;
  selected: Choice | null;
  disabled?: boolean;
  onSelect?: (choice: Choice) => void;
  highlightChoice?: Choice | null;
};

export default function ChoiceButtons({
  question,
  selected,
  disabled = false,
  onSelect,
  highlightChoice,
}: Props) {
  return (
    <div className="space-y-3">
      {LABELS.map((label) => {
        const isSelected = selected === label;
        const isHighlight = highlightChoice === label;
        const base =
          'w-full rounded-2xl border px-4 py-4 text-left transition active:scale-[0.99]';
        let style = 'border-gray-custom-200 bg-white hover:border-primary/40';
        if (isSelected) {
          style = 'border-primary bg-primary/10 shadow-card';
        } else if (isHighlight) {
          style = 'border-primary bg-primary/5 ring-2 ring-primary/30';
        }
        if (disabled) style += ' pointer-events-none opacity-80';

        return (
          <button
            key={label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect?.(label)}
            className={`${base} ${style}`}
          >
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-dark text-sm font-bold text-white">
              {label}
            </span>
            <span className="text-sm leading-relaxed text-gray-custom-700">
              {question.choices[label]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
