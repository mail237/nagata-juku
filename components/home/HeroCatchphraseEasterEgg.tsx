'use client';

import { useState } from 'react';
import { sparkleBurst } from '@/components/home/sparkleBurst';

const CLICKS_NEEDED = 4;

/** 「第一志望合格」を数回タップすると一言メッセージ */
export default function HeroCatchphraseEasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [message, setMessage] = useState<string | null>(null);

  const onTap = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (message) return;
    const next = clicks + 1;
    setClicks(next);
    if (next >= CLICKS_NEEDED) {
      setMessage('志望校、一緒に決めよう！');
      sparkleBurst(e.clientX, e.clientY);
    }
  };

  return (
    <span className="relative inline-block">
      <span
        role="button"
        tabIndex={0}
        onClick={onTap}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setClicks((c) => {
              const next = c + 1;
              if (next >= CLICKS_NEEDED) setMessage('志望校、一緒に決めよう！');
              return next;
            });
          }
        }}
        className="text-[#D93025] cursor-pointer select-none transition-transform active:scale-95 hover:animate-wiggle motion-reduce:hover:animate-none"
        aria-label="第一志望合格"
      >
        第一志望合格
      </span>
      {message && (
        <span className="absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap rounded-full bg-[#1C4A52] text-white text-[10px] font-bold px-3 py-1 animate-pop-in shadow-md motion-reduce:animate-none">
          {message}
        </span>
      )}
    </span>
  );
}
