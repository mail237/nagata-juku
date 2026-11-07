export type Choice = 'A' | 'B' | 'C' | 'D';

export type SessionPhase =
  | 'voting'
  | 'revealed'
  | 'writing'
  | 'mvp'
  | 'done';

export type GengokaQuestion = {
  id: string;
  genre: '物語' | '心情' | '日常' | '哲学的';
  weekLabel: string;
  paragraphs: string[];
  prompt: string;
  choices: Record<Choice, string>;
  correctAnswer: Choice;
  /** 先生・インスタ用の正解の理由（本文根拠） */
  answerRationale: string;
};

export type StudentProfile = {
  id: string;
  grade: string;
  nickname: string;
  stars: number;
  updatedAt: number;
};

export type SessionResponse = {
  studentId: string;
  grade: string;
  nickname: string;
  choice: Choice | null;
  reasonPart1: string;
  reasonPart2: string;
  votedAt: number | null;
  reasonSubmittedAt: number | null;
};

export type GengokaSession = {
  code: string;
  questionId: string;
  phase: SessionPhase;
  distributionRevealedAt: number | null;
  mvpStudentId: string | null;
  createdAt: number;
  responses: Record<string, SessionResponse>;
};
