'use client';

import Link from 'next/link';
import FadeInSection from '@/components/ui/FadeInSection';
import { SERVICE_FEATURE_EXTRAS, SERVICE_FEATURE_REASONS } from '@/lib/serviceFeatureReasons';

export default function ServiceFeatureReasonsDetail() {
  return (
    <section id="reasons-detail" className="py-14 md:py-20 bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-12 md:mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
            <span className="w-6 h-px bg-[#45B1C7]" />
            Detail
            <span className="w-6 h-px bg-[#45B1C7]" />
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-black text-[#1C4A52] leading-tight">
            特長の詳しい説明
          </h2>
          <p className="mt-4 text-sm text-[#777777] max-w-3xl mx-auto leading-[1.85] text-left sm:text-center">
            永田塾では、塾長が一人ひとりの進捗管理・カリキュラム・保護者面談まで一貫して担う直接指導、授業料は定額で週に何度でも通える通い放題、そしてタブレットや学習アプリ・Web教材などを状況に応じて使い分けるICT学習——この三つを核にしています。
            下記では、それぞれの考え方や具体的な運用、通塾や家計のイメージがつかめるよう、ポイントごとに掘り下げて記しています。お子様の学年やご家庭の状況に合わせて、全体像から押さえていただけます。
          </p>
        </FadeInSection>

        <div className="flex flex-col gap-14 md:gap-20">
          {SERVICE_FEATURE_REASONS.map((reason) => (
            <FadeInSection key={reason.num}>
              <div id={`reason-detail-${reason.num}`} className="scroll-mt-28">
              <div className="flex items-start gap-4 mb-5">
                <span className="font-serif font-black text-5xl text-[#45B1C7]/20 leading-none select-none shrink-0">
                  {reason.num}
                </span>
                <div className="pt-2">
                  <span className="text-xs font-bold tracking-widest text-[#45B1C7] uppercase block mb-1">
                    Point {reason.num}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-black text-[#1C4A52] leading-tight">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-[#777777] mt-1">{reason.subtitle}</p>
                </div>
              </div>

              <div className="bg-[#F1F5F4] rounded-2xl p-7 md:p-9 border border-[#C7E5EB]/60">
                <div className="flex flex-wrap gap-2 mb-5">
                  {reason.highlights.map((h) => (
                    <span
                      key={h}
                      className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#45B1C7]/10 text-[#0B6678] px-3 py-1.5 rounded-full"
                    >
                      ✔ {h}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  {reason.body.map((para, j) => (
                    <p key={j} className="text-sm text-[#393939] leading-loose">
                      {para}
                    </p>
                  ))}
                  {reason.num === '03' && (
                    <p className="text-sm text-[#393939] leading-loose">
                      塾長の全国セミナー講師としてのご経歴や指導実績の詳細は、
                      <Link href="/greeting" className="mx-0.5 font-bold text-[#45B1C7] hover:underline">
                        代表者ごあいさつ
                      </Link>
                      をご覧ください。
                    </p>
                  )}
                </div>
              </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.2} className="mt-14">
          <h3 className="font-serif text-xl font-black text-[#1C4A52] mb-6">その他の特徴</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICE_FEATURE_EXTRAS.map((f, i) => (
              <div key={i} className="flex gap-4 p-5 bg-[#F1F5F4] rounded-xl border border-[#C7E5EB]/60">
                <div className="w-7 h-7 rounded-full bg-[#45B1C7]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#45B1C7] text-xs font-bold">✔</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1C4A52] text-sm mb-1">{f.title}</h4>
                  <p className="text-xs text-[#777777] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
