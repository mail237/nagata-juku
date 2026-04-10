'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { SCHOOL } from '@/lib/constants';

type FormData = {
  name: string;
  furigana: string;
  email: string;
  phone: string;
  grade: string;
  subjects: string[];
  inquiry: string;
  message: string;
};

const gradeOptions = [
  '小学1年生',
  '小学2年生',
  '小学3年生',
  '小学4年生',
  '小学5年生',
  '小学6年生',
  '中学1年生',
  '中学2年生',
  '中学3年生',
  '高校1年生',
  '高校2年生',
  '高校3年生',
  'その他',
];

const subjectOptions = ['数学', '算数', '英語', '国語', '理科', '社会', 'プログラミング'];

const inquiryOptions = [
  '無料体験授業の申込み',
  '料金・コースについて',
  '授業内容について',
  'その他のご質問',
];

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSubmitError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
      };
      if (res.ok && payload.ok) {
        setSubmitted(true);
        return;
      }
      if (payload.code === 'EMAIL_NOT_CONFIGURED') {
        setSubmitError(
          `フォームからのメール送信は、サーバーに Resend の設定（環境変数）が必要です。公開前に設定するか、お手数ですが ${SCHOOL.email} まで直接メールを送るか、お電話（${SCHOOL.phone}）でご連絡ください。`,
        );
        return;
      }
      setSubmitError(
        '送信に失敗しました。時間をおいて再度お試しください。解消しない場合はお電話でご連絡ください。',
      );
    } catch {
      setSubmitError(
        `通信エラーが発生しました。${SCHOOL.email} までメール、またはお電話（${SCHOOL.phone}）でご連絡ください。`,
      );
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-medium text-[#1C4A52] bg-white outline-none transition-all duration-200 placeholder:text-[#C0B8B0] ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
        : 'border-[#C7E5EB] focus:border-[#45B1C7] focus:ring-2 focus:ring-[#45B1C7]/10'
    }`;

  return (
    <div className="bg-white rounded-2xl p-7 md:p-10 border border-[#E0F2F4] shadow-sm">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif font-black text-2xl text-[#1C4A52] mb-3">
              お送りいただきありがとうございます
            </h3>
            <p className="text-sm text-[#777777] leading-relaxed max-w-md mx-auto">
              お問合せを受け付けました。
              当日〜翌日中に、塾長よりご連絡いたします。
              お急ぎの場合はお電話（{SCHOOL.phone}）またはメール（{SCHOOL.email}）にてご連絡ください。
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h2 className="font-serif font-black text-2xl text-[#1C4A52] mb-7">
              お問合せフォーム
            </h2>

            {submitError ? (
              <p
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                {submitError}
              </p>
            ) : null}

            <div className="flex flex-col gap-5">
              {/* お名前 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#393939] mb-1.5">
                    お名前
                    <span className="text-[#45B1C7] ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="山田 太郎"
                    className={inputClass(!!errors.name)}
                    {...register('name', { required: 'お名前を入力してください' })}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#393939] mb-1.5">
                    ふりがな
                  </label>
                  <input
                    type="text"
                    placeholder="やまだ たろう"
                    className={inputClass(!!errors.furigana)}
                    {...register('furigana')}
                  />
                </div>
              </div>

              {/* メール・電話 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#393939] mb-1.5">
                    メールアドレス
                    <span className="text-[#45B1C7] ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    className={inputClass(!!errors.email)}
                    {...register('email', {
                      required: 'メールアドレスを入力してください',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: '正しいメールアドレスを入力してください',
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#393939] mb-1.5">
                    電話番号
                    <span className="text-[#45B1C7] ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="090-0000-0000"
                    className={inputClass(!!errors.phone)}
                    {...register('phone', {
                      required: '電話番号を入力してください',
                      pattern: {
                        value: /^[0-9\-+()\s]+$/,
                        message: '正しい電話番号を入力してください',
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              {/* 学年 ＋ 希望科目（md以上は横並び） */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 md:items-start">
                <div className="md:col-span-4 lg:col-span-3">
                  <label className="block text-xs font-bold text-[#393939] mb-1.5">
                    学年
                    <span className="text-[#45B1C7] ml-1">*</span>
                  </label>
                  <select
                    className={`${inputClass(!!errors.grade)} appearance-none`}
                    {...register('grade', { required: '学年を選択してください' })}
                    defaultValue=""
                  >
                    <option value="" disabled>学年を選択してください</option>
                    {gradeOptions.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  {errors.grade && (
                    <p className="text-xs text-red-500 mt-1">{errors.grade.message}</p>
                  )}
                </div>
                <div className="md:col-span-8 lg:col-span-9 min-w-0">
                  <label className="block text-xs font-bold text-[#393939] mb-2">
                    ご希望の科目（複数選択可）
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {subjectOptions.map((subject) => (
                      <label
                        key={subject}
                        className="flex items-center gap-2 px-4 py-2 border border-[#C7E5EB] rounded-full text-sm cursor-pointer hover:border-[#45B1C7] hover:bg-[#45B1C7]/5 transition-colors has-[:checked]:border-[#45B1C7] has-[:checked]:bg-[#45B1C7]/10 has-[:checked]:text-[#45B1C7]"
                      >
                        <input
                          type="checkbox"
                          value={subject}
                          className="sr-only"
                          {...register('subjects')}
                        />
                        <span>{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* お問合せ種別 */}
              <div>
                <label className="block text-xs font-bold text-[#393939] mb-1.5">
                  お問合せ内容
                  <span className="text-[#45B1C7] ml-1">*</span>
                </label>
                <select
                  className={`${inputClass(!!errors.inquiry)} appearance-none`}
                  {...register('inquiry', { required: 'お問合せ内容を選択してください' })}
                  defaultValue=""
                >
                  <option value="" disabled>選択してください</option>
                  {inquiryOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {errors.inquiry && (
                  <p className="text-xs text-red-500 mt-1">{errors.inquiry.message}</p>
                )}
              </div>

              {/* メッセージ */}
              <div>
                <label className="block text-xs font-bold text-[#393939] mb-1.5">
                  ご質問・ご要望など
                </label>
                <textarea
                  rows={5}
                  placeholder="ご自由にご記入ください（例：○○高校を目指しています。数学が特に苦手です。）"
                  className={`${inputClass(false)} resize-none`}
                  {...register('message')}
                />
              </div>

              {/* 送信ボタン */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#45B1C7] px-8 py-4 text-sm font-black text-white transition-all duration-300 ease-out hover:bg-[#0B6678] hover:shadow-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    送信中...
                  </>
                ) : (
                  <>
                    送信する
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-xs text-[#777777] text-center">
                ご入力いただいた個人情報は、お問合せへの返答にのみ使用し、第三者への提供は行いません。
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
