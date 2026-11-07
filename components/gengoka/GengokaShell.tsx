import type { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backHref?: string;
  badge?: string;
};

export default function GengokaShell({
  children,
  title,
  subtitle,
  backHref = '/gengoka',
  badge,
}: Props) {
  return (
    <div className="min-h-dvh bg-surface">
      <header className="border-b border-gray-custom-200/80 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href={backHref}
            className="text-sm font-medium text-primary-dark transition hover:text-dark"
          >
            ← 戻る
          </Link>
          <div className="text-center">
            <p className="text-xs font-semibold tracking-wide text-primary-dark">
              永田塾 言語化アプリ
            </p>
            {badge ? (
              <p className="mt-0.5 text-[11px] text-gray-custom-500">{badge}</p>
            ) : null}
          </div>
          <div className="w-12" aria-hidden />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {title ? (
          <div className="mb-6">
            <h1 className="font-serif text-2xl font-bold text-dark">{title}</h1>
            {subtitle ? (
              <p className="mt-2 text-sm leading-relaxed text-gray-custom-500">
                {subtitle}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}
