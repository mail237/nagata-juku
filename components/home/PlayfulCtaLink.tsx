'use client';

import Link from 'next/link';
import { sparkleBurst } from '@/components/home/sparkleBurst';

type Props = {
  href: string;
  className?: string;
  children: React.ReactNode;
  withSparkle?: boolean;
};

export default function PlayfulCtaLink({
  href,
  className = '',
  children,
  withSparkle = true,
}: Props) {
  return (
    <Link
      href={href}
      className={`btn-playful hover:animate-wiggle motion-reduce:hover:animate-none ${className}`}
      onClick={(e) => {
        if (withSparkle) sparkleBurst(e.clientX, e.clientY);
      }}
    >
      {children}
    </Link>
  );
}
