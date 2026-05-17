'use client';

import CustomCursor from '@/components/CustomCursor';
import DailyTipBubble from '@/components/home/DailyTipBubble';

/** トップページ専用の遊び心レイヤー */
export default function HomePlayfulness() {
  return (
    <>
      <CustomCursor />
      <DailyTipBubble />
    </>
  );
}
