import React from 'react';
import { RadarChart } from '@/components/ui/RadarChart';
import type { DiagnosisResult as DiagnosisResultType } from '@/types/diagnosis';

interface DiagnosisResultProps {
  result: DiagnosisResultType | null;
  loading: boolean;
  error: string | null;
  onNext?: () => void;
  onRetry?: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  result,
  loading,
  error,
  onNext,
  onRetry,
}) => {
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-12 text-center">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
                <div className="bg-white rounded-full p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                AIが診断を実行中です...
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                あなたの回答を分析し、性格傾向を診断しています
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              エラーが発生しました
            </h3>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">{error}</p>
            <button
              onClick={onRetry}
              className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              再試行
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-6">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              診断結果がありません
            </h3>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-700 text-lg leading-relaxed">
              診断データの生成に問題があったようです。
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ヘロー結果セクション */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            診断完了！
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto">
            あなたの性格特性が明らかになりました
          </p>
        </div>
      </div>

      {/* パーソナリティタイプカード */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                <div className="bg-white rounded-full p-4">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
                    <img
                      src={result.pattern.image}
                      alt={result.pattern.name}
                      className="w-full h-full rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (nextElement) {
                          nextElement.classList.remove('hidden');
                        }
                      }}
                    />
                    <div className="hidden w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                      <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {result.pattern.name}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {result.pattern.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* レーダーチャートカード */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            性格特性のバランス
          </h3>
          <p className="text-blue-100 mt-2">あなたの5つの性格特性をレーダーチャートで可視化</p>
        </div>
        <div className="p-8">
          <div className="flex justify-center">
            <RadarChart scores={result.scores} />
          </div>
        </div>
      </div>

      {/* 特性詳細カード */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            あなたの特性分析
          </h3>
        </div>
        <div className="p-8">
          <div className="prose prose-lg max-w-none mb-8">
            <p className="text-gray-700 leading-relaxed text-lg">
              {result.characteristics}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* 適性環境 */}
            <div className="group">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-green-900">
                    活かされる環境・仕事
                  </h4>
                </div>
                <p className="text-green-800 leading-relaxed">
                  {result.suitableEnvironments}
                </p>
              </div>
            </div>

            {/* 注意環境 */}
            <div className="group">
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-amber-900">
                    注意が必要な環境・仕事
                  </h4>
                </div>
                <p className="text-amber-800 leading-relaxed">
                  {result.unsuitableEnvironments}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 次のステップボタン */}
      {onNext && (
        <div className="text-center">
          <button
            onClick={onNext}
            className="px-12 py-4 text-lg font-semibold rounded-lg transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl text-white transform hover:scale-105 cursor-pointer"
          >
            未来予測を見る
          </button>
        </div>
      )}
    </div>
  );
}; 