'use client';

import { useCallback, useState } from 'react';
import walk0 from '../../public/images/nodoka/walk-0.png';
import walk1 from '../../public/images/nodoka/walk-1.png';
import { NODOKA_MESSAGES, NODOKA_TALK_MS } from '@/lib/nodokaWidget';

/** トップ右下に常駐するのどか（歩きアニメ・タップでセリフ） */
export default function NodokaWidget() {
  const [isTalking, setIsTalking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = useCallback(() => {
    if (isTalking) return;
    setIsTalking(true);
    setMessage(NODOKA_MESSAGES[Math.floor(Math.random() * NODOKA_MESSAGES.length)]);

    window.setTimeout(() => {
      setMessage(null);
      setIsTalking(false);
    }, NODOKA_TALK_MS);
  }, [isTalking]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="のどかちゃん。タップすると話します"
      className="fixed z-[56] right-2 max-sm:w-[4rem] cursor-pointer select-none border-0 bg-transparent p-0 text-center sm:right-4 sm:w-[8.125rem] bottom-[calc(env(safe-area-inset-bottom,0px)+0.5rem)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#45B1C7]"
    >
      {message ? (
        <p
          role="status"
          className="mb-1 max-sm:max-w-[4rem] max-sm:text-[10px] max-sm:leading-tight animate-pop-in rounded-lg border-2 border-[#444] bg-white px-2 py-0.5 font-bold text-[#393939] shadow-[1px_2px_6px_rgba(0,0,0,0.15)] motion-reduce:animate-none sm:mb-2 sm:max-w-none sm:rounded-[14px] sm:px-3 sm:py-1.5 sm:text-[13px] sm:leading-normal"
        >
          {message}
        </p>
      ) : null}
      <div className="relative mx-auto max-sm:h-[2.625rem] max-sm:w-[3.25rem] max-sm:origin-bottom sm:h-[5.125rem] sm:w-[6.875rem] [transform:translateZ(0)]">
        {/* eslint-disable-next-line @next/next/no-img-element -- ドット絵は pixelated 指定が必要 */}
        <img
          src={walk0.src}
          alt=""
          width={110}
          height={82}
          draggable={false}
          className={
            isTalking
              ? 'absolute inset-0 h-full w-full object-contain opacity-100 [image-rendering:pixelated] [-webkit-image-rendering:pixelated]'
              : 'absolute inset-0 h-full w-full object-contain animate-nodoka-walk-a [image-rendering:pixelated] [-webkit-image-rendering:pixelated] motion-reduce:opacity-100 motion-reduce:animate-none'
          }
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={walk1.src}
          alt=""
          width={110}
          height={82}
          draggable={false}
          className={
            isTalking
              ? 'absolute inset-0 h-full w-full object-contain opacity-0 [image-rendering:pixelated] [-webkit-image-rendering:pixelated]'
              : 'absolute inset-0 h-full w-full object-contain animate-nodoka-walk-b [image-rendering:pixelated] [-webkit-image-rendering:pixelated] motion-reduce:opacity-0 motion-reduce:animate-none'
          }
        />
      </div>
    </button>
  );
}
