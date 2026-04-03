import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/ui/FadeInSection';
import ContactCTASection from '@/components/sections/ContactCTASection';
import { SCHOOL } from '@/lib/constants';

export const metadata: Metadata = {
  title: '教室案内',
  description:
    '永田塾の教室案内。大阪府八尾市北久宝寺1-4-80。近鉄久宝寺口駅から徒歩5分程度。',
};

const accessInfo = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: '住所',
    value: SCHOOL.address,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    label: 'アクセス',
    value: SCHOOL.access,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: '電話番号',
    value: SCHOOL.phone,
    link: `tel:${SCHOOL.phone}`,
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: '受付時間',
    value: `${SCHOOL.hours}（定休: ${SCHOOL.closed}）`,
  },
];

const directions = [
  {
    method: '近鉄電車をご利用の方',
    icon: '🚃',
    steps: [
      '近鉄大阪線「久宝寺口駅」下車',
      '改札を出て北久宝寺方面へ',
      '駅から徒歩5分程度',
    ],
  },
  {
    method: 'お車をご利用の方',
    icon: '🚗',
    steps: [
      '近くにコインパーキングがございます',
      '駐車場のご案内は電話にてお問い合わせください',
    ],
  },
  {
    method: 'バスをご利用の方',
    icon: '🚌',
    steps: [
      '大阪バス「久宝寺住宅前」バス停下車',
      '布施駅南口〜近鉄八尾駅間の路線が利用可能',
      'バス停から徒歩すぐです',
    ],
  },
];

export default function AccessPage() {
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
                Access
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-[#1C4A52] leading-tight mb-4">
                教室案内
              </h1>
              <p className="text-[#555555] text-base max-w-xl">
                近鉄久宝寺口駅から徒歩5分程度。大阪府八尾市にある個別指導塾です。
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* アクセス情報 + 地図 */}
        <section className="py-16 md:py-24 bg-[#F1F5F4]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* 情報 */}
              <FadeInSection>
                <div className="bg-white rounded-2xl p-7 border border-[#E0F2F4] shadow-sm">
                  <h2 className="font-serif font-black text-2xl text-[#1C4A52] mb-6">
                    アクセス情報
                  </h2>
                  <div className="flex flex-col gap-5">
                    {accessInfo.map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-9 h-9 rounded-lg bg-[#45B1C7]/10 flex items-center justify-center text-[#45B1C7] shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#777777] mb-0.5">{item.label}</p>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="font-bold text-[#1C4A52] hover:text-[#45B1C7] transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="font-bold text-[#1C4A52]">{item.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInSection>

              {/* 地図 */}
              <FadeInSection delay={0.15}>
                <div className="rounded-2xl overflow-hidden border border-[#E0F2F4] shadow-sm bg-white">
                  <iframe
                    src="https://maps.google.com/maps?q=%E5%A4%A7%E9%98%AA%E5%BA%9C%E5%85%AB%E5%B0%BE%E5%B8%82%E5%8C%97%E4%B9%85%E5%AE%9D%E5%AF%BA1-4-80&t=&z=17&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="320"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="永田塾 地図"
                    className="w-full"
                  />
                  <div className="p-4">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SCHOOL.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#45B1C7] hover:underline"
                    >
                      Google マップで開く
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </FadeInSection>
            </div>

            {/* 道順 */}
            <FadeInSection delay={0.2} className="mt-10">
              <h2 className="font-serif font-black text-xl text-[#1C4A52] mb-6">
                お越しの方法
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {directions.map((dir, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 border border-[#E0F2F4]">
                    <div className="text-2xl mb-3">{dir.icon}</div>
                    <h3 className="font-bold text-[#1C4A52] text-sm mb-3">{dir.method}</h3>
                    <ol className="flex flex-col gap-2">
                      {dir.steps.map((step, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-[#393939] leading-relaxed">
                          <span className="text-[#45B1C7] font-bold shrink-0">{j + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
