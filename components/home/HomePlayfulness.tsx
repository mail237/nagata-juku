'use client';

import DailyTipBubble from '@/components/home/DailyTipBubble';
import NodokaWidget from '@/components/home/NodokaWidget';

/** トップページ専用の遊び心レイヤー */
export default function HomePlayfulness() {
  return (
    <>
      <DailyTipBubble />
      <NodokaWidget />
    </>
  );
}
