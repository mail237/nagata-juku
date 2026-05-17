import { MARQUEE_ITEMS } from '@/lib/constants';
import { MARQUEE_SEPARATORS } from '@/lib/homePlayful';

const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function MarqueeSection() {
  return (
    <section className="bg-[#45B1C7]/10 border-y border-[#45B1C7]/20 py-2 md:py-3 overflow-hidden">
      <div className="relative w-full min-h-[1.75rem] md:min-h-[2.25rem] overflow-hidden">
        {/*
          inline-flex + w-max で幅＝コンテンツ幅に固定（-50% の基準が iOS でも安定）
          transform の別指定は付けない（キーフレームの transform と競合し Safari で止まることがある）
        */}
        <div className="inline-flex w-max max-w-none flex-nowrap animate-marquee md:animate-marquee-slow whitespace-nowrap will-change-[transform] shrink-0 [backface-visibility:hidden]">
          {repeated.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-6">
              <span className="text-xs md:text-sm font-bold tracking-widest text-[#2D8FA4] uppercase">
                {item}
              </span>
              <span aria-hidden className="text-[#45B1C7]/50 text-sm md:text-base">
                {MARQUEE_SEPARATORS[i % MARQUEE_SEPARATORS.length]}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
