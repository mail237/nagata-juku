'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FadeInSection from '@/components/ui/FadeInSection';

const faqs = [
  {
    q: '主要教科をすべて受講しなければいけませんか？',
    a: '一教科から受講できます。現在の成績や目標に合わせて、重点的に学びたい科目を選べます。まずはお気軽にご相談ください。',
  },
  {
    q: '中学3年生ですが、数学の基礎があまりできていません。前の学年の内容から復習できますか？',
    a: '可能です。つまずいたところから遡って、習得度を確認しながら丁寧に進めます。前の学年の内容に戻る指導も日常的に行っています。',
  },
  {
    q: '授業料はどのくらいですか？',
    a: '月謝定額制で、通い放題・複数科目OKのプランをご用意しています。学年や科目によって異なるため、無料体験の際に詳しくご説明します。別途、入塾金（10,000円）・教材費・教室維持費などがかかります。',
  },
  {
    q: '無料体験はどのように申し込みますか？',
    a: 'お問合せフォーム・LINE・お電話（072-940-7683）からお申し込みいただけます。受付時間は15:00〜22:00（日曜・祝日定休）です。',
  },
  {
    q: '小学生でも通えますか？',
    a: 'はい、小学生から高校生まで対応しています。小学6年生から長年通い続けた卒業生も多く、学年や目標に合わせてカリキュラムを組みます。',
  },
  {
    q: '好きな曜日・時間に通えますか？',
    a: 'はい、ご都合のよい曜日・時間で通えます。部活や学校行事に合わせてスケジュールを組めるので、勉強と部活の両立もしやすくなります。',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
            <span className="w-6 h-px bg-[#45B1C7]" />
            FAQ
            <span className="w-6 h-px bg-[#45B1C7]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1C4A52] leading-tight">
            よくある質問
          </h2>
          <p className="mt-3 text-sm text-[#777777]">
            ほかにもご不明点があれば、お気軽にお問合せください。
          </p>
        </FadeInSection>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FadeInSection key={i} delay={i * 0.07}>
              <div className="border border-[#C7E5EB] rounded-xl overflow-hidden hover:border-[#45B1C7]/30 transition-colors duration-200">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 rounded-xl px-6 py-5 text-left transition-colors hover:bg-[#FAFCFC]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-inset"
                  aria-expanded={openIndex === i}
                >
                  <div className="flex min-w-0 flex-1 items-start gap-3 pr-1">
                    <span className="shrink-0 font-serif font-black text-[#45B1C7] text-lg leading-none mt-0.5">
                      Q
                    </span>
                    <span className="min-w-0 font-bold text-[#1C4A52] text-sm leading-relaxed">
                      {faq.q}
                    </span>
                  </div>
                  <div
                    className={`shrink-0 w-6 h-6 rounded-full border-2 border-[#45B1C7] flex items-center justify-center text-[#45B1C7] transition-transform duration-300 ${
                      openIndex === i ? 'rotate-45 bg-[#45B1C7] text-white border-[#45B1C7]' : ''
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-0">
                        <div className="flex items-start gap-3 border-t border-[#E0F2F4] pt-4">
                          <span className="shrink-0 font-serif font-black text-[#1C4A52]/30 text-sm leading-none mt-0.5">
                            A
                          </span>
                          <p className="text-sm text-[#555555] leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="text-center mt-10">
          <a
            href="/faq"
            className="inline-flex items-center gap-2 rounded-md text-sm font-bold text-[#45B1C7] transition-all duration-300 ease-out hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
          >
            すべての質問を見る
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}
