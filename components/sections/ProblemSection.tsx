'use client';

import FadeInSection from '@/components/ui/FadeInSection';

const problems = [
  {
    label: 'つまずき',
    lines: ['文章題・応用', 'で手が止まる'],
    desc:
      '計算はできるのに、文章題になると「何を求められているか」がわからず手が止まります。問題文を式に直すところでつまずいています。',
  },
  {
    label: '直前勉強',
    lines: ['テスト前に頑張っても', '点数が上がらない'],
    desc:
      '一夜漬けで「覚えた気」になっても、形を変えて出されると答えられません。覚えたことを使い回す練習が足りていません。',
  },
  {
    label: '優先順位',
    lines: ['何から手をつけるか', '決められない'],
    desc:
      '教科書・プリント・問題集の山の前でフリーズします。やる気はあるのに「今日は何を何分」が決められず、結局後回しにしてしまいます。',
  },
  {
    label: '塾とのギャップ',
    lines: ['塾に通っているのに', '成績が伸びない'],
    desc:
      '「通っているから大丈夫」で終わって、自習や復習が足りていないケースです。塾でやったことが、家でも続けられているかどうかの問題です。',
  },
] as const;

export default function ProblemSection() {
  return (
    <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-white via-[#FAFCFC] to-white overflow-hidden">
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
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.1rem] font-black text-[#1C4A52] leading-snug tracking-tight">
            こんなお悩み、ありませんか？
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {problems.map((p, i) => (
            <FadeInSection key={p.label} delay={i * 0.06}>
              <div className="card-playful group relative h-full bg-white rounded-2xl p-6 md:p-7 border border-[#C7E5EB]/70 shadow-[0_4px_20px_rgba(28,74,82,0.06)] hover:border-[#45B1C7]/35">
                <div className="mb-4">
                  <span className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#45B1C7] bg-[#45B1C7]/10 px-2.5 py-1 rounded-md">
                    {p.label}
                  </span>
                </div>
                <h3 className="font-serif font-black text-[#1C4A52] text-base md:text-lg leading-snug mb-3 [overflow-wrap:normal] [word-break:keep-all]">
                  {p.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
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
