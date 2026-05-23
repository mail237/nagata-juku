'use client';

import { useEffect, useState } from 'react';
import { DAILY_TIPS } from '@/lib/homePlayful';

const STORAGE_KEY = 'nagata-juku-daily-tip-dismissed';

/** 初回訪問時だけ、右下にひとことメモを表示（スマホでは非表示・LINEボタンと重ならないように） */
export default function DailyTipBubble() {
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState<(typeof DAILY_TIPS)[number]>(DAILY_TIPS[0]);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const desktop = window.matchMedia('(min-width: 640px)');
    if (!desktop.matches) return;

    const index = Math.floor(Math.random() * DAILY_TIPS.length);
    setTip(DAILY_TIPS[index]);

    const timer = window.setTimeout(() => setVisible(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-5 right-4 left-4 z-[60] hidden max-w-xs animate-pop-in motion-reduce:animate-none sm:left-auto sm:bottom-44 sm:block"
    >
      <div className="rounded-2xl border border-[#C7E5EB] bg-white/95 backdrop-blur-sm shadow-[0_12px_40px_rgba(28,74,82,0.12)] px-4 py-3.5 pr-10">
        <p className="text-[10px] font-bold tracking-widest text-[#45B1C7] uppercase mb-1.5">
          💡 きょうのひとこと
        </p>
        <p className="text-xs text-[#393939] leading-relaxed">{tip}</p>
        <button
          type="button"
          onClick={dismiss}
          className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full text-[#777777] hover:bg-[#F2F9FA] hover:text-[#1C4A52] transition-colors text-sm leading-none"
          aria-label="閉じる"
        >
          ×
        </button>
      </div>
    </div>
  );
}
