import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '自分を変える方法|自分が嫌いな人のための5分無料診断ツール - ライフコーチAI',
  description: 'あなたの強みと才能を明確にし、理想の未来へと導くパーソナル診断ツール',
  keywords: '性格特性診断, Big5, AI診断, 自己理解, キャリア診断',
  authors: [{ name: 'LIFE UP by YUKI IMAI' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: '自分を変える方法|自分が嫌いな人のための5分無料診断ツール - ライフコーチAI',
    description: 'あなたの強みと才能を明確にし、理想の未来へと導くパーソナル診断ツール',
    type: 'website',
    locale: 'ja_JP',
    url: '/lp',
    siteName: 'ライフコーチAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: '自分を変える方法|自分が嫌いな人のための5分無料診断ツール - ライフコーチAI',
    description: 'あなたの強みと才能を明確にし、理想の未来へと導くパーソナル診断ツール',
  },
  alternates: {
    canonical: '/lp',
  },
};

export default function LPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 