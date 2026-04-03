'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FadeInSection from '@/components/ui/FadeInSection';

const categories = [
  {
    title: '永田塾の授業について',
    faqs: [
      { q: '通っている学校に合わせた授業やテスト対策はできますか？', a: 'はい、もちろんできます。永田塾は地域密着の学習塾として、地域の学校の学習進度や定期テストの時期・範囲を考えながら授業を進め、お子様の成績アップを実現します。各学校のテスト範囲に合わせたカリキュラムですので、定期テストの成績アップには絶対の自信を持っております。' },
      { q: 'どのような先生が教えているのですか？', a: '永田塾では、塾長の永田が中心となって直接指導をいたしております。アルバイト講師に丸投げせず、すべての生徒の進捗管理、カリキュラム作成、面談などを塾長が自ら行っています。' },
      { q: '5教科（英・数・国・理・社）をみてもらえますか？', a: 'はい。永田塾では5教科指導をいたしております。科目選択制なので「苦手な教科を克服したい」「得意な教科をもっと伸ばしたい」など、ご希望に応じて受講する教科を選ぶこともできます。' },
      { q: '自習などで教室を利用することはできますか？', a: 'はい。塾生は無料で利用していただくことができます。授業の前後や授業の無い日でも利用できます。「家ではなかなか集中して勉強できない」という場合など、ぜひご利用ください。' },
      { q: '自習はどれだけ行ってもいいのですか？', a: 'はい、どれだけ来ても塾生は追加で費用はかかりません。たくさん自習をした生徒ほど成績が上がりやすいですので、大いに塾を活用してください。' },
      { q: '宿題は出ますか？', a: '宿題は授業の内容を定着させ、家庭学習を習慣づけるために絶対に必要です。「宿題をやらない＝成績が上がらない」と考えておりますので、宿題を繰り返し忘れるような場合は授業とは別の日に塾へ来て宿題をやっていただきます。' },
    ],
  },
  {
    title: '入塾・通塾回数・受講科目について',
    faqs: [
      { q: 'いつから入塾できますか？', a: '永田塾では、生徒一人ひとりに対応して授業を行っておりますので、月の途中からでも入塾することができます。授業の定員に空きがある限り、翌日からでも授業を始めることが可能です。' },
      { q: '何年生から通えますか？', a: '小学1年生から入塾を受付しております。勉強に対して不安を感じたら早めの入塾をおすすめしています。早ければ早いほど遅れをすぐに取り戻すことができます。' },
      { q: '入塾テストはありますか？', a: '永田塾ではどのような成績のお子様でも入塾していただけますので、入塾時にテストは行っておりません。ただし、お子様自身が「成績を上げたい」と思っていない場合など、費用に見合う成果をお約束できない時に入塾をお断りする場合があります。' },
      { q: '成績ごとにクラスは分かれていますか？', a: 'クラス分けは行っていません。お子様一人ひとりに合わせた学習計画で個別指導を行っていきます。現在のお子様の学習状況に応じたところから始めます。' },
      { q: '週何回くらい通うのがいいですか？', a: 'お子様の状況によって異なりますが、目安としては中学生の場合、週2回以上通っていただくのがよいです。英語・数学を中心とした授業を行い、テスト前には理科・社会・国語を重点的に勉強することができます。' },
      { q: '途中で授業の科目を変更したり、授業日数を増やしたりできますか？', a: 'はい、科目変更や授業日数の変更はできます。授業日数の変更は月ごとに変更が可能ですので、前月末までにご連絡いただければ翌月から変更できます。' },
    ],
  },
  {
    title: '時間割・その他',
    faqs: [
      { q: '授業の曜日・時間を選ぶことはできますか？', a: 'はい、できます。ご都合のよい曜日・時間帯を選んでいただくことができます。ただし、曜日・時間帯によっては満席となっていることがありますので、ご希望に添えない場合があります。' },
      { q: '授業をおやすみした場合どうなりますか？', a: '授業開始までにご連絡していただければ、別の日に授業を変更することができます（振替授業）。体調不良や特別な事情がある場合、当日のご連絡でも別日に振替授業を行います。' },
      { q: '主要教科を全て履修しなくてはいけませんか？', a: '一教科から履修可能です。現在の成績に合わせて、強化したい科目を選択いただきますので、まずはお気軽にご相談ください。' },
      { q: '数学の基礎が全くできていません。前学年の内容を復習することはできますか？', a: '可能です。前学年の内容まで遡り、お子さまの習得具合を確認しながら丁寧に授業を進めてまいりますので、どうぞご安心ください。' },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-colors duration-200 ${open ? 'border-[#45B1C7]/40 bg-[#F1F5F4]' : 'border-[#C7E5EB] bg-white'}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <div className="flex min-w-0 flex-1 items-start gap-3 pr-1">
          <span className="shrink-0 font-serif font-black text-[#45B1C7] text-base leading-none mt-0.5">Q</span>
          <span className="min-w-0 font-medium text-[#1C4A52] text-sm leading-snug text-balance">{q}</span>
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
