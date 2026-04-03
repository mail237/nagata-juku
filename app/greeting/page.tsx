import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from '@/components/PageHeader';
import FadeInSection from '@/components/ui/FadeInSection';
import ContactCTASection from '@/components/sections/ContactCTASection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '代表者ごあいさつ',
  description:
    '永田塾代表・永田知裕のごあいさつ。全国学習塾向けセミナー講師の活動、指導の思い、「態度教育」、進学実績をご紹介します。',
};

const seminarIntro = {
  title: '全国の学習塾向けセミナーで講師も務める指導力',
  lead: '全国から集まる学習塾関係者向けのセミナーでの登壇や、長年の指導の積み重ねです。',
  highlights: ['講師歴20年目', '全国セミナー講師', '大学在学中から一筋で指導'],
  paragraphs: [
    '全国から学習塾経営者や塾講師が集まる「学習塾（集団・個別指導塾）向けセミナー」の講師を務めるなど、指導方法を全国の学習塾の方に向けて紹介しています。',
    'セミナー受講者の中には「個別指導塾」の経営者の方や各地方で有名な塾がいらっしゃいました。永田式の勉強法や勉強のやり方のノウハウを多くの塾が参考にしてくださいました。',
    '大学在学中より現在まで個別指導講師、集団指導講師、家庭教師、または某学習塾の教室長として、この業界一筋でたくさんの子ども達の指導にあたり、数多くの進学実績をあげてきました。',
  ],
};

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

