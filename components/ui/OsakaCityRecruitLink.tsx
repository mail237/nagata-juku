import Link from 'next/link';
import { OSAKA_SUBSIDY } from '@/lib/constants';

type Props = {
  className?: string;
};

/** プログラミング募集 → 大阪市塾代助成の案内へ */
export default function OsakaCityRecruitLink({ className = '' }: Props) {
  return (
    <Link
      href={`/#${OSAKA_SUBSIDY.anchorId}`}
      className={`font-bold text-[#2D8FA4] underline-offset-2 transition-colors hover:text-[#1C4A52] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#45B1C7] ${className}`}
    >
      {OSAKA_SUBSIDY.recruitLinkLabel}
    </Link>
  );
}
