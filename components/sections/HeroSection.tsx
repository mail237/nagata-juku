'use client';

import Image from 'next/image';

/** 戻すとき: タグ snapshot-before-hero-yellow-2026-05（docs/site-snapshots.md） */
const HERO_BANNER_SRC = '/images/hero-banner-1920x800.png?v=1';
const HERO_BANNER_WIDTH = 1024;
const HERO_BANNER_HEIGHT = 426;

export default function HeroSection() {
  return (
    <section className="relative w-full mt-20 bg-white">
      <div className="mx-auto w-full max-w-[1024px] px-0">
        <Image
          src={HERO_BANNER_SRC}
          alt="個別指導の永田塾です（バナー・イメージ）"
          width={HERO_BANNER_WIDTH}
          height={HERO_BANNER_HEIGHT}
          className="block h-auto w-full max-w-full"
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
      </div>
    </section>
  );
}
