'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import GengokaShell from '@/components/gengoka/GengokaShell';
import QuestionCard from '@/components/gengoka/QuestionCard';
import ChoiceButtons from '@/components/gengoka/ChoiceButtons';
import DistributionChart from '@/components/gengoka/DistributionChart';
import ReasonForm from '@/components/gengoka/ReasonForm';
import { APP_BADGE } from '@/lib/gengoka/constants';
import { getQuestionById } from '@/lib/gengoka/questions';
import { getStoredLogin, getStudentId } from '@/lib/gengoka/student-id';
import { getStarTitle } from '@/lib/gengoka/titles';
import type { Choice, GengokaSession } from '@/lib/gengoka/types';
import {
  CLASSROOM_CODE,
  countChoices,
  ensureClassroomSession,
  getStudent,
  joinSession,
  subscribeSession,
  submitReason,
  submitVote,
} from '@/lib/gengoka/store';

export default function StudentPlayPage() {
  const router = useRouter();
  const [studentId, setStudentId] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = getStudentId();
    const login = getStoredLogin();
    if (!id || !login?.rosterId) {
      router.replace('/gengoka/student');
      return;
    }
    setStudentId(id);
  }, [router]);

  const [session, setSession] = useState<GengokaSession | null>(null);
  const [stars, setStars] = useState(0);
  const [pendingChoice, setPendingChoice] = useState<Choice | null>(null);
  const [confirmVote, setConfirmVote] = useState(false);
  const [voteError, setVoteError] = useState('');

  const question = useMemo(
    () => (session ? getQuestionById(session.questionId) : undefined),
    [session],
  );

  const myResponse = studentId ? session?.responses[studentId] ?? null : null;

  useEffect(() => {
    let unsubscribe = () => {};
    void ensureClassroomSession().then((initial) => {
      setSession(initial);
      setReady(true);
      unsubscribe = subscribeSession(CLASSROOM_CODE, setSession);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!ready || !studentId) return;
    if (session?.responses[studentId]) return;
    const login = getStoredLogin();
    if (!login?.rosterId) return;
    void joinSession(CLASSROOM_CODE, studentId, login.grade, login.nickname);
  }, [ready, studentId, session]);

  useEffect(() => {
    if (!studentId) return;
    getStudent(studentId).then((profile) => {
      if (profile) setStars(profile.stars);
    });
  }, [studentId]);

  async function handleVote() {
    if (!studentId || !pendingChoice || !confirmVote) return;
    setVoteError('');
    const updated = await submitVote(CLASSROOM_CODE, studentId, pendingChoice);
    if (!updated) {
      setVoteError('送信できませんでした。すでに回答済みかもしれません');
    }
  }

  if (!session || !question) {
    return (
      <GengokaShell title="読み込み中…" badge={APP_BADGE} backHref="/gengoka/student">
        <p className="text-sm text-gray-custom-500">今日の問いを準備しています…</p>
      </GengokaShell>
    );
  }

  const distributionVisible = Boolean(session.distributionRevealedAt);
  const counts = countChoices(session.responses);
  const title = getStarTitle(stars);

  return (
    <GengokaShell
      title={myResponse?.nickname ?? '生徒'}
      subtitle={`${myResponse?.grade ?? ''} · ★${stars} ${title}`}
      badge={APP_BADGE}
      backHref="/gengoka/student"
    >
      <div className="space-y-5">
        <QuestionCard question={question} />

        {session.phase === 'voting' && !myResponse?.choice ? (
          <section>
            <h2 className="mb-3 text-sm font-bold text-dark">予想を選ぶ</h2>
            <ChoiceButtons
              question={question}
              selected={pendingChoice}
              onSelect={(choice) => {
                setPendingChoice(choice);
                setConfirmVote(false);
              }}
            />
            {pendingChoice && !confirmVote ? (
              <button
                type="button"
                onClick={() => setConfirmVote(true)}
                className="mt-4 w-full rounded-2xl border-2 border-dashed border-primary/50 py-4 text-sm font-bold text-primary-dark"
              >
                {pendingChoice} を選ぶ（もう一度タップで送信）
              </button>
            ) : null}
            {pendingChoice && confirmVote ? (
              <button
                type="button"
                onClick={handleVote}
                className="mt-4 w-full rounded-2xl bg-primary py-4 text-sm font-bold text-white shadow-cta"
              >
                {pendingChoice} で送信する
              </button>
            ) : null}
            {voteError ? (
              <p className="mt-3 text-sm text-red-600">{voteError}</p>
            ) : null}
            <p className="mt-2 text-center text-[11px] text-gray-custom-500">
              送信したら変更できません
            </p>
          </section>
        ) : null}

        {session.phase === 'voting' && myResponse?.choice ? (
          <div className="rounded-2xl border border-primary/30 bg-primary/5 px-4 py-5 text-center">
            <p className="text-sm font-bold text-primary-dark">
              {myResponse.choice} を送信しました
            </p>
            <p className="mt-2 text-xs text-gray-custom-500">
              みんなが終わると、分布が自動で出ます
            </p>
          </div>
        ) : null}

        {distributionVisible ? (
          <DistributionChart counts={counts} myChoice={myResponse?.choice} />
        ) : null}

        {session.phase === 'writing' && myResponse?.choice && !myResponse.reasonSubmittedAt ? (
          <ReasonForm
            onSubmit={async (part1, part2) => {
              await submitReason(CLASSROOM_CODE, studentId, part1, part2);
            }}
          />
        ) : null}

        {myResponse?.reasonSubmittedAt ? (
          <section className="space-y-4">
            <div className="rounded-2xl border border-gray-custom-200 bg-white p-5 shadow-card">
              <p className="text-center text-sm font-bold text-dark">おつかれさま！</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-custom-700">
                「{myResponse.reasonPart1}」と書いてあったから、「{myResponse.reasonPart2}」だと思った
              </p>
              <p className="mt-4 border-t border-gray-custom-200 pt-4 text-xs leading-relaxed text-gray-custom-500">
                正解は {question.correctAnswer}。{question.answerRationale}
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push('/gengoka/student')}
              className="w-full rounded-2xl bg-dark py-4 text-sm font-bold text-white transition hover:bg-[#163a40] active:scale-[0.99]"
            >
              終了
            </button>
          </section>
        ) : null}
      </div>
    </GengokaShell>
  );
}
