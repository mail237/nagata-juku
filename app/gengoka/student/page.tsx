'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import GengokaShell from '@/components/gengoka/GengokaShell';
import { GRADES, getRosterByGrade } from '@/lib/gengoka/roster';
import type { RosterEntry } from '@/lib/gengoka/roster';
import { getStoredLogin, saveLogin } from '@/lib/gengoka/student-id';
import { getStudent, saveStudent } from '@/lib/gengoka/store';

export default function StudentLoginPage() {
  const router = useRouter();
  const [grade, setGrade] = useState('');
  const [selected, setSelected] = useState<RosterEntry | null>(null);
  const [confirmName, setConfirmName] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const names = useMemo(
    () => (grade ? getRosterByGrade(grade) : []),
    [grade],
  );

  useEffect(() => {
    const stored = getStoredLogin();
    if (stored) {
      setGrade(stored.grade);
      const match = getRosterByGrade(stored.grade).find(
        (s) => s.id === stored.rosterId || s.name === stored.nickname,
      );
      if (match) setSelected(match);
    }
  }, []);

  async function proceed() {
    if (!selected || loading) return;

    setLoading(true);
    setError('');

    try {
      saveLogin(selected.grade, selected.name, selected.id);

      const existing = await getStudent(selected.id);
      await saveStudent({
        id: selected.id,
        grade: selected.grade,
        nickname: selected.name,
        stars: existing?.stars ?? 0,
        updatedAt: Date.now(),
      });

      router.push('/gengoka/student/session');
    } catch {
      setError('うまくいきませんでした。もう一度お試しください');
      setConfirmName(false);
    } finally {
      setLoading(false);
    }
  }

  function handleNameTap(student: RosterEntry) {
    if (loading) return;
    if (selected?.id !== student.id) {
      setSelected(student);
      setConfirmName(false);
      return;
    }
    if (!confirmName) {
      setConfirmName(true);
      return;
    }
    void proceed();
  }

  return (
    <GengokaShell title="はじめる" subtitle="学年と名前を選んでね">
      <div className="space-y-6">
        <section>
          <h2 className="mb-3 text-sm font-bold text-dark">学年</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {GRADES.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => {
                  setGrade(g);
                  setSelected(null);
                  setConfirmName(false);
                }}
                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                  grade === g
                    ? 'border-primary bg-primary/10 text-primary-dark'
                    : 'border-gray-custom-200 bg-white text-gray-custom-700 hover:border-primary/30'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </section>

        {grade ? (
          <section>
            <h2 className="mb-3 text-sm font-bold text-dark">名前</h2>
            <div className="grid grid-cols-2 gap-2">
              {names.map((student) => {
                const isSelected = selected?.id === student.id;
                return (
                  <button
                    key={student.id}
                    type="button"
                    disabled={loading}
                    onClick={() => handleNameTap(student)}
                    className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                      isSelected
                        ? confirmName
                          ? 'border-primary bg-primary text-white shadow-cta'
                          : 'border-primary bg-primary/10 text-primary-dark'
                        : 'border-gray-custom-200 bg-white text-gray-custom-700 hover:border-primary/30'
                    }`}
                  >
                    {student.name}
                    {isSelected && confirmName ? (
                      <span className="mt-1 block text-[11px] font-normal opacity-90">
                        もう一度タップで始める
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            {selected && !confirmName ? (
              <p className="mt-3 text-center text-xs text-gray-custom-500">
                「{selected.name}」でもう一度タップ
              </p>
            ) : null}
          </section>
        ) : null}

        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
        ) : null}

        {loading ? (
          <p className="text-center text-sm text-gray-custom-500">読み込み中…</p>
        ) : null}
      </div>
    </GengokaShell>
  );
}
