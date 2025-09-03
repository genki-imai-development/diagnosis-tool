import React from 'react';
import type { FuturePrediction as FuturePredictionType } from '@/types/diagnosis';
import { EXTERNAL_LINKS } from '@/lib/constants';

interface FuturePredictionProps {
  predictions: FuturePredictionType[] | null;
  loading: boolean;
  error: string | null;
  onComplete?: () => void;
  onRetry?: () => void;
}

export const FuturePrediction: React.FC<FuturePredictionProps> = ({
  predictions,
  loading,
  error,
  onComplete,
  onRetry,
}) => {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-12 text-center">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                あなたの未来を予測中...
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                価値観の詳細情報を基に、実現可能性の高い未来と理想の未来を生成しています
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
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              未来予測の生成に失敗しました
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

  if (!predictions || predictions.length === 0) {
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
              未来予測データがありません
            </h3>
          </div>
          <div className="p-8 text-center">
            <p className="text-gray-700 text-lg leading-relaxed">
              予測データの生成に問題があったようです。
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ヘッダーカード */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-4 md:p-8 mb-4 md:mb-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-4 md:mb-5">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
            現実と理想の未来のギャップ
          </h1>
          <p className="text-base font-light opacity-90 max-w-3xl mx-auto leading-relaxed">
            価値観を基に、実現可能性の高い未来と理想の未来を比較できます
          </p>
        </div>
      </div>

      {/* 予測結果 */}
      <div className="space-y-8">
        {predictions?.map((prediction, index) => (
          <div
            key={prediction.valueId}
            className="relative mb-4 md:mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <div className="p-4 md:p-8">
                {/* ヘッダー */}
                <div className="text-center mb-4 md:mb-6">
                  <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 md:mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">{index + 1}</span>
                      </div>
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {prediction.valueName}
                  </h3>
                </div>

                {/* 未来比較コンテナ */}
                <div className="grid lg:grid-cols-2 gap-4 mb-4 md:mb-8">
                  {/* 実現可能性の高い未来 */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg h-full">
                      <div className="flex items-center mb-2 md:mb-4">
                        <div className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-base md:text-xl font-bold text-gray-900">
                          実現可能性の高い未来
                        </h4>
                      </div>
                      <p className="text-gray-800 leading-relaxed">
                        {prediction.realisticPrediction}
                      </p>
                    </div>
                  </div>

                  {/* 理想の未来 */}
                  <div className="group">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 md:p-6 border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg h-full">
                      <div className="flex items-center mb-2 md:mb-4">
                        <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </div>
                        <h4 className="text-base md:text-xl font-bold text-purple-900">
                          理想の未来
                        </h4>
                      </div>
                      <p className="text-purple-800 leading-relaxed mb-4">
                        {prediction.idealPrediction}
                      </p>
                      {/* プログレスバー */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm text-purple-700 mb-2 font-medium">
                          <span>実現可能性</span>
                          <span>{prediction.idealRealizationProbability}%</span>
                        </div>
                        <div className="w-full bg-purple-100 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${
                              prediction.idealRealizationProbability >= 50 ? 'bg-green-500' :
                              prediction.idealRealizationProbability >= 30 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${prediction.idealRealizationProbability}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ワンポイントアドバイス */}
                <div className="group">
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center mb-2 md:mb-4">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h4 className="text-base md:text-xl font-bold text-emerald-900">
                        理想を実現するためのワンポイントアドバイス
                      </h4>
                    </div>
                    <p className="text-emerald-800 leading-relaxed">
                      {prediction.onePointAdvice}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* コーチング誘導エリア */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
          
          <div className="p-4 md:p-8">
            <div className="text-center mb-4 md:mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4 md:mb-6">
                <div className="bg-white rounded-full p-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 md:mb-6">
                理想の未来を実現しませんか？
              </h3>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                診断結果から見えてきた「現実と理想のギャップ」。<br />
                そのギャップを埋めるための具体的な行動計画を、<br />
                プロのコーチがあなたと一緒に作成します。
              </p>
            </div>

            {/* 特徴リスト */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
              <div className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-base md:text-xl font-bold text-green-900">個別カスタマイズ</h4>
                  </div>
                  <p className="text-green-800 leading-relaxed">あなたの診断結果に基づいた完全オーダーメイドのコーチングプラン</p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-base md:text-xl font-bold text-green-900">実践的アプローチ</h4>
                  </div>
                  <p className="text-green-800 leading-relaxed">今日から始められる具体的な行動ステップを提案</p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-base md:text-xl font-bold text-green-900">継続サポート</h4>
                  </div>
                  <p className="text-green-800 leading-relaxed">目標達成まで寄り添う長期的なサポート体制</p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-green-900">柔軟な相談</h4>
                  </div>
                  <p className="text-green-800 leading-relaxed">LINEでいつでも気軽に相談・質問が可能</p>
                </div>
              </div>
            </div>

            {/* アクションボタンエリア */}
            <div className="text-center">
              <button
                onClick={() => handleLinkClick(EXTERNAL_LINKS.LINE_OFFICIAL)}
                className="inline-flex items-center px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 mb-4 cursor-pointer"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINEで無料相談を始める
              </button>

              <p className="text-gray-500 mb-4 md:mb-6 leading-relaxed">
                ※ 初回相談は無料です。外部サイトが新しいタブで開きます
              </p>

              {/* 診断終了ボタン */}
              {onComplete && (
                <button
                  onClick={onComplete}
                  className="px-8 py-3 bg-gray-100 text-gray-600 rounded-2xl hover:bg-gray-200 transition-colors font-medium cursor-pointer"
                >
                  診断を終了して最初に戻る
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 