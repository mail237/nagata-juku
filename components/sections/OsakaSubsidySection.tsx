import Link from 'next/link';
import FadeInSection from '@/components/ui/FadeInSection';
import { OSAKA_SUBSIDY } from '@/lib/constants';

type Props = {
  compact?: boolean;
};

/** 大阪市習い事・塾代助成事業（当教室で利用可） */
export default function OsakaSubsidySection({ compact }: Props) {
  const py = compact ? 'py-10 md:py-12' : 'py-12 md:py-16';

  return (
    <section className={`${py} bg-white border-y border-[#C7E5EB]/40`} aria-labelledby="osaka-subsidy-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInSection>
          <div className="rounded-2xl border border-[#C7E5EB]/70 bg-gradient-to-br from-[#FFFBF0] via-white to-[#F2F9FA] p-6 md:p-8 shadow-[0_4px_24px_rgba(28,74,82,0.06)]">
            <div className="flex flex-col md:flex-row gap-7 md:gap-10 items-center md:items-start">
              <figure className="shrink-0 w-full max-w-[220px] sm:max-w-[260px] md:max-w-[280px] mx-auto md:mx-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={OSAKA_SUBSIDY.badgeSrc}
                  alt={`${OSAKA_SUBSIDY.programName}。当教室でご利用になれます`}
                  width={OSAKA_SUBSIDY.badgeWidth}
                  height={OSAKA_SUBSIDY.badgeHeight}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full rounded-xl shadow-sm ring-1 ring-[#1C4A52]/[0.08]"
                />
              </figure>

              <div className="min-w-0 flex-1 text-center md:text-left">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#45B1C7] uppercase mb-2">
                  <span className="w-5 h-px bg-[#45B1C7]" />
                  お知らせ
                </span>
                <h2
                  id="osaka-subsidy-heading"
                  className="font-serif text-xl md:text-2xl font-black text-[#1C4A52] leading-snug mb-3"
                >
                  {OSAKA_SUBSIDY.programName}
                  <span className="block text-base md:text-lg font-bold text-[#2D8FA4] mt-1">
                    当教室でご利用いただけます
                  </span>
                </h2>
                <div className="space-y-3 text-sm text-[#393939] leading-relaxed mb-5">
                  <p>
                    永田塾は、大阪市の<strong className="font-bold text-[#1C4A52]">習い事・塾代助成事業</strong>
                    に参画事業者として登録されました。お子さまの通塾費の一部を、制度の範囲内で助成いただけます。
                  </p>
                  <ul className="text-left space-y-1.5 list-disc pl-5 marker:text-[#45B1C7] max-w-xl mx-auto md:mx-0">
                    <li>対象：大阪市内在住の小学5年生～中学3年生を養育するご家庭</li>
                    <li>助成額：月額上限1万円（制度の詳細は大阪市の案内に準じます）</li>
                    <li>ご利用には、事前の利用登録申請が必要です</li>
                  </ul>
                  <p className="text-xs text-[#777777]">
                    ※ 八尾市在住の方は対象外です。手続き・対象学年・利用方法は変更となる場合があります。
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href={OSAKA_SUBSIDY.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#1C4A52] text-white px-5 py-2.5 text-sm font-bold hover:bg-[#358FA3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
                  >
                    利用登録・詳細（公式サイト）
                  </a>
                  <a
                    href={OSAKA_SUBSIDY.cityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border-2 border-[#45B1C7] text-[#1C4A52] px-5 py-2.5 text-sm font-bold hover:bg-[#E8F7FA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
                  >
                    大阪市の制度説明
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-[#C7E5EB] text-[#1C4A52] px-5 py-2.5 text-sm font-bold hover:bg-[#F2F9FA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#45B1C7] focus-visible:ring-offset-2"
                  >
                    永田塾へお問合せ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
