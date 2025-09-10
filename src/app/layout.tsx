import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '自分を変える方法|自分が嫌いな人のための5分無料診断ツール - ライフコーチAI',
  description: 'あなたの強みと才能を明確にし、理想の未来へと導くパーソナル診断ツール',
  keywords: '性格特性診断, Big5, AI診断, 自己理解, キャリア診断',
  authors: [{ name: 'LIFE UP by YUKI IMAI' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'noindex, nofollow',
  openGraph: {
    title: '自分を変える方法|自分が嫌いな人のための5分無料診断ツール - ライフコーチAI',
    description: 'あなたの強みと才能を明確にし、理想の未来へと導くパーソナル診断ツール',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '自分を変える方法|自分が嫌いな人のための5分無料診断ツール - ライフコーチAI',
    description: 'あなたの強みと才能を明確にし、理想の未来へと導くパーソナル診断ツール',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          {children}
        </div>
        {/* 開発環境での便利機能 */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-black bg-opacity-75 text-white px-3 py-1 rounded text-xs">
              Dev Mode
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
