import Link from 'next/link';
import FadeInSection from '@/components/ui/FadeInSection';
import { NEW_CLASS_SLOTS, SCHOOL } from '@/lib/constants';

/** 新設授業枠のお知らせ（限定枠・キャンセル待ちの方へ） */
export default function NewClassSlotsSection() {
  return (
    <section
      id={NEW_CLASS_SLOTS.anchorId}
      className="scroll-mt-24 py-12 md:py-16 bg-gradient-to-b from-[#EBF6F8] to-white border-y border-[#C7E5EB]/50"
      aria-labelledby="new-class-slots-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="rounded-2xl border border-[#45B1C7]/30 bg-white shadow-[0_8px_32px_rgba(28,74,82,0.08)] overflow-hidden">
            <div className="bg-[#1C4A52] px-6 py-4 md:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#C7E5EB] uppercase">
                <span className="w-5 h-px bg-[#45B1C7]" />
                お知らせ
              </span>
              <span className="inline-flex items-center justify-center rounded-full bg-[#45B1C7] px-4 py-1.5 text-sm font-black text-white">
                残り{NEW_CLASS_SLOTS.remainingTotal}枠
              </span>
            </div>

            <div className="px-6 py-7 md:px-8 md:py-9">
              <h2
                id="new-class-slots-heading"
                className="font-serif text-xl md:text-2xl font-black text-[#1C4A52] leading-snug mb-5"
              >
                新たな授業枠を設けました
              </h2>

              <div className="space-y-4 text-sm md:text-[0.9375rem] text-[#393939] leading-loose mb-7">
                <p>
                  このたび、多数のお問い合わせをいただいておりますことを受け、新たな授業枠を設けることになりました。
                </p>
                <p>
                  週に何日でも、都合に合わせてご利用いただける体制です。なお、ご入塾は<strong className="font-bold text-[#1C4A52]">先着順</strong>
                  となりますので、ご希望の方はお早めにご連絡ください。
                </p>
              </div>

              <div className="rounded-xl border border-[#C7E5EB] bg-[#F2F9FA] p-5 md:p-6 mb-7">
                <h3 className="font-bold text-[#1C4A52] text-sm md:text-base mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#45B1C7] rounded-full shrink-0" />
                  新設 授業枠
                </h3>
                <ul className="space-y-2.5">
                  {NEW_CLASS_SLOTS.slots.map((slot) => {
                    const isFull = slot.status === 'full';
                    return (
                      <li
                        key={slot.day}
                        className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm md:text-[0.9375rem] border-b border-[#C7E5EB]/50 last:border-0 pb-2.5 last:pb-0 ${
                          isFull ? 'opacity-70' : ''
                        }`}
                      >
                        <span
                          className={`font-bold min-w-[4.5rem] ${
                            isFull ? 'text-gray-500 line-through decoration-gray-400' : 'text-[#1C4A52]'
                          }`}
                        >
                          {slot.day}
                        </span>
                        <span
                          className={`tabular-nums flex-1 ${
                            isFull ? 'text-gray-500 line-through decoration-gray-400' : 'text-[#393939]'
                          }`}
                        >
                          {slot.time}
                        </span>
                        {isFull ? (
                          <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5 shrink-0">
                            満席
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center sm:justify-start">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#45B1C7] text-white px-6 py-3 text-sm font-bold hover:bg-[#2D8FA4] hover:shadow-cta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
                >
                  お問合せ・ご入塾のご相談
                </Link>
                <a
                  href={`tel:${SCHOOL.phone}`}
                  className="inline-flex items-center justify-center rounded-full border-2 border-[#1C4A52] text-[#1C4A52] px-6 py-3 text-sm font-bold hover:bg-[#1C4A52] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
                >
                  {SCHOOL.phone}
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
