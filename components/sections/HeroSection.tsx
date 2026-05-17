'use client';

import Image from 'next/image';
import FloatingDoodles from '@/components/home/FloatingDoodles';
import HeroCatchphraseEasterEgg from '@/components/home/HeroCatchphraseEasterEgg';

/** 画像差し替え時はクエリを変えるとキャッシュを避けられる */
const HERO_BANNER_SRC = '/images/hero-banner.png?v=restore-pre-edit';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden mt-20">
      <div className="relative w-full h-[240px] sm:h-[280px] lg:h-0 lg:pt-[min(42vw,520px)] lg:max-h-[520px]">
        <Image
          src={HERO_BANNER_SRC}
          alt="永田塾 生徒と先生の授業風景"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        <FloatingDoodles />

        <div className="absolute left-0 right-0 bottom-[18%] bg-white/80 backdrop-blur-[2px] z-[2]">
          <div className="max-w-5xl mx-auto px-4 py-2.5 sm:py-4 lg:py-5 text-center">
            <p className="font-serif font-black text-[clamp(1.4rem,3.5vw,2.4rem)] leading-tight tracking-tight text-[#1C1C1C]">
              <HeroCatchphraseEasterEgg />
              も部活も！
            </p>
            <p className="font-serif font-bold text-[clamp(1rem,2.4vw,1.35rem)] leading-snug tracking-tight text-[#393939] mt-1 px-1">
              定期テストから受験まで、一人ひとりのペースで
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
