'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FadeInSection from '@/components/ui/FadeInSection';

const categories = [
  {
    title: '永田塾の授業について',
    faqs: [
      {
        q: '通っている学校に合わせた授業やテスト対策はできますか？',
        a: 'はい。通っている学校の進度と、定期テストの時期・範囲に合わせて進めます。',
      },
      {
        q: 'どのような先生が教えているのですか？',
        a: '塾長の永田が直接教えます。進捗管理・カリキュラム・面談まで、全部塾長です。',
      },
      {
        q: '5教科（英・数・国・理・社）をみてもらえますか？',
        a: 'はい、5教科全部できます。受ける科目は選べます。苦手な科目だけでも大丈夫です。',
      },
      {
        q: '自習などで教室を利用することはできますか？',
        a: 'はい。塾生は追加料金なしで自習に使えます。授業の前後でも、授業のない日でも大丈夫です。家で集中できない子は、ここで宿題をやっていく子が多いです。',
      },
      {
        q: '自習はどれだけ行ってもいいのですか？',
        a: '上限はありません。追加料金もなしです。自習の多い子ほど、成績は伸びます。',
      },
      {
        q: '宿題は出ますか？',
        a: '出します。授業でやったことを家でもう一度やるためです。提出が続けて遅れる子は、別の日に塾に来てやってもらうこともあります。',
      },
    ],
  },
  {
    title: '入塾・通塾回数・受講科目について',
    faqs: [
      {
        q: 'いつから入塾できますか？',
        a: '月の途中からでも入れます。空きがあれば、翌日からでも始められます。',
      },
      {
        q: '何年生から通えますか？',
        a: '小学1年生からです。不安が出てきたら、早めに相談してください。',
      },
      {
        q: '入塾テストはありますか？',
        a: 'ありません。今の成績は関係ありません。ただ、お子さま本人が「やりたくない」場合は成果が出ないので、お断りすることがあります。',
      },
      {
        q: '成績ごとにクラスは分かれていますか？',
        a: 'クラス分けはありません。一人ひとり別の計画で、今できるところから始めます。',
      },
      {
        q: '週何回くらい通うのがいいですか？',
        a: '中学生の目安は週2回以上。英語・数学を中心に、テスト前は理科・社会・国語を増やすこともできます。',
      },
      {
        q: '途中で授業の科目を変更したり、授業日数を増やしたりできますか？',
        a: 'できます。通う日数の変更は月単位で、前月末までに連絡をもらえれば翌月から変わります。',
      },
    ],
  },
  {
    title: '時間割・その他',
    faqs: [
      {
        q: '授業の曜日・時間を選ぶことはできますか？',
        a: 'はい。曜日と時間は選べます。満席の時間帯は入れないことがあります。',
      },
      {
        q: '授業をおやすみした場合どうなりますか？',
        a: '授業の前に連絡をもらえれば、別日に振り替えます。体調不良など、当日の連絡でも大丈夫です。',
      },
      {
        q: '主要教科を全て履修しなくてはいけませんか？',
        a: '1教科からで大丈夫です。受ける科目は選べます。',
      },
      {
        q: '数学の基礎が全くできていません。前学年の内容を復習することはできますか？',
        a: 'できます。前の学年の内容まで戻って、できているか確かめながら進めます。',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors duration-200 ${open ? 'border-[#45B1C7]/40 bg-[#F2F9FA]' : 'border-[#C7E5EB] bg-white'}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-1 items-start gap-3 pr-1">
          <span className="shrink-0 font-serif font-black text-[#45B1C7] text-base leading-none mt-0.5">Q</span>
          <span className="min-w-0 font-medium text-[#1C4A52] text-sm leading-relaxed">{q}</span>
        </div>
        <div className={`shrink-0 w-5 h-5 rounded-full border border-[#45B1C7] flex items-center justify-center text-[#45B1C7] transition-all duration-200 ${open ? 'bg-[#45B1C7] rotate-45' : ''}`}>
          <svg className={`w-2.5 h-2.5 ${open ? 'text-white' : 'text-[#45B1C7]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 flex gap-3 border-t border-[#C7E5EB]/40">
              <span className="shrink-0 font-serif font-black text-[#777777] text-base leading-none mt-3">A</span>
              <p className="text-sm text-[#393939] leading-relaxed pt-3">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQAccordionSection() {
  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {categories.map((cat, ci) => (
            <FadeInSection key={ci}>
              <h2 className="font-serif font-black text-lg text-[#1C4A52] mb-5 flex items-center gap-3">
                <span className="w-6 h-px bg-[#45B1C7]" />
                {cat.title}
              </h2>
              <div className="flex flex-col gap-2.5">
                {cat.faqs.map((faq, fi) => (
                  <FAQItem key={fi} q={faq.q} a={faq.a} />
                ))}
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
