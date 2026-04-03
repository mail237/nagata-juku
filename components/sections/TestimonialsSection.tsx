'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInSection from '@/components/ui/FadeInSection';

const testimonials = [
  {
    name: 'K.T ちゃん',
    photo: '/images/voice-hs-kt.png',
    school: '天王寺高校卒 → 大阪市立大学 卒業',
    grade: '小6〜中3（4年間）',
    body: '私は小学6年生から中学3年生までの4年間、永田先生に勉強を教えてもらいました。初めは、塾は堅いイメージだったのですが、実際は先生が気さくで何でも質問できるぐらいフレンドリーでした。授業もわかりやすく、勉強をすることに慣れていない自分に、優しく声をかけてくれて細かく勉強の仕方についても指導してもらいました。また高校受験の時は、先生が勉強だけでなく進路の話も真剣に聞いてくれました。その結果、見事に第一志望校高校へ合格することができました。',
    result: '第一志望校に合格',
    highlight: '先生が気さくで何でも質問しやすい',
  },
  {
    name: 'Y.N くん',
    photo: '/images/voice-hs-yn.png',
    school: '八尾高校卒 → 大阪教育大学 在学（現・永田塾講師）',
    grade: '小6〜高3（7年間）',
    body: '僕は小6の時から高3までの7年間、永田先生に勉強を教えてもらいました。永田塾は一人ひとりで指導してもらえる塾なので、わからなかったところが相談できるのがうれしかったです。今考えると、授業態度の悪かった僕を見捨てずにしっかりと教えてくれていたと思います。今では永田塾の講師として子ども達に指導をさせていただいています。将来は教育関係の仕事をしたいと考えているので、永田先生に色々と相談にのってもらっています。',
    result: '第一志望の八尾高校・大阪教育大学へ進学',
    highlight: '7年間通い続け、今は講師として活躍',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-20 md:py-28 bg-[#F1F5F4]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-3">
            <span className="w-6 h-px bg-[#45B1C7]" />
            Voice
            <span className="w-6 h-px bg-[#45B1C7]" />
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-black text-[#1C4A52] leading-tight">
            生徒・卒業生の声
          </h2>
        </FadeInSection>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 1, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 1, y: -12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-sm border border-[#E0F2F4] p-8 md:p-10"
            >
              {/* 引用符 */}
              <div className="text-[#45B1C7]/20 font-serif text-8xl leading-none select-none -mt-4 mb-2">
                &ldquo;
              </div>

              <p className="text-[#1C4A52] text-base leading-loose mb-6">
                {testimonials[current].body}
              </p>

              {/* 実績バッジ */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-block bg-[#45B1C7]/10 text-[#45B1C7] text-xs font-bold px-3 py-1 rounded-full">
                  {testimonials[current].highlight}
                </span>
                <span className="inline-block bg-[#1C4A52]/5 text-[#393939] text-xs font-bold px-3 py-1 rounded-full">
                  {testimonials[current].result}
                </span>
              </div>

              <div className="flex items-center gap-4 border-t border-[#E0F2F4] pt-5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-[#C7E5EB]/60">
                  <Image
                    src={testimonials[current].photo}
                    alt="高校生在学イメージ（実在の特定個人ではありません）"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-bold text-[#1C4A52] text-sm">
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs text-[#777777] mt-0.5">
                    {testimonials[current].school}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs bg-[#E0F2F4] text-[#393939] font-bold px-2.5 py-1 rounded-md">
                    {testimonials[current].grade}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ナビゲーション */}
          <div className="flex items-center justify-center gap-4 mt-7">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C7E5EB] text-[#393939] transition-all duration-200 hover:border-[#45B1C7] hover:text-[#45B1C7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45B1C7]"
              aria-label="前へ"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45B1C7] ${
                    i === current
                      ? 'h-2 w-6 bg-[#45B1C7]'
                      : 'h-2 w-2 bg-[#C7E5EB] hover:bg-[#45B1C7]/40'
                  }`}
                  aria-label={`${i + 1}件目を表示`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C7E5EB] text-[#393939] transition-all duration-200 hover:border-[#45B1C7] hover:text-[#45B1C7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45B1C7]"
              aria-label="次へ"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
