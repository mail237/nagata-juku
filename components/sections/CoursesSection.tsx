'use client';

import FadeInSection from '@/components/ui/FadeInSection';
import Link from 'next/link';
import { JUKU_THREE_FEATURES } from '@/lib/courseFeatures';

const icons = [
  <svg key="1" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>,
  <svg key="2" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="3" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>,
];

const features = JUKU_THREE_FEATURES.map((f, i) => ({
  ...f,
  num: `0${i + 1}`,
  icon: icons[i],
}));

export default function CoursesSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
            <span className="w-6 h-px bg-[#45B1C7]" />
            Features
            <span className="w-6 h-px bg-[#45B1C7]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1C4A52] leading-tight">
            永田塾の特長
          </h2>
          <p className="mt-3 text-sm text-[#777777]">
            他の学習塾とは一線を画す、永田塾ならではの3つの特長をご紹介します。
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeInSection key={i} delay={i * 0.15}>
              <div
                className={`rounded-2xl overflow-hidden h-full flex flex-col border transition-all duration-300 ease-out hover:-translate-y-1 ${
                  feature.accent
                    ? 'border-[#45B1C7] shadow-card-hover hover:shadow-card-hover'
                    : 'border-[#C7E5EB] shadow-sm hover:shadow-card'
                }`}
              >
                {/* ヘッダー */}
                <div
                  className={`px-7 py-6 ${
                    feature.accent ? 'bg-[#45B1C7]' : 'bg-[#0B6678]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3 text-white/80">
                    {feature.icon}
                    <span className="font-serif font-black text-3xl text-white/20 leading-none">
                      {feature.num}
                    </span>
                  </div>
                  <h3 className="font-serif font-black text-2xl text-white mb-1">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-white/70">{feature.subtitle}</p>
                </div>

                {/* ボディ */}
                <div className="p-7 flex flex-col flex-1 bg-[#F1F5F4]">
                  <p className="text-sm text-[#393939] leading-relaxed mb-6">
                    {feature.lead}
                  </p>

                  <ul className="flex flex-col gap-2.5 mb-7 flex-1">
                    {feature.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[#1C4A52]">
                        <svg
                          className="w-4 h-4 text-[#45B1C7] shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/service#${feature.detailAnchor}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold border-2 border-[#45B1C7] text-[#45B1C7] transition-all duration-300 ease-out hover:bg-[#45B1C7] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
                  >
                    詳しく見る
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
