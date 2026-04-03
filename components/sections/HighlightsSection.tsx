'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '@/components/ui/FadeInSection';

const highlights = [
  '志望校に合わせた受験指導',
  '学校の進度に合わせた定期テスト対策',
  'できるところまで遡っての指導',
  '好きな時間・曜日に通える',
  '苦手科目克服＆得意教科の成績アップに対応',
];

export default function HighlightsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeInSection>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
              <span className="w-6 h-px bg-[#45B1C7]" />永田塾のここが魅力！
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-black text-[#1C4A52] leading-tight mb-6">
              あなたの目標に合わせた<br />個別指導を提供します
            </h2>
            <ul className="flex flex-col gap-3 mb-8">
              {highlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#45B1C7] flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-[#1C4A52] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#45B1C7] text-white font-bold rounded-full text-sm transition-all duration-300 ease-out hover:bg-[#0B6678] hover:shadow-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
              >
                無料体験を申し込む
              </Link>
              <Link
                href="/service#reasons-detail"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-[#1C4A52] text-[#1C4A52] font-bold rounded-full text-sm transition-all duration-300 ease-out hover:bg-[#1C4A52] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1C4A52]"
              >
                特長・料金を詳しく見る
              </Link>
            </div>
          </FadeInSection>

          {/* 右側：代表あいさつ */}
          <FadeInSection delay={0.15} direction="left">
            <div className="bg-[#F1F5F4] rounded-2xl p-8 border border-[#E0F2F4]">
              <div className="flex items-center gap-4 mb-5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#C7E5EB]">
                  <Image
                    src="/images/principal-real.jpg"
                    alt="塾長 永田知裕"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-xs text-[#45B1C7] font-bold tracking-widest uppercase">代表のごあいさつ</p>
                  <p className="font-serif font-black text-lg text-[#1C4A52]">永田 知裕</p>
                </div>
              </div>
              <p className="text-sm text-[#393939] leading-loose mb-5">
                大阪・八尾市の個別指導塾、永田塾です。<br /><br />
                本気で成績を上げ、人生の目標に向かうために。勉強を吸収できる態度を整え、徹底的な繰り返し学習で点数をアップ、<br /><br />
                勉強を通した成功体験から人生を変える塾です。お気軽にご相談ください。
              </p>
              <Link
                href="/greeting"
                className="inline-flex items-center gap-2 rounded-md text-sm font-bold text-[#45B1C7] transition-all duration-300 ease-out hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
              >
                代表ごあいさつはこちらへ
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
