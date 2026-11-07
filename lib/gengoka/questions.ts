import type { GengokaQuestion } from './types';

/** 永田塾・言語化アプリ用オリジナル問題（著作権フリー） */
export const GENGOKA_QUESTIONS: GengokaQuestion[] = [
  {
    id: '2026-w24-mon',
    genre: '物語',
    weekLabel: '第1問（物語・場面描写）',
    paragraphs: [
      '窓の外で雨が降り始めた。',
      'さっきまで外で遊んでいた子どもたちが、一人、また一人と家に帰っていった。',
      '公園にあったボールだけが、濡れたまま残されていた。',
    ],
    prompt: 'この場面の様子として一番合っているのはどれ？',
    choices: {
      A: 'にぎやかで楽しい公園の朝',
      B: '雨でみんなが帰ったあとの静かな公園',
      C: '子どもたちがボールをなくして困っている場面',
      D: '嵐が来る前の危険な公園',
    },
    correctAnswer: 'B',
    answerRationale:
      '「一人、また一人と帰っていった」「ボールだけが残された」という描写から、人がいなくなった静けさが読み取れる。',
  },
  {
    id: '2026-w24-wed',
    genre: '心情',
    weekLabel: '第2問（人物の心情）',
    paragraphs: [
      'テストが返ってきた。',
      '隣の田村くんが「やった、100点や」と叫んだ。',
      'みんなが田村くんのまわりに集まった。',
      'ゆいはそっと自分の答案用紙を裏返した。',
    ],
    prompt: 'このときゆいはどんな気持ちだったと思う？',
    choices: {
      A: '田村くんをうらやましいと思っている',
      B: '田村くんのことが嫌いで腹が立っている',
      C: '自分の点数を見られたくない',
      D: 'テストに興味がなくてつまらない',
    },
    correctAnswer: 'C',
    answerRationale:
      '「そっと裏返した」という行動が、自分の点数を隠したい気持ちを表している。',
  },
  {
    id: '2026-w24-fri',
    genre: '日常',
    weekLabel: '第3問（日常の出来事）',
    paragraphs: [
      'お父さんは毎朝、新聞を読みながらコーヒーを飲む。',
      'でも今日は新聞を開いたまま、ずっとぼんやりしていた。',
      'コーヒーはすっかり冷めていた。',
    ],
    prompt: '今日のお父さんの様子として一番合っているのはどれ？',
    choices: {
      A: '新聞を読むのに夢中になっている',
      B: '何か別のことを考えていて上の空',
      C: 'コーヒーが嫌いで飲みたくない',
      D: '朝から体の調子が悪い',
    },
    correctAnswer: 'B',
    answerRationale:
      '「ぼんやりしていた」「コーヒーが冷めていた」という描写から、いつもと違う状態で別のことを考えていたと読み取れる。',
  },
];

export function getQuestionById(id: string): GengokaQuestion | undefined {
  return GENGOKA_QUESTIONS.find((q) => q.id === id);
}

export const DEFAULT_QUESTION_ID = GENGOKA_QUESTIONS[0].id;

/** 月・水・金の3問を曜日で自動切り替え（火→月、木→水、土日→金） */
export function getTodaysQuestionId(now = new Date()): string {
  const [mon, wed, fri] = GENGOKA_QUESTIONS.map((q) => q.id);
  switch (now.getDay()) {
    case 1:
      return mon;
    case 3:
      return wed;
    case 5:
      return fri;
    case 2:
      return mon;
    case 4:
      return wed;
    default:
      return fri;
  }
}
