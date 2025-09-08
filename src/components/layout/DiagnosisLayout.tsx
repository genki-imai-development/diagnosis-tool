import React from 'react';

interface DiagnosisLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const DiagnosisLayout: React.FC<DiagnosisLayoutProps> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー TODO: 不要であれば削除 */}
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-gray-600">{subtitle}</p>
          )}
        </div>
      </header> */}

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* フッター */}
      <footer className="mt-auto py-8 text-center text-gray-500 text-sm">
        <p>© 2025 性格診断ツール. All rights reserved.</p>
      </footer>
    </div>
  );
};
