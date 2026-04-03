import FadeInSection from '@/components/ui/FadeInSection';

interface Props {
  label: string;
  title: string;
  description?: string;
}

export default function PageHeader({ label, title, description }: Props) {
  return (
    <section className="bg-gradient-to-br from-[#EBF2F3] via-[#F1F5F4] to-white pt-32 pb-16 md:pb-20 relative overflow-hidden border-b border-[#C7E5EB]/60">
      <div
        aria-hidden
        className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #45B1C7 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeInSection>
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
            <span className="w-5 h-px bg-[#45B1C7]" />
            {label}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-black text-[#1C4A52] leading-tight mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-[#555555] text-base max-w-xl leading-relaxed">
              {description}
            </p>
          )}
        </FadeInSection>
      </div>
    </section>
  );
}
