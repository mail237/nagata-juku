import FadeInSection from '@/components/ui/FadeInSection';

export default function HabitConceptSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInSection>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
            <span className="w-6 h-px bg-[#45B1C7]" />
            Concept
            <span className="w-6 h-px bg-[#45B1C7]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1C4A52] leading-tight">
            基礎 × 習慣
          </h2>
          <p className="mt-5 text-sm md:text-base text-[#393939] leading-[1.9] max-w-2xl mx-auto">
            塾で基礎を埋めても、家で続かなければ定着しません。永田塾では、家でも毎日机に向かう習慣をつけます。
          </p>
          <p className="mt-4 text-sm md:text-base text-[#393939] leading-[1.9] max-w-2xl mx-auto">
            家庭学習は専用アプリ「つづける」に記録します。勉強した時間と内容が残り、保護者の方も「おうちの画面」で確認できます。
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
