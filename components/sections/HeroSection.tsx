'use client';

import Image from 'next/image';

/** 戻すとき: タグ snapshot-before-hero-hq-2026-05（docs/site-snapshots.md） */
const HERO_BANNER_SRC = '/images/hero-banner-hq.png?v=1';
const HERO_BANNER_WIDTH = 1024;
const HERO_BANNER_HEIGHT = 571;

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden mt-20 bg-[#E8F4FC]">
      <Image
        src={HERO_BANNER_SRC}
        alt="個別指導の永田塾です（バナー・イメージ）"
        width={HERO_BANNER_WIDTH}
        height={HERO_BANNER_HEIGHT}
        className="block h-auto w-full"
        priority
        unoptimized
        sizes="100vw"
      />
    </section>
  );
}
