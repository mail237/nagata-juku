'use client';

import Link from 'next/link';
import Image from 'next/image';
import FadeInSection from '@/components/ui/FadeInSection';
import { SCHOOL, CODE_ADVENTURE_YAO_LP, OSAKA_SUBSIDY, VACANCY_ROWS } from '@/lib/constants';
import OsakaCityRecruitLink from '@/components/ui/OsakaCityRecruitLink';

function vacancyStatusTone(status: string) {
  if (status.includes('残り') || status.includes('空席あり') || status.includes('空き')) {
    return 'available' as const;
  }
  if (status === '満席' || status === '空席なし') {
    return 'full' as const;
  }
  return 'other' as const;
}

function VacancyStatusBadge({ status }: { status: string }) {
  const tone = vacancyStatusTone(status);
  const className =
    tone === 'available'
      ? 'bg-[#E8F7FA] text-[#1C4A52] ring-1 ring-[#C7E5EB]'
      : tone === 'full'
        ? 'bg-gray-100 text-gray-600'
        : 'bg-gray-50 text-gray-700';

  return (
    <span
      className={`inline-flex min-w-[4.75rem] justify-center rounded-full px-3 py-1 text-xs font-semibold tabular-nums ${className}`}
    >
      {status}
    </span>
  );
}

type Props = {
  /** 授業・料金ページでは余白を少し詰める */
  compact?: boolean;
  /** トップページ用：空席案内と残り席表示を非表示にし、プログラミングコース案内を中央に整える */
  hideVacancy?: boolean;
};

