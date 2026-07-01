import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FadeInSection from '@/components/ui/FadeInSection';
import ContactCTASection from '@/components/sections/ContactCTASection';
import GradePeriodBadge from '@/components/ui/GradePeriodBadge';

export const metadata: Metadata = {
  title: '生徒の声',
  description:
    '永田塾の卒業生・在校生の声。実際の成績改善・合格実績をご紹介します。',
};

const voices = [
  {
    name: 'S.H さん',
    photo: '/images/girl-student.png',
    detail: '高校3年生（在籍中）',
    gradeRange: '小2〜高3',
    gradeDuration: '約11年間',
    before: '小学2年生の頃から通い始めた',
    after: '高校3年生。受験に向けて学習を続けている',
    body: '小学2年生の時からずっとお世話になっています。この記事を載せた時点では高校3年生です。通っている期間が長すぎて、もう永田塾は家みたいになっています。わからないところをその場で聞けるし、部活で忙しい時期も無理のないペースで続けられました。長く通い続けられるのは、先生が一人ひとりを見てくれるからだと思います。',
    highlight: '通い続けて、塾が「家」みたいに',
  },
  {
    name: 'K.T ちゃん',
    photo: '/images/voice-hs-kt.png',
    detail: '天王寺高校卒 → 大阪市立大学 卒業',
    gradeRange: '小6〜中3',
    gradeDuration: '4年間',
    before: '塾は堅いイメージで不安だった',
    after: '第一志望校（天王寺高校）合格 → 大阪市立大学 卒業',
    body: '私は小学6年生から中学3年生までの4年間、永田先生に勉強を教えてもらいました。初めは、塾は堅いイメージだったのですが、実際は先生が気さくで何でも質問できるぐらいフレンドリーでした。授業もわかりやすく、勉強をすることに慣れていない自分に、優しく声をかけてくれて細かく勉強の仕方についても指導してもらいました。また高校受験の時は、先生が勉強だけでなく進路の話も真剣に聞いてくれました。その結果、見事に第一志望校高校へ合格することができました。今は社会人となりましたが、今でも付き合いがあります。先生には本当に感謝しています。',
    highlight: '先生が気さくで何でも質問できる環境',
  },
  {
    name: 'Y.N くん',
    photo: '/images/voice-hs-yn.png',
    detail: '八尾高校卒 → 大阪教育大学 在学（現・永田塾講師）',
    gradeRange: '小6〜高3',
    gradeDuration: '7年間',
    before: '授業態度が悪く、成績も低迷していた',
    after: '八尾高校・大阪教育大学に進学。現在は永田塾の講師として活躍',
    body: '僕は小6の時から高3までの7年間、永田先生に勉強を教えてもらいました。永田塾は一人ひとりで指導してもらえる塾なので、わからなかったところが、相談できるのがうれしかったです。今考えると、授業態度の悪かった僕を見捨てずにしっかりと教えてくれていたと思います。ラーメンなどにもよく連れていってもらい、とても嬉しかったです。今では永田塾の講師として子ども達に指導をさせていただいています。将来は教育関係の仕事をしたいと考えているので、永田先生に色々と相談にのってもらっています。',
    highlight: '7年間通い続け、今は永田塾の講師として活躍中',
  },
];

export default function VoicePage() {
  return (
    <>
      <Header />
      <main>
        {/* ページヘッダー */}
        <section className="bg-gradient-to-br from-[#EBF6F8] via-[#F2F9FA] to-[#F2F9FA] pt-32 pb-16 md:pb-20 relative overflow-hidden border-b border-[#C7E5EB]/60">
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
                Voice
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-black text-[#1C4A52] leading-tight mb-4">
                生徒・卒業生の声
              </h1>
              <p className="text-[#555555] text-base max-w-xl">
                永田塾で学んだ生徒・保護者の方々からの声をご紹介します。
              </p>
            </FadeInSection>
          </div>
        </section>

        {/* 声一覧 */}
        <section className="py-16 md:py-24 bg-[#F2F9FA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-7">
              {voices.map((v, i) => (
                <FadeInSection key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-[#E0F2F4] shadow-sm hover:shadow-md transition-shadow duration-300">
                    {/* Before/After */}
                    <div className="grid grid-cols-2 border-b border-[#E0F2F4]">
                      <div className="px-6 py-4 bg-[#F2F9FA] border-r border-[#E0F2F4]">
                        <p className="text-xs font-bold text-[#777777] mb-1">Before</p>
                        <p className="text-sm font-bold text-[#393939]">{v.before}</p>
                      </div>
                      <div className="px-6 py-4 bg-[#45B1C7]/5">
                        <p className="text-xs font-bold text-[#45B1C7] mb-1">After</p>
                        <p className="text-sm font-bold text-[#45B1C7]">{v.after}</p>
                      </div>
                    </div>

                    <div className="p-7">
                      {/* 引用 */}
                      <p className="text-[#1C4A52] text-sm leading-loose mb-5 relative">
                        <span className="text-[#45B1C7]/20 font-serif text-4xl leading-none absolute -top-2 -left-1 select-none">
                          &ldquo;
                        </span>
                        <span className="relative">{v.body}</span>
                      </p>

                      {/* ハイライト */}
                      <span className="inline-block bg-[#45B1C7]/10 text-[#45B1C7] text-xs font-bold px-3 py-1.5 rounded-full mb-5">
                        {v.highlight}
                      </span>

                      {/* プロフィール */}
                      <div className="border-t border-[#E0F2F4] pt-5 space-y-3">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[#C7E5EB]/60">
                            <Image
                              src={v.photo}
                              alt="高校生在学イメージ（実在の特定個人ではありません）"
                              fill
                              className="object-cover"
                              sizes="44px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold text-[#1C4A52] text-sm">{v.name}</p>
                            <p className="text-xs text-[#777777] leading-relaxed">{v.detail}</p>
                          </div>
                        </div>
                        <GradePeriodBadge
                          range={v.gradeRange}
                          duration={v.gradeDuration}
                          className="block w-fit max-w-full border border-[#C7E5EB] bg-[#F2F9FA]"
                        />
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>

        <ContactCTASection />
      </main>
      <Footer />
    </>
  );
}
