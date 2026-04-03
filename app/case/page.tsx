import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/ui/FadeInSection';
import ContactCTASection from '@/components/sections/ContactCTASection';

export const metadata: Metadata = {
  title: '実績紹介',
  description: '永田塾の成績アップ事例・進学実績をご紹介。久宝寺中・金岡中など地域の中学生の合計100点以上アップ事例多数。',
};

const cases = [
  { name: 'N さん', school: '金岡中学校', grade: '中3', result: '国語 100点満点' },
  { name: 'H くん', school: '亀井中学校', grade: '中3', result: '合計 137点アップ' },
  { name: 'R くん', school: '金岡中学校', grade: '中2', result: '合計 130点アップ' },
  { name: 'A くん', school: '久宝寺中学校', grade: '中2', result: '5教科 110点アップ' },
  { name: 'O くん', school: '久宝寺中学校', grade: '中3', result: '5教科 92点アップ' },
  { name: 'K さん', school: '久宝寺中学校', grade: '中3', result: '5教科 87点アップ' },
  { name: 'A くん', school: '久宝寺中学校', grade: '中1', result: '5教科合計 482点達成' },
  { name: 'Y くん', school: '久宝寺中学校', grade: '中3', result: '9教科 853点達成' },
  { name: 'Y くん', school: '久宝寺中学校', grade: '中3', result: '9教科 826点達成' },
  { name: 'T くん', school: '久宝寺中学校', grade: '中1', result: '英語 100点満点' },
  { name: 'I くん', school: '久宝寺中学校', grade: '中1', result: '国語 100点満点' },
  { name: 'A くん', school: '久宝寺中学校', grade: '中2', result: '英語 100点満点' },
  { name: 'M くん', school: '久宝寺中学校', grade: '中2', result: '英語 52点アップ' },
  { name: 'M さん', school: '久宝寺中学校', grade: '中1', result: '合計 60点アップ' },
  { name: 'W くん', school: '久宝寺中学校', grade: '中2', result: '英語 32点アップ' },
  { name: 'W さん', school: '久宝寺中学校', grade: '中2', result: '英語 32点アップ' },
  { name: 'M くん', school: '久宝寺中学校', grade: '中2', result: '社会 40点アップ' },
];

const achievements = {
  public: [
    '天王寺高校', '生野高校', '高津高校', '八尾高校', '市岡高校',
    '夕陽丘高校', '清水谷高校', '東住吉高校', '布施高校', '阿倍野高校',
    '山本高校', '花園高校', '国立奈良高専',
  ],
  private: [
    '大阪桐蔭高校', '桃山学院高校 S英数科', '近畿大学付属高校 英数科',
    '上宮高校', '初芝立命館高校', '金光八尾高校',
    '上宮高校 英数科', '大阪学芸高校 理数科',
  ],
};

export default function CasePage() {
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
                <span className="w-6 h-px bg-[#45B1C7]" />Results
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-[#1C4A52] leading-tight mb-4">
                実績紹介
              </h1>
              <p className="text-[#555555] text-base max-w-xl">
                永田塾の成績アップ事例・進学実績をご紹介します。
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* びっくり成績アップ事例 */}
        <section className="py-16 md:py-24 bg-[#F1F5F4]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection className="mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
                <span className="w-6 h-px bg-[#45B1C7]" />Achievement
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-[#1C4A52]">
                びっくり成績アップ事例！
              </h2>
              <p className="text-sm text-[#777777] mt-2">
                実際の生徒さんの成績改善事例を一部ご紹介します（敬称略）
              </p>
            </FadeInSection>

            {/* テーブル（PC）/ カード（SP） */}
            <FadeInSection>
              <div className="hidden md:block bg-white rounded-2xl overflow-hidden border border-[#E0F2F4] shadow-sm">
                <table className="w-full">
                  <thead className="bg-[#1C4A52] text-white">
                    <tr>
                      <th className="px-5 py-4 text-left text-xs font-bold tracking-widest">名前</th>
                      <th className="px-5 py-4 text-left text-xs font-bold tracking-widest">学校</th>
                      <th className="px-5 py-4 text-left text-xs font-bold tracking-widest">学年</th>
                      <th className="px-5 py-4 text-left text-xs font-bold tracking-widest text-[#45B1C7]">成績アップ事例</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map((c, i) => (
                      <tr key={i} className={`border-b border-[#E0F2F4] last:border-0 ${i % 2 === 0 ? '' : 'bg-[#F1F5F4]/50'}`}>
                        <td className="px-5 py-3.5 text-sm font-bold text-[#1C4A52]">{c.name}</td>
                        <td className="px-5 py-3.5 text-sm text-[#393939]">{c.school}</td>
                        <td className="px-5 py-3.5 text-sm text-[#393939]">{c.grade}</td>
                        <td className="px-5 py-3.5">
                          <span className="inline-block text-xs font-bold bg-[#45B1C7]/10 text-[#45B1C7] px-2.5 py-1 rounded-full">
                            {c.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* SP カード */}
              <div className="md:hidden flex flex-col gap-3">
                {cases.map((c, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-[#E0F2F4] shadow-sm flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-[#1C4A52] text-sm">{c.name}</p>
                      <p className="text-xs text-[#777777]">{c.school}　{c.grade}</p>
                    </div>
                    <span className="text-xs font-bold bg-[#45B1C7]/10 text-[#45B1C7] px-2.5 py-1 rounded-full whitespace-nowrap">
                      {c.result}
                    </span>
                  </div>
                ))}
              </div>
            </FadeInSection>

            {/* 進学実績 */}
            <FadeInSection delay={0.2} className="mt-16">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
                <span className="w-6 h-px bg-[#45B1C7]" />Graduates
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-black text-[#1C4A52] mb-8">
                進学実績（主な合格校・抜粋）
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-7 border border-[#E0F2F4]">
                  <h3 className="text-xs font-bold text-[#45B1C7] tracking-widest uppercase mb-4">国・公立高校</h3>
                  <div className="flex flex-wrap gap-2">
                    {achievements.public.map((s) => (
                      <span key={s} className="text-xs bg-[#F1F5F4] border border-[#C7E5EB] text-[#393939] px-2.5 py-1.5 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-7 border border-[#E0F2F4]">
                  <h3 className="text-xs font-bold text-[#45B1C7] tracking-widest uppercase mb-4">私立高校</h3>
                  <div className="flex flex-wrap gap-2">
                    {achievements.private.map((s) => (
                      <span key={s} className="text-xs bg-[#F1F5F4] border border-[#C7E5EB] text-[#393939] px-2.5 py-1.5 rounded-lg">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[#777777] mt-4">
                ※ 上記は主な実績の抜粋です。掲載許可をいただいた方のみ掲載しています。
              </p>
            </FadeInSection>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
