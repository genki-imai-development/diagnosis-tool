import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '性格診断ツール | AI による詳細な性格分析',
  description: 'AIを活用した高精度な性格診断ツール。自由記述の回答から、あなたの性格傾向を詳しく分析します。',
  keywords: '性格診断, AI診断, 心理テスト, 性格分析, 自己理解',
  authors: [{ name: '性格診断ツール開発チーム' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: '性格診断ツール | AI による詳細な性格分析',
    description: 'AIを活用した高精度な性格診断ツール。自由記述の回答から、あなたの性格傾向を詳しく分析します。',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: '性格診断ツール | AI による詳細な性格分析',
    description: 'AIを活用した高精度な性格診断ツール。自由記述の回答から、あなたの性格傾向を詳しく分析します。',
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
