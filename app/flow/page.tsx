import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/ui/FadeInSection';
import ContactCTASection from '@/components/sections/ContactCTASection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ご入塾までの流れ',
  description: '永田塾へのご入塾までの流れをご説明します。お問合せ→個別面談→体験授業→入塾まで丁寧にご案内します。',
};

const steps = [
  {
    num: '01',
    title: 'お問合せ',
    body: '「うちの子にも合うの？」「成績は本当に上がるの？」「もっと詳しく聞きたい」など、入塾に関するお問合せや個別相談（お子様の現状やお悩みをお聞きします）・無料体験授業のお申込みはこちらからお気軽にどうぞ。直接お電話いただいても大丈夫です。',
    note: 'お問合せ: 072-940-7683（月〜土 15:00〜22:00）',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: '個別面談',
    body: 'お問合せをいただいたのち、ご希望の方は永田塾に来ていただき、お子様の現在の成績・学校や家庭での学習状況、保護者様のご要望・不安を感じていることなどをお聞きして、ご提案をします。お子様の性格や学習状況・テストの点数などから、どのような指導がお子様のためになるかをしっかりとご提案いたします。',
    note: '直近のテスト解答用紙や通知表をお持ちいただくとより正確にご提案できます',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: '体験授業',
    body: 'どのような教室で、どのような雰囲気で、どのような授業を行うのか、実際に授業を受けてみないと分かりません。ご希望の方は無料体験授業でじっくりと永田塾を体験していただけます。通常の授業と全く同じ授業時間で体験していただくことができます。たった1日の体験授業ですが、「分かる！」「できる！」をお子様に体験していただきます。',
    note: '完全無料・体験後の勧誘なし',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    num: '04',
    title: '授業後面談',
    body: '授業を実際に体験していただいた後、面談をいたします。体験授業でのお子様の様子、できていたところ、苦手なところなどをご報告して、再度ご提案をさせていただきます。お子様、保護者様ともに永田塾を気に入っていただければ入塾となります。月の途中からでも入塾できますので、お困りの時はすぐに不安を解消することができます。',
    note: '強引な勧誘は一切行いません',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
  {
    num: '05',
    title: '入塾',
    body: '目標に向けて「本気」で、一緒に、確実に進んでいきましょう。入塾後も塾長が一人ひとりの進捗を管理し、最適なカリキュラムで指導します。定期的な保護者面談で状況をご報告しますので、ご安心ください。',
    note: '月の途中からでも入塾OK・翌日から授業開始可能',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export default function FlowPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-gradient-to-br from-[#EBF2F3] via-[#F1F5F4] to-[#F2F9FA] pt-32 pb-16 md:pb-20 relative overflow-hidden border-b border-[#C7E5EB]/60">
          <div aria-hidden className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-[0.06]"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #45B1C7 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <FadeInSection>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-4">
                <span className="w-6 h-px bg-[#45B1C7]" />Flow
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-[#1C4A52] leading-tight mb-4">
                ご入塾までの流れ
              </h1>
              <div className="text-[#555555] text-base max-w-xl space-y-2">
                <p>永田塾では、新規塾生様の入塾を随時受け付けております。</p>
                <p className="text-sm text-[#666666]">
                  ※ 満席の際は募集を行いません。空席情報はご連絡ください。
                </p>
              </div>
            </FadeInSection>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#F1F5F4]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              {/* 縦ライン */}
              <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#45B1C7] via-[#45B1C7]/30 to-transparent hidden sm:block" />

              <div className="flex flex-col gap-8">
                {steps.map((step, i) => (
                  <FadeInSection key={i} delay={i * 0.1}>
                    <div className="flex gap-6 items-start">
                      {/* アイコン */}
                      <div className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                        i === 0 ? 'bg-[#45B1C7] text-white shadow-cta' : 'border-2 border-[#C7E5EB] bg-white text-[#45B1C7]'
                      }`}>
                        {step.icon}
                      </div>

                      {/* コンテンツ */}
                      <div className="flex-1 bg-white rounded-2xl p-6 border border-[#E0F2F4] shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="font-serif font-black text-xs text-[#45B1C7]">STEP {step.num}</span>
                          <h2 className="font-bold text-[#1C4A52] text-lg">{step.title}</h2>
                        </div>
                        <p className="text-sm text-[#393939] leading-relaxed mb-3">{step.body}</p>
                        {step.note && (
                          <div className="flex items-center gap-2 text-xs text-[#45B1C7] font-bold bg-[#45B1C7]/5 px-3 py-2 rounded-lg">
                            <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {step.note}
                          </div>
                        )}
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </div>
            </div>

            <FadeInSection delay={0.5} className="mt-12 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#45B1C7] px-8 py-4 text-sm font-black text-white transition-all duration-300 ease-out hover:bg-[#0B6678] hover:shadow-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
              >
                無料体験を申し込む（STEP 01へ）
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </FadeInSection>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
