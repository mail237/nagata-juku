import type { GengokaQuestion } from '@/lib/gengoka/types';

type Props = {
  question: GengokaQuestion;
};

export default function QuestionCard({ question }: Props) {
  return (
    <article className="rounded-2xl border border-gray-custom-200 bg-white p-5 shadow-card">
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-primary-dark">
        <span className="rounded-full bg-surface-alt px-2.5 py-1">{question.weekLabel}</span>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary-dark">
          {question.genre}
        </span>
      </div>
      <div className="space-y-3 font-serif text-base leading-8 text-gray-custom-700">
        {question.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <p className="mt-5 border-t border-gray-custom-200 pt-4 text-sm font-bold text-dark">
        {question.prompt}
      </p>
    </article>
  );
}
