import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/ui/FadeInSection';
import ContactCTASection from '@/components/sections/ContactCTASection';
import VacancyProgrammingSection from '@/components/sections/VacancyProgrammingSection';
import FeaturePointCards from '@/components/sections/FeaturePointCards';
import ServiceFeatureReasonsDetail from '@/components/sections/ServiceFeatureReasonsDetail';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '授業内容・料金',
  description:
    '永田塾の授業内容と料金。塾長の直接指導・定額通い放題・ICT活用（自宅オンライン可）の詳しい説明、料金表、入塾の流れ。マイクラプログラミング（コードアドベンチャー八尾校）の案内も。',
};

const flow = [
  { step: '01', title: 'お問合せ', desc: 'フォームまたはお電話にてご連絡ください。' },
  { step: '02', title: '無料体験授業', desc: '実際に授業を体験していただきます。完全無料・勧誘なし。' },
  { step: '03', title: 'カウンセリング', desc: '現状の学習状況・目標をお聞きし、最適なプランをご提案。' },
  { step: '04', title: 'ご入塾', desc: '月の途中からでも翌日から授業開始可能。' },
];

export default function ServicePage() {
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
                <span className="w-6 h-px bg-[#45B1C7]" />Service & Price
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-[#1C4A52] leading-tight mb-4">
                授業内容・料金
              </h1>
              <p className="text-[#555555] text-base max-w-xl leading-relaxed">
                塾長の直接指導・定額通い放題・ICT活用の3つの特長と、料金・入塾の流れをご案内します。まずは無料体験授業からお気軽にスタートできます。
              </p>
            </FadeInSection>
          </div>
        </section>

        <FeaturePointCards
          className="py-16 md:py-24 bg-[#F1F5F4]"
          eyebrow="Features"
          title="永田塾の特長"
          lead="トップページ「選ばれる3つの理由」と同じレイアウトのあと、下のセクションで詳しくご紹介します。"
          cta={{ href: '#reasons-detail', label: '詳しい説明を見る' }}
        />

        <ServiceFeatureReasonsDetail />

        {/* 料金表 */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
                <span className="w-5 h-px bg-[#45B1C7]" />Price<span className="w-5 h-px bg-[#45B1C7]" />
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-[#1C4A52]">授業料</h2>
              <p className="mt-2 text-sm text-[#777777]">表内の金額はすべて月額・税込です</p>
            </FadeInSection>

            {/* 通いホーダイ料金表 */}
            <FadeInSection className="mb-10">
              <div className="bg-[#F1F5F4] rounded-2xl overflow-hidden border border-[#C7E5EB]/60">
                <div className="bg-[#45B1C7] px-6 py-4 flex items-center gap-3">
                  <span className="text-white font-black font-serif text-lg">通いホーダイコース</span>
                  <span className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full font-bold">週何回でも定額</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#EBF2F3] text-[#1C4A52]">
                        <th className="px-5 py-3 text-left font-bold text-xs">学年</th>
                        <th className="px-5 py-3 text-center font-bold text-xs">1科目</th>
                        <th className="px-5 py-3 text-center font-bold text-xs">2科目</th>
                        <th className="px-5 py-3 text-center font-bold text-xs bg-[#45B1C7]/10">3科目〜</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { grade: '小学生', subjects: '英・算・国', p1: '5,900円', p2: '9,900円', p3: '13,900円' },
                        { grade: '中学生', subjects: '英・数・国・理・社', p1: '12,900円', p2: '18,900円', p3: '24,300円' },
                        { grade: '高校生', subjects: '英・数・国・理・社', p1: '14,900円', p2: '24,900円', p3: '29,700円', note: true },
                        {
                          grade: 'プログラミング',
                          subjects: '',
                          p1: '10,500円',
                          p2: '—',
                          p3: '—',
                          programming: true,
                        },
                      ].map((row, i) => (
                        <tr key={i} className={`border-t border-[#C7E5EB]/40 ${'programming' in row && row.programming ? 'bg-[#FAFCFC]' : 'bg-white'}`}>
                          <td className="px-5 py-4">
                            <span className="font-bold text-[#1C4A52]">{row.grade}</span>
                            {row.subjects ? (
                              <span className="text-[#777777] text-xs ml-2">（{row.subjects}）</span>
                            ) : null}
                            {'note' in row && row.note && <span className="ml-2 text-[10px] text-[#45B1C7] font-bold">※紹介のみ</span>}
                          </td>
                          <td className={`px-5 py-4 text-center font-bold ${'programming' in row && row.programming ? 'text-[#45B1C7] font-black text-base' : 'text-[#393939]'}`}>{row.p1}</td>
                          <td className="px-5 py-4 text-center font-bold text-[#393939]">{row.p2}</td>
                          <td className="px-5 py-4 text-center font-black text-[#45B1C7] bg-[#EBF2F3]">{row.p3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-[#F1F5F4] border-t border-[#C7E5EB]/40">
                  <ul className="flex flex-col gap-1">
                    {[
                      '授業料は定額で週に何度でも通えます',
                      '別途、入塾金（10,000円）・教材費・教室維持費（1,000円/月）がかかります',
                      '高校生は卒業生または塾生紹介のみの募集となります',
                      'プログラミング（10,500円/月）は通いホーダイの学習塾料金とは別コースです',
                    ].map((note, i) => (
                      <li key={i} className="text-xs text-[#777777] flex items-start gap-1.5">
                        <span className="text-[#45B1C7] shrink-0">※</span>{note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={0.1} className="text-center">
              <p className="text-xs text-[#777777] mb-5">
                料金についてのご不明点は、お気軽にお問合せください。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#45B1C7] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 ease-out hover:bg-[#0B6678] hover:shadow-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
              >
                無料体験・お問合せはこちら
              </Link>
            </FadeInSection>
          </div>
        </section>

        {/* 入塾の流れ */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="text-center mb-12">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
                <span className="w-6 h-px bg-[#45B1C7]" />Flow<span className="w-6 h-px bg-[#45B1C7]" />
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-[#1C4A52]">
                入塾の流れ
              </h2>
              <p className="mt-2 text-sm text-[#777777]">
                詳しくは
                <Link href="/flow" className="mx-1 rounded-sm text-[#45B1C7] underline-offset-2 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45B1C7]">入塾の流れページ</Link>
                をご覧ください。
              </p>
            </FadeInSection>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-stretch">
              {flow.map((item, i) => (
                <FadeInSection key={i} delay={i * 0.1} className="h-full min-h-0 w-full">
                  <div
                    className={`flex h-full min-h-[11.5rem] flex-col justify-start gap-2 rounded-xl p-5 text-center border ${
                      i === 0 ? 'bg-[#45B1C7] border-[#45B1C7] text-white' : 'bg-[#F1F5F4] border-[#E0F2F4]'
                    }`}
                  >
                    <p className={`font-serif font-black text-2xl shrink-0 leading-none ${i === 0 ? 'text-white' : 'text-[#45B1C7]'}`}>
                      {item.step}
                    </p>
                    <h3 className={`font-bold text-sm shrink-0 ${i === 0 ? 'text-white' : 'text-[#1C4A52]'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-xs leading-relaxed flex-1 ${i === 0 ? 'text-white/80' : 'text-[#777777]'}`}>
                      {item.desc}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        <VacancyProgrammingSection compact />

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
