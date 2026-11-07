/** 永田塾は1クラス — 全員この固定IDで同期 */
export const CLASSROOM_CODE = 'NAGATA';
export const APP_BADGE = '言語化';

export { GRADES, type Grade } from './roster';

export const REASON_TEMPLATE = {
  part1Label: '本文のどこが手がかり？',
  part1Placeholder: '例：何も言わず、またつかみ直した',
  part2Label: 'それからどう思った？',
  part2Placeholder: '例：言いたいことがあるのに言えない気持ち',
  hint: '「＿＿＿と書いてあったから、＿＿＿だと思った」の形で書こう',
} as const;
