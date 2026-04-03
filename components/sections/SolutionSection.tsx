'use client';

import FadeInSection from '@/components/ui/FadeInSection';
import Link from 'next/link';

const steps = [
  {
    num: '01',
    title: 'ICTで「わからない」を瞬時に特定',
    body: '最新のICTツールが、どの単元でつまずいているかを即座に診断。データに基づいてあなただけのカリキュラムを組み立てます。',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'ゲーム感覚で基礎を大量反復',
    body: '計算・英単語などの基礎練習を、ゲームアプリ感覚で「飽きずに、大量に」こなせる仕組みを採用。楽しみながら、気づけば体に染み込んでいます。',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '盤石な土台から応用・入試問題へ',
    body: '基礎が固まれば、複雑に見えた応用問題も驚くほどスムーズに解けるようになります。焦らず土台から。確実な一歩が、大きな結果につながります。',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

export default function SolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-[#EBF2F3] relative overflow-hidden">
      <div aria-hidden className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #45B1C7 1px, transparent 0)`, backgroundSize: '36px 36px' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeInSection className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
            <span className="w-5 h-px bg-[#45B1C7]" />Solution<span className="w-5 h-px bg-[#45B1C7]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1C4A52] leading-tight">
            原因は「難問」ではなく
            <br />
            <span className="text-[#45B1C7]">「基礎の抜け」</span>にある
          </h2>
          <p className="mt-4 text-sm text-[#555555] max-w-lg mx-auto leading-relaxed">
            定期テストで400点に届いていないなら、難しい問題に手を出す前に、まずは基礎を固めることが最優先です。
          </p>
        </FadeInSection>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {steps.map((step, i) => (
            <FadeInSection key={i} delay={i * 0.12}>
              <div className="relative bg-white rounded-2xl p-7 border border-[#C7E5EB]/60 shadow-card transition-all duration-300 ease-out hover:shadow-card-hover hover:-translate-y-0.5 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#45B1C7]/10 flex items-center justify-center text-[#45B1C7] shrink-0">
                    {step.icon}
                  </div>
                  <span className="font-serif font-black text-3xl text-[#45B1C7]/25 leading-none select-none">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-[#1C4A52] text-base leading-snug mb-3">{step.title}</h3>
                <p className="text-sm text-[#555555] leading-relaxed flex-1">{step.body}</p>

                {i < 2 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-[#45B1C7]/20 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#45B1C7]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection delay={0.4} className="mt-10 text-center">
          <Link
            href="/service#reasons-detail"
            className="inline-flex items-center gap-2 rounded-md text-sm font-bold text-[#45B1C7] transition-all duration-300 ease-out hover:gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
          >
            特長の詳細を見る
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </FadeInSection>
      </div>
    </section>
  );
}
