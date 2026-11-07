/**
 * 個別授業_名簿まとめ_v4 より自動生成（プログラミングのみの生徒は除外）
 * 再生成: node scripts/import-gengoka-roster.mjs
 */
export type RosterEntry = {
  id: string;
  name: string;
  grade: string;
};

export const ROSTER: RosterEntry[] = [
  { id: 'roster-001', name: '中垣心結', grade: '中学1年' },
  { id: 'roster-002', name: '井上丈', grade: '中学1年' },
  { id: 'roster-003', name: '和田美倖', grade: '中学1年' },
  { id: 'roster-004', name: '大崎薫', grade: '中学1年' },
  { id: 'roster-005', name: '川辺詩月', grade: '中学1年' },
  { id: 'roster-006', name: '片尾心音', grade: '中学1年' },
  { id: 'roster-007', name: '畑中結弦', grade: '中学1年' },
  { id: 'roster-008', name: '石川栄人', grade: '中学1年' },
  { id: 'roster-009', name: '筒井結唯', grade: '中学1年' },
  { id: 'roster-010', name: '高木佳希', grade: '中学1年' },
  { id: 'roster-011', name: '上西佑奈', grade: '中学2年' },
  { id: 'roster-012', name: '北市渉', grade: '中学2年' },
  { id: 'roster-013', name: '吉田尚仁', grade: '中学2年' },
  { id: 'roster-014', name: '川内慎司', grade: '中学2年' },
  { id: 'roster-015', name: '川村龍', grade: '中学2年' },
  { id: 'roster-016', name: '戸田イゴル', grade: '中学2年' },
  { id: 'roster-017', name: '植盛倖多', grade: '中学2年' },
  { id: 'roster-018', name: '横山将吾', grade: '中学2年' },
  { id: 'roster-019', name: '清水悠富', grade: '中学2年' },
  { id: 'roster-020', name: '篠崎晴輝', grade: '中学2年' },
  { id: 'roster-021', name: '葛井優太', grade: '中学2年' },
  { id: 'roster-022', name: '中西奏羽', grade: '中学3年' },
  { id: 'roster-023', name: '伊藤かほ', grade: '中学3年' },
  { id: 'roster-024', name: '古園井千晶', grade: '中学3年' },
  { id: 'roster-025', name: '大塚五十楽', grade: '中学3年' },
  { id: 'roster-026', name: '岡彩乃', grade: '中学3年' },
  { id: 'roster-027', name: '岡田命絆', grade: '中学3年' },
  { id: 'roster-028', name: '林田朝香', grade: '中学3年' },
  { id: 'roster-029', name: '酒井紫えん', grade: '中学3年' },
  { id: 'roster-030', name: '野田柚花', grade: '中学3年' },
  { id: 'roster-031', name: '佐野楓真', grade: '小学3年' },
  { id: 'roster-032', name: '松倉かほ', grade: '小学3年' },
  { id: 'roster-033', name: '石司塁叶', grade: '小学3年' },
  { id: 'roster-034', name: '鹿子希歩', grade: '小学3年' },
  { id: 'roster-035', name: '古庄統', grade: '小学4年' },
  { id: 'roster-036', name: '浅野誠太', grade: '小学4年' },
  { id: 'roster-037', name: '大辻倫太郎', grade: '小学5年' },
  { id: 'roster-038', name: '本山大雅', grade: '小学5年' },
  { id: 'roster-039', name: '畑中八重乃', grade: '小学5年' },
  { id: 'roster-040', name: '重本悠月', grade: '小学5年' },
  { id: 'roster-041', name: '佐野楓一', grade: '小学6年' },
  { id: 'roster-042', name: '大塚朔', grade: '小学6年' },
  { id: 'roster-043', name: '小川桐摩', grade: '小学6年' },
  { id: 'roster-044', name: '小松英太', grade: '小学6年' },
  { id: 'roster-045', name: '羽山央聖', grade: '小学6年' },
  { id: 'roster-046', name: '西岡栞里', grade: '小学6年' },
  { id: 'roster-047', name: '文平克乃新', grade: '高校1年' },
  { id: 'roster-048', name: '伊藤希歩', grade: '高校2年' },
  { id: 'roster-049', name: '杉本理仁', grade: '高校3年' },
];

const GRADE_ORDER = [
  '小学3年',
  '小学4年',
  '小学5年',
  '小学6年',
  '中学1年',
  '中学2年',
  '中学3年',
  '高校1年',
  '高校2年',
  '高校3年',
] as const;

export type Grade = (typeof GRADE_ORDER)[number];

export const GRADES: Grade[] = GRADE_ORDER.filter((g) =>
  ROSTER.some((s) => s.grade === g),
);

export function getRosterByGrade(grade: string): RosterEntry[] {
  return ROSTER.filter((s) => s.grade === grade);
}

export function getRosterStudent(id: string): RosterEntry | undefined {
  return ROSTER.find((s) => s.id === id);
}
