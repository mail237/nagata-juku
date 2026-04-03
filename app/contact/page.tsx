import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/ui/FadeInSection';
import ContactForm from './ContactForm';
import { SCHOOL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'お問合せ・無料体験申込み',
  description:
    '永田塾へのお問合せ・無料体験授業の申込みはこちら。電話またはフォームからお気軽にご連絡ください。',
};

const quickInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'お電話',
    value: SCHOOL.phone,
    note: '受付: ' + SCHOOL.hours,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: '定休日',
    value: SCHOOL.closed,
    note: '上記以外は受付中',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: '所在地',
    value: '八尾市北久宝寺1-4-80',
    note: '近鉄久宝寺口 徒歩5分程度',
  },
  ...(SCHOOL.instagramUrl
    ? [
        {
          icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          ),
          label: 'Instagram',
          value: '公式アカウントを見る',
          note: '塾の様子・お知らせを発信中',
          href: SCHOOL.instagramUrl,
        },
      ]
    : []),
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        {/* ページヘッダー */}
        <section className="bg-gradient-to-br from-[#EBF2F3] via-[#F1F5F4] to-[#F2F9FA] pt-32 pb-16 md:pb-20 relative overflow-hidden border-b border-[#C7E5EB]/60">
          <div
            aria-hidden
            className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #45B1C7 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <FadeInSection>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-4">
                <span className="w-6 h-px bg-[#45B1C7]" />
                Contact
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-[#1C4A52] leading-tight mb-4">
                お問合せ・無料体験申込み
              </h1>
              <p className="text-[#555555] text-base max-w-xl">
                お気軽にご連絡ください。無料体験後の勧誘は一切ありません。
              </p>
            </FadeInSection>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#F1F5F4]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* サイドバー */}
              <div className="lg:col-span-1">
                <FadeInSection>
                  <div className="sticky top-28 flex flex-col gap-4">
                    <div className="bg-white rounded-2xl p-6 border border-[#E0F2F4] shadow-sm">
                      <h2 className="font-bold text-[#1C4A52] mb-4 text-sm">お問合せ方法</h2>
                      <div className="flex flex-col gap-4">
                        {quickInfo.map((info, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-9 h-9 rounded-lg bg-[#45B1C7]/10 flex items-center justify-center text-[#45B1C7] shrink-0">
                              {info.icon}
                            </div>
                            <div>
                              <p className="text-xs text-[#777777]">{info.label}</p>
                              {'href' in info && info.href ? (
                                <a
                                  href={info.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-bold text-[#1C4A52] text-sm hover:text-[#45B1C7] hover:underline inline-block"
                                >
                                  {info.value}
                                </a>
                              ) : (
                                <p className="font-bold text-[#1C4A52] text-sm">{info.value}</p>
                              )}
                              <p className="text-xs text-[#777777]">{info.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <a
                        href={`tel:${SCHOOL.phone}`}
                        className="mt-5 flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#1C4A52] text-white font-bold rounded-xl text-sm hover:bg-black transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        電話で問い合わせる
                      </a>
                    </div>
                  </div>
                </FadeInSection>
              </div>

              {/* フォーム */}
              <div className="lg:col-span-2">
                <FadeInSection delay={0.1}>
                  <ContactForm />
                </FadeInSection>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
