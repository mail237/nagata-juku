import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import LineFloatingButton from '@/components/LineFloatingButton';
import './globals.css';

/** next/font はビルド時に Google へ取りに行き、Cloudflare 上で落ちることがある */
const fontVars = {
  '--font-noto-sans': "'Noto Sans JP'",
  '--font-noto-serif': "'Noto Serif JP'",
} as CSSProperties;

export const metadata: Metadata = {
  title: {
    default: '永田塾｜大阪・八尾市の個別指導塾',
    template: '%s｜永田塾',
  },
  description:
    '本気で成績を上げるなら大阪・八尾市の個別指導塾「永田塾」。ICT×反復で基礎を確実に定着。定期テスト400点の壁は、難問ではなく基礎で越える。無料体験受付中。',
  keywords: ['個別指導塾', '八尾市', '大阪', '永田塾', '定期テスト対策', '受験対策', 'ICT', '基礎'],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    siteName: '永田塾',
    title: '永田塾｜大阪・八尾市の個別指導塾',
    description:
      '本気で成績を上げるなら大阪・八尾市の個別指導塾「永田塾」。ICT×反復で基礎を確実に定着。無料体験受付中。',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    // 新URLでキャッシュ回避（旧 /favicon.ico の Vercel 既定アイコン対策）
    icon: [
      { url: '/nagata-juku-icon.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/nagata-juku-icon.ico', sizes: 'any' },
    ],
    shortcut: '/nagata-juku-icon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" style={fontVars}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Noto+Serif+JP:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white font-sans text-[#393939] antialiased">
        {children}
        <LineFloatingButton />
      </body>
    </html>
  );
}
