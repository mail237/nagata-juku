'use client';

import Link from 'next/link';
import FadeInSection from '@/components/ui/FadeInSection';
import { SCHOOL } from '@/lib/constants';

export default function ContactCTASection() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#0B6678] to-[#45B1C7] relative overflow-hidden">
      {/* 背景装飾 */}
      <div
        aria-hidden
        className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/8 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <FadeInSection>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 uppercase mb-4">
            <span className="w-6 h-px bg-white/40" />
            Contact
            <span className="w-6 h-px bg-white/40" />
          </span>

          <h2 className="font-serif text-3xl md:text-4xl font-black text-white leading-tight mb-3">
            まずは無料体験からどうぞ
          </h2>
          <p className="text-white/80 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
            お気軽にお問合せください。体験後の勧誘は一切ありません。
            一人ひとりの状況を丁寧にお聞きし、最適なプランをご提案します。
          </p>

          {/* 電話番号 */}
          <div className="mb-8">
            <a
              href={`tel:${SCHOOL.phone}`}
              className="inline-flex items-center gap-3 rounded-lg text-white transition-opacity hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white group"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-3xl md:text-4xl font-black tracking-wider leading-none">
                  {SCHOOL.phone}
                </p>
                <p className="text-xs text-white/60 mt-1">
                  受付時間: {SCHOOL.hours}（定休: {SCHOOL.closed}）
                </p>
              </div>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#45B1C7] font-black rounded-full text-sm shadow-md transition-all duration-300 ease-out hover:bg-[#F8FCFC] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              無料体験フォームへ
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-white/60 text-xs">
              ※ 無料体験・体験後の勧誘なし
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
