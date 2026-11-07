import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '言語化アプリ',
  description: '永田塾の言語化トレーニングアプリ（塾内生徒用）',
  robots: { index: false, follow: false },
};

export default function GengokaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
