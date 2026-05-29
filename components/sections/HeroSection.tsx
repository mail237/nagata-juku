'use client';

import Image from 'next/image';

/** 戻すとき: タグ snapshot-before-hero-junior-banner（docs/site-snapshots.md） */
const HERO_BANNER_SRC = '/images/hero-banner-junior-student.png?v=1';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden mt-20">
      <div className="relative w-full aspect-[512/217] max-h-[280px] sm:max-h-[360px] lg:max-h-[434px]">
        <Image
          src={HERO_BANNER_SRC}
          alt="個別指導の永田塾です（バナー・イメージ）"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
      </div>
    </section>
  );
}
