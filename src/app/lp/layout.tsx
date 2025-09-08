import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'フューチャーサイト - 特性診断・未来予想ツール',
  description: '科学的根拠に基づく性格特性分析と、AIが導く未来予想。あなたの可能性を発見し、理想の未来へと導くパーソナル診断ツール',
  keywords: '特性診断, 未来予想, AI診断, 性格分析, 自己理解, キャリア診断',
  authors: [{ name: 'フューチャーテック研究所' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'フューチャーサイト - 特性診断・未来予想ツール',
    description: '科学的根拠に基づく性格特性分析と、AIが導く未来予想。あなたの可能性を発見し、理想の未来へと導くパーソナル診断ツール',
    type: 'website',
    locale: 'ja_JP',
    url: '/lp',
    siteName: 'フューチャーサイト',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'フューチャーサイト - 特性診断・未来予想ツール',
    description: '科学的根拠に基づく性格特性分析と、AIが導く未来予想。あなたの可能性を発見し、理想の未来へと導くパーソナル診断ツール',
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