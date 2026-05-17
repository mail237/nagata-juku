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
        a: 'はい、可能です。地域の学校の進度や、定期テストの時期・範囲に合わせて授業を組み立てます。テスト範囲に沿ったカリキュラムで、お子さまの成績向上を目指します。',
      },
      {
        q: 'どのような先生が教えているのですか？',
        a: '塾長の永田が中心となって直接指導します。講師任せにせず、進捗管理・カリキュラム・面談まで塾長が担当します。',
      },
      {
        q: '5教科（英・数・国・理・社）をみてもらえますか？',
        a: 'はい、5教科に対応しています。科目は選択制なので、苦手克服や得意科目の伸長など、ご希望に合わせて受講教科を選べます。',
      },
      {
        q: '自習などで教室を利用することはできますか？',
        a: 'はい、塾生は追加料金なしで教室を自習に利用できます。授業の前後や、授業のない日でもご利用いただけます。「家では集中しにくい」という場合にも、ぜひご活用ください。',
      },
      {
        q: '自習はどれだけ行ってもいいのですか？',
        a: '回数の上限は設けていません。追加料金もかかりません。自習を重ねた生徒ほど成績が伸びやすい傾向があるため、ぜひ活用してください。',
      },
      {
        q: '宿題は出ますか？',
        a: '授業内容の定着と、家庭学習の習慣づけのために出します。提出が繰り返し遅れる場合は、別の日に塾へ来て宿題に取り組んでいただくこともあります。',
      },
    ],
  },
  {
    title: '入塾・通塾回数・受講科目について',
    faqs: [
      {
        q: 'いつから入塾できますか？',
        a: '生徒一人ひとりに対応しているため、月の途中からでも入塾できます。定員に空きがあれば、翌日から授業を始められる場合もあります。',
      },
      {
        q: '何年生から通えますか？',
        a: '小学1年生から受付しています。勉強への不安を感じたら、早めのご相談をおすすめします。',
      },
      {
        q: '入塾テストはありますか？',
        a: '入塾時のテストはありません。成績にかかわらずご検討いただけます。ただし、お子さま自身が向上したいと思っていない場合など、成果をお約束しづらいときはお断りすることがあります。',
      },
      {
        q: '成績ごとにクラスは分かれていますか？',
        a: 'クラス分けは行っていません。お子さま一人ひとりの学習計画で個別指導し、現在の学習状況に合ったところから始めます。',
      },
      {
        q: '週何回くらい通うのがいいですか？',
        a: 'お子さまによりますが、中学生の目安は週2回以上です。英語・数学を中心に、テスト前は理科・社会・国語を重点的に扱うこともできます。',
      },
      {
        q: '途中で授業の科目を変更したり、授業日数を増やしたりできますか？',
        a: 'はい、科目の変更や通塾日数の増減が可能です。通塾日数は月単位の変更となり、前月末までにご連絡いただければ翌月から反映します。',
      },
    ],
  },
  {
    title: '時間割・その他',
    faqs: [
      {
        q: '授業の曜日・時間を選ぶことはできますか？',
        a: 'はい、ご都合のよい曜日・時間帯をお選びいただけます。満席の時間帯は、ご希望に添えない場合があります。',
      },
      {
        q: '授業をおやすみした場合どうなりますか？',
        a: '授業開始前にご連絡いただければ、別日に振替できます。体調不良などやむを得ない事情では、当日のご連絡でも振替に対応します。',
      },
      {
        q: '主要教科を全て履修しなくてはいけませんか？',
        a: '一教科から受講できます。成績や目標に合わせて科目を選んでいただけます。まずはお気軽にご相談ください。',
      },
      {
        q: '数学の基礎が全くできていません。前学年の内容を復習することはできますか？',
        a: '可能です。前学年の内容まで遡り、習得度を確認しながら丁寧に進めます。',
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
