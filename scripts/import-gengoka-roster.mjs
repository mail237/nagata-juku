#!/usr/bin/env node
/**
 * 個別授業名簿 xlsx → lib/gengoka/roster.ts
 * 使い方: node scripts/import-gengoka-roster.mjs [xlsxパス]
 */
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultPath =
  '/Users/tomohiro/Library/CloudStorage/GoogleDrive-mail@nagata-juku.net/マイドライブ/個別授業_名簿まとめ_v4.xlsx';
const xlsxPath = process.argv[2] ?? defaultPath;

const py = `
import openpyxl, re, json, sys
path = sys.argv[1]
wb = openpyxl.load_workbook(path, data_only=True)
ws = wb['名簿_生徒別']
GRADE_MAP = {
    '小２': '小学2年', '小３': '小学3年', '小４': '小学4年', '小５': '小学5年', '小６': '小学6年',
    '中１': '中学1年', '中２': '中学2年', '中３': '中学3年',
    '高１': '高校1年', '高２': '高校2年', '高３': '高校3年',
}
students = []
idx = 1
for r in range(2, ws.max_row + 1):
    name = ws.cell(r, 1).value
    grade_raw = ws.cell(r, 2).value
    slots = [ws.cell(r, c).value for c in range(3, 9)]
    has_other = False
    for s in slots:
        if not s:
            continue
        s = str(s)
        if 'プログラミング' in s:
            rest = re.sub(r'プログラミング\\s*\\d{1,2}:\\d{2}-\\d{1,2}:\\d{2}', '', s).strip(' ・')
            if rest:
                has_other = True
        else:
            has_other = True
    if not any(slots) or not has_other:
        continue
    students.append({'id': f'roster-{idx:03d}', 'name': name, 'grade': GRADE_MAP[grade_raw]})
    idx += 1
print(json.dumps(students, ensure_ascii=False))
`;

const json = execSync(`python3 -c ${JSON.stringify(py)} ${JSON.stringify(xlsxPath)}`, {
  encoding: 'utf8',
});
const students = JSON.parse(json.trim());

const lines = students.map(
  (s) => `  { id: '${s.id}', name: '${s.name}', grade: '${s.grade}' },`,
);

const out = `/**
 * 個別授業_名簿まとめ_v4 より自動生成（プログラミングのみの生徒は除外）
 * 再生成: node scripts/import-gengoka-roster.mjs
 */
export type RosterEntry = {
  id: string;
  name: string;
  grade: string;
};

export const ROSTER: RosterEntry[] = [
${lines.join('\n')}
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
  return ROSTER.filter((s) => s.grade === g);
}

export function getRosterStudent(id: string): RosterEntry | undefined {
  return ROSTER.find((s) => s.id === id);
}
`;

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
writeFileSync(join(root, 'lib/gengoka/roster.ts'), out);
console.log(`Wrote ${students.length} students to lib/gengoka/roster.ts`);
