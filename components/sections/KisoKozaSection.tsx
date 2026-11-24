'use client';

import Link from 'next/link';
import FadeInSection from '@/components/ui/FadeInSection';
import { SCHOOL } from '@/lib/constants';

export default function KisoKozaSection() {
  return (
    <section className="pt-10 pb-14 md:pt-12 md:pb-20 bg-white border-b border-[#C7E5EB]/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="relative rounded-2xl border border-[#C7E5EB]/70 bg-gradient-to-br from-[#FFFBF0] via-white to-[#F2F9FA] p-6 md:p-8 lg:p-10 shadow-[0_4px_24px_rgba(28,74,82,0.06)]" style={{ backgroundImage: 'linear-gradient(to right, rgba(28,74,82,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,74,82,0.055) 1px, transparent 1px), linear-gradient(to bottom right, #FFFBF0, #FFFFFF, #F2F9FA)', backgroundSize: '28px 28px, 28px 28px, auto' }}>
            <span className="inline-block text-xs font-bold text-[#45B1C7] tracking-wider uppercase mb-2">
              基礎講座
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-[#1C4A52] leading-tight mb-4">
              【新設】（数・英）基礎講座<br />
              ― 冬期講習から募集
            </h2>
            <div className="space-y-3.5 text-sm sm:text-base text-[#393939] leading-relaxed">
              <p>
                「勉強しているのに、テストで80点に届かない」。その原因は、応用力ではなく基礎です。計算でつまずけば数学は積み上がりませんし、英単語を知らなければ英語は読めません。
              </p>
              <p>
                この講座では、はじめにTOFAS（国際基礎学力検定）を受けてもらいます。TOFASは世界各国で実施されている検定で、計算や英単語といった基礎学力がどこまで身についているかを判定します。その結果をもとに一人ひとりのスタート位置を決め、つまずきが小学生の内容にあれば、学年を問わず、そこまでさかのぼって学習します。遠回りに見えて、これが一番の近道です。
              </p>
              <p>
                授業は平日30分／教科、週2〜5回です。まずは、平日毎日30分通うことを目標にします。短い時間を毎日続けることで、「基礎×習慣」を身につけます。
              </p>
              <p>
                基礎ができていれば、なんとかなります。まずは冬期講習で、TOFASの判定から始めてみませんか。
              </p>
              <div className="pt-1 flex flex-wrap gap-2">
                <span className="inline-block rounded-lg bg-[#1C4A52] px-3.5 py-1.5 text-sm sm:text-base font-bold text-white">
                  12月開講
                </span>
                <span className="inline-block rounded-lg bg-[#1C4A52] px-3.5 py-1.5 text-sm sm:text-base font-bold text-white">
                  先着10名
                </span>
                <span className="inline-block rounded-lg bg-[#E8F7FA] border border-[#C7E5EB] px-3.5 py-1.5 text-sm sm:text-base font-bold text-[#1C4A52]">
                  対象：テストで80点以下の生徒
                </span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#1C4A52] text-white px-6 py-2.5 text-sm font-bold shadow-cta hover:bg-[#358FA3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
              >
                お問合せ
              </Link>
              <a
                href={`tel:${SCHOOL.phone}`}
                className="inline-flex items-center justify-center rounded-full border-2 border-[#45B1C7] text-[#1C4A52] px-5 py-2 text-sm font-bold hover:bg-[#E8F7FA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
              >
                {SCHOOL.phone} に電話
              </a>
            </div>
            <div aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 md:bottom-6 md:right-8 rotate-[8deg] opacity-90 mix-blend-multiply">
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-[4px] border-[2.5px] border-[#E03C31] bg-white/40 p-[3px]">
                <div className="flex h-full w-full items-center justify-center rounded-[2px] border border-[#E03C31]">
                  <span className="[writing-mode:vertical-rl] text-sm md:text-lg font-black tracking-[0.15em] text-[#E03C31]">新設</span>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