export default function VacancyProgrammingSection({ compact, hideVacancy }: Props) {
  const py = compact ? 'py-12 md:py-16' : 'pt-10 pb-14 md:pt-12 md:pb-20';

  if (hideVacancy) {
    return (
      <section className={`${py} bg-[#FAFCFC] border-y border-[#C7E5EB]/50`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-8">
              <span className="inline-block text-xs font-bold text-[#45B1C7] tracking-wider uppercase mb-2">
                プログラミングコース
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1C4A52] leading-tight mb-4">
                コードアドベンチャー 八尾校
              </h2>
              <p className="inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-[#45B1C7]/35 bg-[#E8F7FA] px-4 py-2 text-sm font-bold text-[#1C4A52]">
                <OsakaCityRecruitLink />
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,10.5rem)_1fr] gap-6 md:gap-8 items-start mb-8">
              <div className="relative mx-auto aspect-square w-full max-w-[9rem] overflow-hidden rounded-full md:mx-0 md:max-w-none md:w-full">
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
                  マインクラフトで学ぶプログラミングコースです。
                  <strong className="font-bold text-[#1C4A52]">エージェント</strong>
                  をプログラムで動かしながら覚えます。
                </p>
                <ul className="text-[0.9375rem] md:text-base text-gray-600 space-y-2.5 list-disc pl-5 text-left marker:text-[#45B1C7] leading-[1.75] max-w-md mx-auto md:mx-0 md:max-w-none">
                  <li className="pl-0.5">小・中学生向け（ご相談により前後も可）</li>
                  <li className="pl-0.5">最初はブロックを並べるところから始めて、慣れてきたらコードを書きます</li>
                  <li className="pl-0.5">
                    大阪市在住のご家庭は、
                    <Link
                      href={`/#${OSAKA_SUBSIDY.anchorId}`}
                      className="font-bold text-[#45B1C7] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45B1C7]"
                    >
                      習い事・塾代助成事業
                    </Link>
                    の利用もご相談ください
                  </li>
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

            {/* プログラミング無料体験会 案内 */}
            <div className="rounded-2xl border border-[#C7E5EB] bg-white p-6 sm:p-8 shadow-sm text-left">
              <h3 className="text-lg md:text-xl font-bold text-[#1C4A52] mb-3">
                プログラミング無料体験会
              </h3>
              <div className="space-y-3.5 text-sm md:text-[0.9375rem] text-gray-600 leading-relaxed">
                <p>
                  マインクラフトで学ぶプログラミングコース（コードアドベンチャー 八尾校）の無料体験会です。
                </p>
                <p>
                  体験では、マインクラフトに出てくるエージェントをプログラムで動かして、ダイヤモンドをゲットします。最初はブロックを並べるところから始めるので、プログラミングが初めてでも大丈夫です。
                </p>
                <div className="rounded-xl bg-[#F2F9FA] border border-[#C7E5EB]/70 p-4 sm:p-5 space-y-2 text-xs sm:text-sm text-[#1C4A52]">
                  <p>
                    日時：12月2日（水）17:00から<br />
                    {'　　　'}12月9日（水）17:00から<br />
                    {'　　　'}12月16日（水）17:00から
                  </p>
                  <p>
                    対象：小・中学生（ご相談により前後も可）
                  </p>
                  <p>
                    お申込み：お電話かお問合せフォームからお願いします。お席に限りがありますので、お早めにお申込みください。
                  </p>
                </div>
                <div className="pt-1">
                  <p className="inline-block rounded-lg bg-[#E8F7FA] border border-[#45B1C7]/40 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-[#1C4A52]">
                    12月キャンペーン：入会金無料、1ヶ月目の月謝半額
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={`tel:${SCHOOL.phone}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#1C4A52] text-white px-5 py-2.5 text-sm font-bold shadow-cta hover:bg-[#358FA3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
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
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    );
  }

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
              <table className="w-full table-fixed text-center text-[0.9375rem]">
                <colgroup>
                  <col className="w-1/2" />
                  <col className="w-1/2" />
                </colgroup>
                <thead>
                  <tr className="bg-[#E8F7FA]/80 border-b border-[#C7E5EB]">
                    <th
                      scope="col"
                      className="px-5 py-3 font-bold text-[#1C4A52] border-r border-[#C7E5EB]"
                    >
                      対象
                    </th>
                    <th scope="col" className="px-5 py-3 font-bold text-[#1C4A52]">
                      状況
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {VACANCY_ROWS.map((row, i) => (
                    <tr
                      key={row.label}
                      className={[
                        i < VACANCY_ROWS.length - 1 ? 'border-b border-[#C7E5EB]/60' : '',
                        i % 2 === 1 ? 'bg-[#FAFCFC]/80' : 'bg-white',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <th
                        scope="row"
                        className="px-5 py-3.5 font-semibold text-[#1C4A52] align-middle border-r border-[#C7E5EB]"
                      >
                        {row.label}
                      </th>
                      <td className="px-4 sm:px-5 py-3.5 align-middle">
                        <div className="flex flex-col items-center gap-1.5">
                          <VacancyStatusBadge status={row.status} />
                          {row.note === OSAKA_SUBSIDY.recruitLinkLabel ? (
                            <OsakaCityRecruitLink className="text-[0.6875rem] sm:text-xs leading-snug" />
                          ) : row.note ? (
                            <span className="text-[0.6875rem] sm:text-xs font-bold text-[#2D8FA4] leading-snug">
                              {row.note}
                            </span>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5 space-y-2">
              <span className="block text-[#1C4A52]/90">
                満席の学年は、キャンセル待ちで受け付けています。
              </span>
              <span className="block">
                空席は変わるので、電話かフォームで聞いてください。
              </span>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${SCHOOL.phone}`}
                className="inline-flex items-center justify-center rounded-full bg-[#1C4A52] text-white px-5 py-2.5 text-sm font-bold shadow-cta hover:bg-[#358FA3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
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

          <FadeInSection delay={0.1} className="mt-12 md:mt-0">
            <span className="inline-block text-xs font-bold text-[#45B1C7] tracking-wider uppercase mb-2">
              プログラミングコース
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C4A52] leading-tight mb-3">
              コードアドベンチャー 八尾校
            </h2>
            <p className="mb-4 inline-flex flex-wrap items-center justify-center md:justify-start gap-2 rounded-xl border border-[#45B1C7]/35 bg-[#E8F7FA] px-4 py-2.5 text-sm font-bold text-[#1C4A52]">
              <span className="rounded-full bg-[#45B1C7] px-2.5 py-0.5 text-xs text-white">残り1席</span>
              <OsakaCityRecruitLink />
            </p>
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
                  マインクラフトで学ぶプログラミングコースです。
                  <strong className="font-bold text-[#1C4A52]">エージェント</strong>
                  をプログラムで動かしながら覚えます。
                </p>
                <ul className="text-[0.9375rem] md:text-base text-gray-600 space-y-2.5 list-disc pl-5 text-left marker:text-[#45B1C7] leading-[1.75] max-w-md mx-auto md:mx-0 md:max-w-none">
                  <li className="pl-0.5">小・中学生向け（ご相談により前後も可）</li>
                  <li className="pl-0.5">最初はブロックを並べるところから始めて、慣れてきたらコードを書きます</li>
                  <li className="pl-0.5">
                    大阪市在住のご家庭は、
                    <Link
                      href={`/#${OSAKA_SUBSIDY.anchorId}`}
                      className="font-bold text-[#45B1C7] underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45B1C7]"
                    >
                      習い事・塾代助成事業
                    </Link>
                    の利用もご相談ください
                  </li>
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

            <div className="mt-6 rounded-2xl border border-[#C7E5EB] bg-white p-5 sm:p-6 shadow-sm text-left">
              <h3 className="text-lg md:text-xl font-bold text-[#1C4A52] mb-3">
                プログラミング無料体験会
              </h3>
              <div className="space-y-3 text-sm md:text-[0.9375rem] text-gray-600 leading-relaxed">
                <p>
                  マインクラフトで学ぶプログラミングコース（コードアドベンチャー 八尾校）の無料体験会です。
                </p>
                <p>
                  体験では、マインクラフトに出てくるエージェントをプログラムで動かして、ダイヤモンドをゲットします。最初はブロックを並べるところから始めるので、プログラミングが初めてでも大丈夫です。
                </p>
                <div className="rounded-xl bg-[#F2F9FA] border border-[#C7E5EB]/70 p-4 space-y-1.5 text-xs sm:text-sm text-[#1C4A52]">
                  <p>
                    日時：12月2日（水）17:00から<br />
                    {'　　　'}12月9日（水）17:00から<br />
                    {'　　　'}12月16日（水）17:00から
                  </p>
                  <p>
                    対象：小・中学生（ご相談により前後も可）
                  </p>
                  <p>
                    お申込み：お電話かお問合せフォームからお願いします。お席に限りがありますので、お早めにお申込みください。
                  </p>
                </div>
                <div className="pt-1">
                  <p className="inline-block rounded-lg bg-[#E8F7FA] border border-[#45B1C7]/40 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-[#1C4A52]">
                    12月キャンペーン：入会金無料、1ヶ月目の月謝半額
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
