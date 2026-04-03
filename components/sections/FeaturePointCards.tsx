'use client';

import Image from 'next/image';
import Link from 'next/link';
import FadeInSection from '@/components/ui/FadeInSection';
import { FEATURE_POINT_CARDS } from '@/lib/featurePointCards';

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  /** 下のCTA（省略時は非表示） */
  cta?: { href: string; label: string };
  className?: string;
};

export default function FeaturePointCards({ eyebrow, title, lead, cta, className = '' }: Props) {
  return (
    <section className={className}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
            <span className="w-6 h-px bg-[#45B1C7]" />
            {eyebrow}
            <span className="w-6 h-px bg-[#45B1C7]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1C4A52] leading-tight">
            {title}
          </h2>
          {lead && <p className="mt-3 text-sm text-[#777777] max-w-2xl mx-auto">{lead}</p>}
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURE_POINT_CARDS.map((f, i) => (
            <FadeInSection key={f.num} delay={i * 0.12}>
              <article className="group bg-white rounded-2xl overflow-hidden border border-[#C7E5EB]/50 shadow-[0_4px_28px_rgba(28,74,82,0.07)] hover:shadow-[0_12px_40px_rgba(28,74,82,0.12)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#E8EEED]">
                  <Image
                    src={f.image}
                    alt={f.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                    unoptimized
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C4A52]/55 via-[#1C4A52]/10 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute bottom-0 left-0 right-0 px-4 pb-3.5 pt-12 flex items-end gap-2">
                    <span className="font-serif font-black text-[2.75rem] leading-none text-white/[0.38] select-none tabular-nums">
                      {f.num}
                    </span>
                    <span className="pb-1 text-[11px] font-bold tracking-[0.28em] text-white/95 uppercase drop-shadow-sm">
                      Point {f.num}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-7 md:px-7 md:py-8 flex flex-col flex-1">
                  <h3 className="font-serif text-xl md:text-[1.35rem] font-black text-[#1C4A52] leading-snug tracking-tight mb-2.5">
                    {f.title}
                  </h3>
                  <p className="text-sm font-bold text-[#45B1C7] leading-snug mb-3.5">{f.summary}</p>
                  <p className="text-sm text-[#393939] leading-[1.75] flex-1">{f.body}</p>
                </div>
              </article>
            </FadeInSection>
          ))}
        </div>

        {cta && (
          <FadeInSection delay={0.4} className="mt-10 text-center">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#45B1C7] px-7 py-3.5 text-sm font-bold text-[#45B1C7] transition-all duration-300 ease-out hover:bg-[#45B1C7] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
            >
              {cta.label}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </FadeInSection>
        )}
      </div>
    </section>
  );
}
