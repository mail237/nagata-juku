import { MARQUEE_ITEMS } from '@/lib/constants';

const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function MarqueeSection() {
  return (
    <section className="bg-[#45B1C7]/10 border-y border-[#45B1C7]/20 py-4 overflow-hidden">
      <div className="relative w-full min-h-[2.5rem] overflow-hidden">
        {/*
          inline-flex + w-max で幅＝コンテンツ幅に固定（-50% の基準が iOS でも安定）
          transform の別指定は付けない（キーフレームの transform と競合し Safari で止まることがある）
        */}
        <div className="inline-flex w-max max-w-none flex-nowrap animate-marquee whitespace-nowrap will-change-[transform] shrink-0 [backface-visibility:hidden]">
          {repeated.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 mx-6">
              <span className="text-sm font-bold tracking-widest text-[#0B6678] uppercase">
                {item}
              </span>
              <span aria-hidden className="text-[#45B1C7]/40 text-lg">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
