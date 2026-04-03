'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FadeInSection from '@/components/ui/FadeInSection';

const faqs = [
  {
    q: '主要教科を全て履修しなくてはいけませんか？',
    a: '一教科から履修可能です。現在の成績に合わせて、強化したい科目を選択いただきますので、まずはお気軽にご相談ください。',
  },
  {
    q: '現在、中学3年生ですが、数学の基礎が全くできていません。中学2年生の内容を復習することはできますか？',
    a: '可能です。前学年の内容まで遡り、お子さまの習得具合を確認しながら丁寧に授業を進めてまいりますので、どうぞご安心ください。できるところまで遡っての指導を行っています。',
  },
  {
    q: '授業料はどのくらいですか？',
    a: '月謝定額制で、通い放題・複数科目OKのプランをご用意しています。具体的な料金は、学年やご希望の科目によって異なりますので、まずは無料体験にお越しいただき、直接ご説明いたします。入会金については、お問合せの際にご説明いたします。',
  },
  {
    q: '無料体験はどのように申し込みますか？',
    a: 'お問合せフォームまたはお電話（072-940-7683）にてお申し込みいただけます。受付時間は15:00〜22:00（日曜・祝日定休）です。お気軽にご連絡ください。',
  },
  {
    q: '小学生でも通えますか？',
    a: 'はい、小学生から高校生まで幅広く対応しています。実際に小学6年生から長年通い続けている卒業生も多くいます。お子さまの学年・目標に合わせたカリキュラムを組みます。',
  },
  {
    q: '好きな曜日・時間に通えますか？',
    a: 'はい、好きな時間・曜日に通っていただけます。学校行事や部活に合わせて柔軟にスケジュールを組めますので、「第一志望合格も部活も」両立できる環境を整えています。',
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
                    <span className="min-w-0 font-bold text-[#1C4A52] text-sm leading-snug text-balance">
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
                      initial={{ height: 0, opacity: 1 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 1 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 flex gap-3">
                        <span className="shrink-0 font-serif font-black text-[#1C4A52]/30 text-lg leading-none mt-0.5">
                          A
                        </span>
                        <p className="text-sm text-[#393939] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
