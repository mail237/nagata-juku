import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/ui/FadeInSection';
import ContactCTASection from '@/components/sections/ContactCTASection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'お役立ち情報',
  description: '永田塾からの保護者・生徒に役立つ勉強・子育てに関するお役立ち情報をお届けします。',
};

const articles = [
  {
    tag: 'やる気・モチベーション',
    title: 'こどものやる気がなく、家では全く勉強をしません',
    body: '「うちの子は全然勉強しない…」というお悩みは、多くの保護者の方から聞かれます。子どもがやる気を持てない背景には、「わからないから逃げている」「どこから手をつけていいかわからない」という理由が隠れていることがほとんどです。まず「わかる」という小さな成功体験を積み重ねることが、やる気への第一歩です。',
  },
  {
    tag: '親子関係・コミュニケーション',
    title: '「勉強しなさい！」というと、ケンカになる',
    body: '親が「勉強しなさい」と言うほど、子どもは反発する——これはよくある光景です。命令や指示ではなく「どこが難しい？一緒に考えようか」という問いかけに変えるだけで、子どもの反応は大きく変わります。対話のヒントをご紹介します。',
  },
  {
    tag: '学習姿勢',
    title: '勉強に対して前向きでない',
    body: '勉強に対して消極的な子どもの多くは、「失敗が怖い」「どうせ自分にはできない」という思い込みを持っています。永田塾では「心のコップを上に向ける」態度教育を通じて、まず学ぶ姿勢を整えることを大切にしています。前向きな変化のきっかけ作りをご一緒に。',
  },
];

export default function ColumnPage() {
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
                <span className="w-6 h-px bg-[#45B1C7]" />Column
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-[#1C4A52] leading-tight mb-4">
                お役立ち情報
              </h1>
              <p className="text-[#555555] text-base max-w-xl">
                保護者の方・生徒の方に役立つ情報をお届けします。
              </p>
            </FadeInSection>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-[#F1F5F4]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6">
              {articles.map((article, i) => (
                <FadeInSection key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-7 border border-[#E0F2F4] shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="inline-block text-xs font-bold bg-[#45B1C7]/10 text-[#45B1C7] px-3 py-1 rounded-full mb-3">
                      {article.tag}
                    </span>
                    <h2 className="font-bold text-[#1C4A52] text-base mb-3 leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm text-[#393939] leading-relaxed">
                      {article.body}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>

            <FadeInSection delay={0.4} className="mt-10 text-center">
              <p className="text-sm text-[#777777] mb-4">
                勉強や子育てのお悩みは、お気軽にご相談ください。
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[#45B1C7] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 ease-out hover:bg-[#0B6678] hover:shadow-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
              >
                無料相談・お問合せ
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
