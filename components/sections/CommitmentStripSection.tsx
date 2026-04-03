'use client';

import FadeInSection from '@/components/ui/FadeInSection';
import { COMMITMENT_STRIP_ITEMS } from '@/lib/constants';

/**
 * マルquee直下の濃色帯。旧「数字で見る」と同じメリハリ用（中身は約束・強みの短文）。
 */
export default function CommitmentStripSection() {
  return (
    <section
      className="relative py-14 md:py-20 bg-gradient-to-br from-[#0B6678] via-[#134E59] to-[#1C4A52] overflow-hidden"
      aria-labelledby="commitment-strip-heading"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 50%, rgba(69, 177, 199, 0.35) 0%, transparent 42%), radial-gradient(circle at 85% 30%, rgba(255,255,255,0.08) 0%, transparent 35%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#7DD3E8] uppercase mb-2">
            <span className="w-6 h-px bg-[#45B1C7]/80" />
            Our Promise
            <span className="w-6 h-px bg-[#45B1C7]/80" />
          </span>
          <h2
            id="commitment-strip-heading"
            className="font-serif text-2xl md:text-3xl font-black text-white leading-tight text-balance"
          >
            永田塾が大切にしていること
          </h2>
          <p className="mt-2 text-sm text-white/65 max-w-xl mx-auto text-balance px-1">
            数字ではなく、指導の姿勢と仕組みをまとめてご紹介します。
          </p>
        </FadeInSection>

        {/* スマホは1列にして長い見出しの改行を自然に（2列だと極端に狭くなる） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-8">
          {COMMITMENT_STRIP_ITEMS.map((item, i) => (
            <FadeInSection key={item.headline} delay={i * 0.07}>
              <div
                className={`text-center min-w-0 px-0.5 ${
                  i > 0 ? 'lg:border-l lg:border-white/15 lg:pl-6' : ''
                }`}
              >
                <p className="font-serif font-black text-[clamp(1rem,2.8vw,1.35rem)] leading-snug text-white tracking-tight text-balance">
                  {item.headline}
                </p>
                <p className="mt-2.5 text-xs md:text-sm text-white/70 leading-relaxed text-balance">
                  {item.sub}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
