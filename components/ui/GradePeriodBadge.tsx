type Props = {
  /** 例: 小6〜中3 */
  range: string;
  /** 例: 4年間（括弧なし） */
  duration: string;
  className?: string;
};

/**
 * 学年バッジ（iOS Safari で「小6〜中3」が途中改行されないよう1行表示）
 */
export default function GradePeriodBadge({ range, duration, className = '' }: Props) {
  return (
    <span
      className={`inline-table whitespace-nowrap text-xs font-bold text-[#393939] bg-[#E0F2F4] px-2.5 py-1.5 rounded-md [line-break:normal] [word-break:keep-all] ${className}`}
      style={{ whiteSpace: 'nowrap' }}
    >
      {range}
      <span className="font-medium">（{duration}）</span>
    </span>
  );
}
