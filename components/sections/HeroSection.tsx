'use client';

import Image from 'next/image';

/** 戻すとき: タグ snapshot-before-hero-hq-2026-05（docs/site-snapshots.md） */
const HERO_BANNER_SRC = '/images/hero-banner-hq.png?v=2';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden mt-20">
      <div className="relative w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-0 lg:pt-[min(38vw,480px)] lg:max-h-[480px]">
        <Image
          src={HERO_BANNER_SRC}
          alt="個別指導の永田塾です（バナー・イメージ）"
          fill
          className="object-cover object-[center_42%] sm:object-center"
          priority
          unoptimized
          sizes="100vw"
        />
      </div>
    </section>
  );
}
