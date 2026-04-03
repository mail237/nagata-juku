'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

/** スクロール演出は framer-motion を使わない（環境によって本文が消えるのを防ぐ） */
export default function FadeInSection({ children, className = '' }: Props) {
  return <div className={className}>{children}</div>;
}
