import type { Metadata } from 'next';
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google';
import LineFloatingButton from '@/components/LineFloatingButton';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans',
  display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-noto-serif',
  display: 'swap',
});

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
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${notoSerifJP.variable}`}
    >
      <body className="bg-white font-sans text-[#393939] antialiased">
        {children}
        <LineFloatingButton />
      </body>
    </html>
  );
}