export default function GreetingPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          label="Greeting"
          title="代表者ごあいさつ"
          description="永田塾代表・永田知裕より、指導への思いをお伝えします。"
        />

        <section className="py-14 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInSection>
              <div className="bg-[#F1F5F4] rounded-2xl p-8 md:p-10 border border-[#C7E5EB]/60 mb-10">
                <div className="flex flex-col sm:flex-row gap-7 items-start mb-7">
                  <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-[#C7E5EB]">
                    <Image
                      src="/images/principal-real.jpg"
                      alt="塾長 永田知裕"
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-xs font-bold tracking-widest text-[#45B1C7] uppercase block mb-2">塾長</span>
                    <h2 className="font-serif text-2xl font-black text-[#1C4A52] mb-0.5">永田 知裕</h2>
                    <p className="text-sm text-[#777777] mb-4">ながた ともひろ</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-[#393939]">
                      <div className="flex gap-2"><span className="text-[#45B1C7] font-bold shrink-0">生年</span>1987年生まれ／大阪府八尾市出身</div>
                      <div className="flex gap-2"><span className="text-[#45B1C7] font-bold shrink-0">大学</span>関西学院大学 商学部 卒業</div>
                      <div className="flex gap-2"><span className="text-[#45B1C7] font-bold shrink-0">中学</span>八尾市立成法中学校 卒業</div>
                      <div className="flex gap-2"><span className="text-[#45B1C7] font-bold shrink-0">趣味</span>ドラム・フットサル・部屋の模様替え</div>
                      <div className="flex gap-2"><span className="text-[#45B1C7] font-bold shrink-0">好物</span>アクアパッツァ</div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {['講師歴20年目', '全国学習塾向けセミナー講師', '平成27年2月創業'].map((tag) => (
                        <span key={tag} className="text-xs bg-[#45B1C7]/10 border border-[#45B1C7]/20 text-[#0B6678] px-2.5 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 text-sm text-[#393939] leading-loose">
                  <p>皆様、はじめまして。塾長の永田知裕（ながたともひろ）です。当塾のホームページをご覧くださり、ありがとうございます。</p>
                  <h3 className="font-serif text-lg md:text-[1.35rem] font-black text-[#1C4A52] leading-snug pt-1 pb-0.5 text-balance">
                    「好きなこと」を仕事にする喜びを、次の世代へ。
                  </h3>
                  <p>大学に入った直後、友人の紹介で塾講師の道に足を踏み入れました。正社員として経験を積み、独立してから気づけば、今年で指導20年目を迎えます。</p>
                  <p>これまで多くのお子さまと出会い、学びを共にし、成長を間近で見守ってきた時間は、私にとってかけがえのない財産です。いま、「好きなこと」を仕事にできる環境に身を置けることに、心から感謝しています。</p>
                  <p>勉強を通じてお子さまに伝えたいのは、学力向上だけではありません。自分の「やりたいこと」を追い続ける楽しさ──そんな生き方の一端を、少しでも感じてもらえたらと思っています。「こういう大人もいるんだ」と思えるきっかけになれば、私にとってこれ以上の喜びはありません。</p>
                  <p>自分の道を切り開き、人生をまっすぐに楽しむ。そんな大人へと成長していけるよう、これからも精一杯サポートしてまいります。</p>
                </div>

                <div className="mt-7 pt-6 border-t border-[#C7E5EB]/60 text-right">
                  <p className="font-serif font-black text-lg text-[#1C4A52]">永田塾 代表 永田 知裕</p>
                </div>
              </div>
            </FadeInSection>

            {/* 全国セミナー（写真＋横並びの説明・自然な余白） */}
            <FadeInSection delay={0.08}>
              <div className="mb-10 rounded-2xl border border-[#C7E5EB]/50 bg-gradient-to-br from-[#FAFCFC] via-white to-[#F4F9F8] p-7 shadow-[0_4px_32px_rgba(28,74,82,0.06)] sm:p-8 md:p-10">
                <div className="flex flex-col gap-9 md:flex-row md:items-start md:gap-10 lg:gap-12">
                  <figure className="mx-auto w-full max-w-[320px] shrink-0 md:mx-0 md:w-[42%] md:max-w-none lg:w-[40%]">
                    <div className="overflow-hidden rounded-[1.15rem] bg-[#E8EEED] shadow-[0_12px_40px_rgba(28,74,82,0.12)] ring-1 ring-[#1C4A52]/[0.06]">
                      <Image
                        src="/images/principal-seminar.jpg?v=no-text-2026"
                        alt="学習塾向けセミナーで講師を務める様子（実際の写真）"
                        width={418}
                        height={462}
                        className="h-auto w-full object-contain"
                        sizes="(min-width: 1024px) 340px, (min-width: 768px) 38vw, 90vw"
                        unoptimized
                      />
                    </div>
                    <figcaption className="mt-3 text-center text-xs text-[#999999] md:text-left">
                      学習塾向けセミナー講師として登壇した際の撮影
                    </figcaption>
                  </figure>

                  <div className="min-w-0 flex-1 md:pt-1">
                    <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase">
                      <span className="h-px w-5 bg-[#45B1C7]" />
                      塾長の経験・実績
                    </span>
                    <h2 className="font-serif text-xl font-black leading-tight text-[#1C4A52] md:text-2xl">
                      {seminarIntro.title}
                    </h2>
                    <p className="mt-3 text-sm text-[#777777] leading-relaxed">{seminarIntro.lead}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {seminarIntro.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-full border border-[#45B1C7]/25 bg-white/80 px-3 py-1 text-xs font-bold text-[#0B6678] shadow-sm"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-col gap-4 text-sm leading-loose text-[#393939]">
                      {seminarIntro.paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* 態度教育 */}
            <FadeInSection delay={0.12}>
              <div className="bg-[#EBF2F3] rounded-2xl p-8 md:p-10 border border-[#C7E5EB]/60 mb-10">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-4">
                  <span className="w-5 h-px bg-[#45B1C7]" />指導理念
                </span>
                <h2 className="font-serif text-2xl font-black text-[#1C4A52] mb-6 leading-tight">
                  「態度教育」——心のコップを上に向ける
                </h2>
                <div className="flex flex-col gap-4 text-sm text-[#393939] leading-loose">
                  <p>学力をのばすためには、まず取り組む姿勢を正していくことが大切です。そのため、永田塾では「態度教育」を重視した指導を行っています。</p>
                  <p>生徒が、学びたい、勉強したい、教えてほしい、という素直な気持ちでいる時、それを「心のコップが上を向いている」状態とします。心のコップが上を向いている時は、勉強のノウハウを注いでいけば、水を注ぐがごとくにどんどんと吸収していきます。</p>
                  <p>下を向いた心を上に向けるには、たとえ小さくても輝く「未来の希望の兆し」に気づかせ、そこから今の自分を見させること。そうして、心のコップを上に向けてあげることが永田塾の「態度教育」です。</p>
                  <p>心のコップが上を向けば、やがては教えられなくても、自らが主体的で前向きな生き方ができるようになります。「主体性を持ち物事に取り組むことができる」そのような子ども達を八尾市から多数輩出することを使命としています。</p>
                </div>
              </div>
            </FadeInSection>

            {/* 進学実績 */}
            <FadeInSection delay={0.2}>
              <div className="bg-[#F1F5F4] rounded-2xl p-7 border border-[#C7E5EB]/60">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
                  <span className="w-5 h-px bg-[#45B1C7]" />進学実績
                </span>
                <h2 className="font-serif text-xl font-black text-[#1C4A52] mb-6">主な進学実績（抜粋）</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold text-[#45B1C7] tracking-widest uppercase mb-3">国・公立高校</h3>
                    <div className="flex flex-wrap gap-2">
                      {achievements.public.map((s) => (
                        <span key={s} className="text-xs bg-white border border-[#C7E5EB] text-[#393939] px-2.5 py-1.5 rounded-lg">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#45B1C7] tracking-widest uppercase mb-3">私立高校</h3>
                    <div className="flex flex-wrap gap-2">
                      {achievements.private.map((s) => (
                        <span key={s} className="text-xs bg-white border border-[#C7E5EB] text-[#393939] px-2.5 py-1.5 rounded-lg">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[#777777] mt-5">
                  ※ 詳細は
                  <Link href="/case" className="text-[#45B1C7] hover:underline mx-1">実績紹介ページ</Link>
                  をご覧ください。
                </p>
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
