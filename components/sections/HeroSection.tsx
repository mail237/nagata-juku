'use client';

import Image from 'next/image';

/** 戻すとき: タグ snapshot-before-hero-yellow-2026-05（docs/site-snapshots.md） */
const HERO_BANNER_SRC = '/images/hero-banner-yellow.png?v=1';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden mt-20">
      <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-0 lg:pt-[min(42vw,520px)] lg:max-h-[520px]">
        <Image
          src={HERO_BANNER_SRC}
          alt="個別指導の永田塾です（バナー・イメージ）"
          fill
          className="object-cover object-[center_45%] sm:object-center"
          priority
          unoptimized
          sizes="100vw"
        />
      </div>
    </section>
  );
}
