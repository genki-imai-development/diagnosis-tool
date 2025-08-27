import React from 'react';

interface DiagnosisStartProps {
  onStart: () => void;
}

export const DiagnosisStart: React.FC<DiagnosisStartProps> = ({
  onStart,
}) => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* メインビジュアル */}
      <div className="mb-8">
        <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <svg
            className="w-16 h-16 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          あなたの性格を診断します
        </h2>
        
        <p className="text-lg text-gray-600 mb-8">
          いくつかの質問にお答えいただくことで、あなたの性格傾向を分析します。<br />
          基本質問の後に、人生で大切にしたい項目の選択と詳細な質問があります。<br />
          所要時間は約10-15分です。
        </p>
      </div>

      {/* 診断について */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-left">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">診断について</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>複数の質問に自由記述でお答えください</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>AIが回答を分析し、性格傾向を診断します</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>詳細な分析結果をご提供します</span>
          </li>
        </ul>
      </div>

      {/* 注意事項 */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-left">
        <h4 className="font-medium text-yellow-800 mb-2">ご注意</h4>
        <p className="text-sm text-yellow-700">
          この診断は娯楽目的です。医学的な診断や治療の参考にはなさらないでください。
          また、不適切な内容の投稿はお控えください。
        </p>
      </div>

      {/* 開始ボタン */}
      <button
        onClick={onStart}
        className="px-12 py-4 text-lg font-semibold rounded-lg transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl text-white transform hover:scale-105"
      >
        診断を開始する
      </button>
    </div>
  );
};