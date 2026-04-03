'use client';

import FadeInSection from '@/components/ui/FadeInSection';

const problems = [
  {
    label: 'つまずき',
    text: '文章題・応用で\n手が止まる',
    desc:
      '計算の型はなんとなくわかるのに、問題文を読むと「何を求められているか」が掴めず、そこで止まってしまう。式に落とすまでの一歩が抜けていることが多いです。',
  },
  {
    label: '直前勉強',
    text: 'テスト前に頑張っても\n点数が上がらない',
    desc:
      '一夜漬けで「覚えた気」になっても、単元同士のつながりが整理できていないと、別の出題形式では再現できません。復習の回し方が課題です。',
  },
  {
    label: '優先順位',
    text: '勉強しようとしても\n何から始めるか決められない',
    desc:
      '教科書・プリント・問題集の山の前でフリーズする。やる気はあるのに「今日は何を何分」が決められず、結局後回しにしてしまう。',
  },
  {
    label: '塾とのギャップ',
    text: '塾に通っているのに\n成績が伸びない',
    desc:
      '「通っている安心」だけで、自習で弱点を掘る時間や、授業の復習が足りていないケースがあります。塾と家の両方で学習がつながっていますか。',
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-[#FAFCFC] to-white overflow-hidden">
      {/* 背景の淡い装飾 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 20% 10%, rgba(69, 177, 199, 0.12) 0%, transparent 45%),
            radial-gradient(circle at 80% 90%, rgba(28, 74, 82, 0.06) 0%, transparent 40%)`,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
            <span className="w-6 h-px bg-[#45B1C7]" />
            Problem
            <span className="w-6 h-px bg-[#45B1C7]" />
          </span>
          <h2 className="font-serif text-3xl md:text-[2.1rem] font-black text-[#1C4A52] leading-tight tracking-tight text-balance px-1">
            こんなお悩み、
            <br className="sm:hidden" />
            ありませんか？
          </h2>
          <p className="mt-4 text-[#393939] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            成績のことだけでなく、<strong className="font-bold text-[#1C4A52]">勉強の習慣・親子の関係・志望校とのギャップ</strong>
            まで、多くの生徒さま・保護者さまが同じように悩んでいます。ひとりで抱え込まず、まずは原因を一緒に整理しましょう。
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {problems.map((p, i) => (
            <FadeInSection key={i} delay={i * 0.06}>
              <div className="group relative h-full bg-white rounded-2xl p-6 md:p-7 border border-[#C7E5EB]/70 shadow-[0_4px_20px_rgba(28,74,82,0.06)] hover:shadow-[0_12px_36px_rgba(28,74,82,0.1)] hover:border-[#45B1C7]/35 hover:-translate-y-0.5 transition-all duration-300">
                <div className="mb-4">
                  <span className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#45B1C7] bg-[#45B1C7]/10 px-2.5 py-1 rounded-md">
                    {p.label}
                  </span>
                </div>
                <h3 className="font-serif font-black text-[#1C4A52] text-[1.05rem] md:text-lg leading-snug mb-3 whitespace-pre-line">
                  {p.text}
                </h3>
                <p className="text-xs md:text-sm text-[#555555] leading-[1.75]">{p.desc}</p>

                <div className="absolute bottom-0 left-4 right-4 h-px rounded-full bg-gradient-to-r from-transparent via-[#45B1C7]/0 to-transparent group-hover:via-[#45B1C7]/40 transition-all duration-300" />
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
