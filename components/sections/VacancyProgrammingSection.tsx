'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '@/components/ui/FadeInSection';
import { SCHOOL, CODE_ADVENTURE_YAO_LP, VACANCY_ROWS } from '@/lib/constants';

type Props = {
  /** 授業・料金ページでは余白を少し詰める */
  compact?: boolean;
};

export default function VacancyProgrammingSection({ compact }: Props) {
  const py = compact ? 'py-12 md:py-16' : 'py-16 md:py-20';

  return (
    <section className={`${py} bg-[#FAFCFC] border-y border-[#C7E5EB]/50`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 md:items-start">
          <FadeInSection>
            <span className="inline-block text-xs font-bold text-[#45B1C7] tracking-wider uppercase mb-2">
              空席案内
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C4A52] mb-4">
              現在の空席状況
            </h2>
            <div
              className="rounded-xl border border-[#C7E5EB] bg-white shadow-sm overflow-hidden mb-5"
              role="region"
              aria-label="空席案内一覧"
            >
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#E8F7FA]/80 border-b border-[#C7E5EB]">
                    <th scope="col" className="px-4 py-3 font-bold text-[#1C4A52]">
                      対象
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold text-[#1C4A52]">
                      状況
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {VACANCY_ROWS.map((row, i) => {
                    const status = row.status as string;
                    const isLimited =
                      status.includes('残り') || status.includes('空席あり');
                    const isFull = status === '満席' || status === '空席なし';
                    return (
                      <tr
                        key={row.label}
                        className={
                          i < VACANCY_ROWS.length - 1 ? 'border-b border-[#C7E5EB]/60' : ''
                        }
                      >
                        <th
                          scope="row"
                          className="px-4 py-3 font-medium text-gray-800 align-middle"
                        >
                          {row.label}
                        </th>
                        <td className="px-4 py-3 align-middle">
                          <span
                            className={
                              isLimited
                                ? 'inline-block font-bold text-[#1C4A52] bg-[#C7E5EB]/40 px-2.5 py-0.5 rounded-md'
                                : isFull
                                  ? 'text-gray-500 font-medium'
                                  : 'text-gray-700'
                            }
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5 space-y-2">
              <span className="block text-[#1C4A52]/90">
                満席の場合は、キャンセル待ち（順番待ち）としてご案内しております。
              </span>
              <span className="block">
                状況は随時変わります。最終のご確認はお電話またはお問合せフォームにてお願いいたします。
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${SCHOOL.phone}`}
                className="inline-flex items-center justify-center rounded-full bg-[#1C4A52] text-white px-5 py-2.5 text-sm font-bold shadow-cta hover:bg-[#2A5F6A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
              >
                {SCHOOL.phone} に電話
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#45B1C7] text-[#1C4A52] px-5 py-2.5 text-sm font-bold hover:bg-[#E8F7FA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
              >
                お問合せ
              </Link>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.1}>
            <span className="inline-block text-xs font-bold text-[#45B1C7] tracking-wider uppercase mb-2">
              プログラミングコース
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C4A52] leading-tight mb-4">
              コードアドベンチャー 八尾校
            </h2>
            {/* 画像小さめ：列は約 9.75rem / lg 10.5rem、本文が主役に寄る */}
            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,9.75rem)_1fr] lg:grid-cols-[minmax(0,10.5rem)_1fr] gap-6 md:gap-7 lg:gap-9 items-start">
              <div className="relative mx-auto aspect-square w-full max-w-[9rem] overflow-hidden rounded-full md:mx-0 md:max-w-none md:w-full lg:max-w-[10.5rem]">
                <Image
                  src="/images/minecraft-agent-kun.png"
                  alt="マインクラフト教育版のエージェント（プログラミング教材のキャラクター）"
                  fill
                  className="object-contain object-center"
                  sizes="(max-width: 768px) 144px, 168px"
                  unoptimized
                />
              </div>
              <div className="min-w-0 space-y-4 text-center md:text-left">
                <p className="text-gray-600 text-[0.9375rem] md:text-base leading-[1.75]">
                  マインクラフトを教材にしたプログラミングコースです。授業では
                  <strong className="font-bold text-[#1C4A52]">エージェント</strong>
                  をプログラムで動かしながら学びます。永田塾代表が指導にあたります。
                </p>
                <ul className="text-[0.9375rem] md:text-base text-gray-600 space-y-2.5 list-disc pl-5 text-left marker:text-[#45B1C7] leading-[1.75] max-w-md mx-auto md:mx-0 md:max-w-none">
                  <li className="pl-0.5">小・中学生向け（ご相談により前後も可）</li>
                  <li className="pl-0.5">ビジュアルからコードへ段階的に学べます</li>
                </ul>
                <div className="flex justify-center pt-1 md:justify-start">
                  <a
                    href={CODE_ADVENTURE_YAO_LP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#45B1C7] font-bold text-[0.9375rem] md:text-base hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2 rounded"
                  >
                    詳細・無料体験のご案内（特設ページ）
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
