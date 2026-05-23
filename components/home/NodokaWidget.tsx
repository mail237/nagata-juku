'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  NODOKA_MESSAGES,
  NODOKA_TALK_MS,
  NODOKA_WALK_FRAME_MS,
} from '@/lib/nodokaWidget';

const FRAMES = ['/images/nodoka/walk-0.png', '/images/nodoka/walk-1.png'] as const;

/** トップ右下に常駐するのどか（歩きアニメ・タップでセリフ） */
export default function NodokaWidget() {
  const [frameIdx, setFrameIdx] = useState(0);
  const [isTalking, setIsTalking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (isTalking || reduceMotion) return;
    const id = window.setInterval(() => {
      setFrameIdx((i) => (i + 1) % FRAMES.length);
    }, NODOKA_WALK_FRAME_MS);
    return () => window.clearInterval(id);
  }, [isTalking, reduceMotion]);

  const handleClick = useCallback(() => {
    if (isTalking) return;
    setIsTalking(true);
    setFrameIdx(0);
    setMessage(NODOKA_MESSAGES[Math.floor(Math.random() * NODOKA_MESSAGES.length)]);

    window.setTimeout(() => {
      setMessage(null);
      setIsTalking(false);
    }, NODOKA_TALK_MS);
  }, [isTalking]);

  const displaySrc = FRAMES[isTalking ? 0 : frameIdx];

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="のどかちゃん。タップすると話します"
      className="fixed z-[54] right-3 w-[7.5rem] cursor-pointer select-none border-0 bg-transparent p-0 text-center sm:right-4 sm:w-[8.125rem] bottom-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
    >
      {message ? (
        <p
          role="status"
          className="mb-2 animate-pop-in rounded-[14px] border-2 border-[#444] bg-white px-3 py-1.5 text-[13px] font-bold text-[#393939] shadow-[1px_2px_6px_rgba(0,0,0,0.15)] motion-reduce:animate-none"
        >
          {message}
        </p>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element -- ドット絵は pixelated 指定が必要 */}
      <img
        src={displaySrc}
        alt=""
        width={110}
        height={82}
        draggable={false}
        className="mx-auto block h-auto w-[6.875rem] [image-rendering:pixelated] sm:w-[6.875rem]"
      />
    </button>
  );
}
