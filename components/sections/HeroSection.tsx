'use client';

import Link from 'next/link';
import Image from 'next/image';

/** 画像差し替え時はクエリを変えるとキャッシュを避けられる */
const HERO_BANNER_SRC = '/images/hero-banner.png?v=hair-neat';

const features = [
  '志望校に合わせた受験指導',
  '学校の進度に合わせた定期テスト対策',
  'できるところまで遡っての指導',
  '好きな時間・曜日に通える',
  '苦手科目克服＆得意教科の成績アップに対応',
];

export default function HeroSection() {
  return (
    <>
      {/* ━━━ メインビジュアル ━━━ */}
      <section className="relative w-full overflow-hidden mt-20">
        {/* 画像エリア（横長バナー比率） */}
        <div className="relative w-full" style={{ paddingTop: 'clamp(280px, 42vw, 520px)' }}>
          <Image
            src={HERO_BANNER_SRC}
            alt="永田塾 生徒と先生の授業風景"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />

          {/* 半透明白帯 */}
          <div className="absolute left-0 right-0 bottom-[18%] bg-white/80 backdrop-blur-[2px]">
            <div className="max-w-5xl mx-auto px-4 py-5 text-center">
              <p className="font-serif font-black text-[clamp(1.4rem,3.5vw,2.4rem)] leading-tight tracking-tight text-[#1C1C1C]">
                <span className="text-[#D93025]">第一志望合格</span>も部活も！
              </p>
              <p className="font-serif font-bold text-[clamp(1rem,2.4vw,1.35rem)] leading-snug tracking-tight text-[#393939] mt-1">
                定期テストから受験まで、一人ひとりのペースで
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 魅力リスト + CTA ━━━ */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">

            {/* 左：塾の説明 */}
            <div className="flex-1">
              <div>
                <p className="text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-2 flex items-center gap-2">
                  <span className="w-5 h-px bg-[#45B1C7]" />
                  大阪・八尾市の個別指導塾
                </p>
                <h2 className="font-serif font-black text-2xl text-[#1C4A52] mb-3 leading-snug">
                  永田塾のここが魅力！
                </h2>
                <ul className="flex flex-col gap-2 mb-5">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#393939]">
                      <span className="w-4 h-4 rounded-full bg-[#45B1C7] text-white text-[10px] flex items-center justify-center shrink-0 font-bold">✔</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[#393939] leading-relaxed">
                  本気で成績を上げ、人生の目標に向かうために。
                  勉強を吸収できる態度を整え、徹底的な繰り返し学習で点数をアップ。
                  勉強を通した成功体験から、人生を変える塾です。
                </p>
              </div>
            </div>

            {/* 右：CTA + 電話 */}
            <div className="lg:w-72 w-full">
              <div className="bg-[#F1F5F4] rounded-2xl p-6 border border-[#C7E5EB]/60 text-center">
                <p className="text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-4">無料体験 受付中</p>
                <Link
                  href="/contact"
                  className="block w-full py-4 bg-[#45B1C7] text-white font-bold rounded-full text-sm transition-all duration-300 ease-out hover:bg-[#0B6678] hover:shadow-cta mb-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  無料体験を申し込む
                </Link>
                <Link
                  href="/service"
                  className="block w-full py-3 border-2 border-[#1C4A52] text-[#1C4A52] font-bold rounded-full text-sm transition-all duration-300 ease-out hover:bg-[#1C4A52] hover:text-white mb-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C4A52]"
                >
                  料金・授業内容を見る
                </Link>
                <div className="border-t border-[#C7E5EB]/60 pt-4">
                  <p className="text-xs text-[#777777] mb-1">お電話でのお問合せ</p>
                  <a
                    href="tel:072-940-7683"
                    className="font-serif font-black text-xl text-[#1C4A52] transition-colors hover:text-[#45B1C7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45B1C7] rounded-sm block"
                  >
                    072-940-7683
                  </a>
                  <p className="text-[10px] text-[#777777] mt-1">受付 15:00〜22:00（日祝定休）</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
