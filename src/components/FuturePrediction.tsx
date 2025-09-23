import React from 'react';
import type { FuturePrediction as FuturePredictionType } from '@/types/diagnosis';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { RoadmapRenderer } from '@/components/ui/RoadmapRenderer';

interface FuturePredictionProps {
  predictions: FuturePredictionType[] | null;
  loading: boolean;
  onComplete?: () => void;
}

export const FuturePrediction: React.FC<FuturePredictionProps> = ({
  predictions,
  loading,
  onComplete,
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
                AI分析中...10~20秒分程度お待ちください
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                あなたの価値観をもとに、最高の未来とロードマップを作成しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!predictions || predictions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl opacity-10 transform rotate-1"></div>
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500"></div>
            
            <div className="p-12 text-center">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
                分析結果を取得できませんでした
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                申し訳ございません。分析に失敗しました。もう一度お試しください。
              </p>
              
              {onComplete && (
                <button
                  onClick={onComplete}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-xl transform hover:scale-105"
                >
                  最初からやり直す
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const prediction = predictions[0]; // 1つの価値観のみ

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ヘロー結果セクション */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-4 md:p-8 mb-4 md:mb-8 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-4 md:mb-5">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
            あなたの未来分析が完了しました！
          </h1>
          <p className="text-base font-light opacity-90 max-w-2xl mx-auto">
            あなたの可能性とロードマップをご覧ください
          </p>
        </div>
      </div>

      {/* あなたが描く「最高の未来」 */}
      <div className="relative mb-4 md:mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
          
          <div className="p-4 md:p-8 relative z-10">
            <div className="flex items-center justify-between mb-2 md:mb-6">
              <div className="flex items-center">
                <div className="inline-block p-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-4">
                  <div className="bg-white rounded-full p-1 md:p-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  あなたが描く「最高の未来」
                </h2>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 md:p-6 border border-purple-200">
              <p className="text-purple-800 leading-relaxed text-base md:text-lg">
                {typeof prediction.bestFuture === 'string' 
                  ? prediction.bestFuture 
                  : JSON.stringify(prediction.bestFuture, null, 2)
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ギャップレベル */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 mb-4 md:mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-4 md:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-white">
                  現在と理想のギャップ
                </h3>
              </div>
            </div>
            
            {/* 背景英語テキスト */}
            <div className="hidden md:block absolute top-2 right-2 transform translate-x-6 -translate-y-2">
              <div className="text-white/10 font-black text-6xl lg:text-7xl xl:text-8xl tracking-wider select-none">
                GAP
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700 font-medium">現状</span>
              <span className="text-gray-700 font-medium">理想</span>
            </div>
            
            {/* プログレスバー */}
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-8 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-8 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${prediction.gapLevel}%` }}
                >
                  <div className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">{prediction.gapLevel}%</span>
                <p className="text-gray-600 mt-2">
                  {prediction.gapLevel < 30 ? '大きな成長の可能性があります' :
                   prediction.gapLevel < 70 ? '着実に前進しています' : 'もう少しで理想に近づけます'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* あなたを止めている障壁 */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-4 md:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white">
                あなたを止めている障壁
              </h3>
            </div>
            
            {/* 背景英語テキスト */}
            <div className="hidden md:block absolute top-2 right-2 transform translate-x-8 -translate-y-2">
              <div className="text-white/10 font-black text-6xl lg:text-7xl xl:text-8xl tracking-wider select-none">
                BARRIER
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8 space-y-6">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 md:p-6 border border-amber-200">
            <p className="text-amber-800 leading-relaxed text-base md:text-lg">
              {typeof prediction.barriers === 'string' 
                ? prediction.barriers 
                : JSON.stringify(prediction.barriers, null, 2)
              }
            </p>
          </div>
        </div>
      </div>

      {/* ロードマップ */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 md:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-white">
                あなたのロードマップ
              </h3>
            </div>
            
            {/* 背景英語テキスト */}
            <div className="hidden md:block absolute top-2 right-2 transform translate-x-10 -translate-y-2">
              <div className="text-white/10 font-black text-5xl lg:text-6xl xl:text-7xl tracking-wider select-none">
                ROADMAP
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-8 space-y-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl pt-0 md:pt-0 p-4 md:p-6 border border-emerald-200">
            <RoadmapRenderer 
              markdown={typeof prediction.roadmap === 'string' 
                ? prediction.roadmap 
                : JSON.stringify(prediction.roadmap, null, 2)
              } 
            />
          </div>
        </div>
      </div>

      {/* コーチング誘導エリア */}
      <div className="relative mb-4 md:mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
          
          <div className="p-4 md:p-8 relative z-10">
            <div className="text-center mb-4 md:mb-8 relative">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-4 md:mb-6">
                <div className="bg-white rounded-full p-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 md:mb-6">
                  ギャップを埋めて理想を実現しませんか？
                </h3>
              </div>
              
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                現在と理想のギャップを埋めるための<br className="block md:hidden" />具体的な行動計画を<br />
                コーチがあなたと一緒に作成します。
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
                    <h4 className="text-base md:text-lg font-bold text-green-900">本質的な自己理解</h4>
                  </div>
                  <p className="text-green-800 leading-relaxed text-sm md:text-base">
                    ・ポテンシャルや才能を発掘<br />
                    ・心からやりたいことや夢を発見
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-green-900">オーダーメイド人生設計</h4>
                  </div>
                  <p className="text-green-800 leading-relaxed text-sm md:text-base">
                    ・あなただけの人生マップを作成<br />
                    ・理想の自分を現実にする戦略プラン
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-green-900">実践的アプローチ</h4>
                  </div>
                  <p className="text-green-800 leading-relaxed text-sm md:text-base">
                    ・理想を叶えるアクションプランを作成<br />
                    ・目標達成を加速させる実践スキルを習得
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <h4 className="text-base md:text-lg font-bold text-green-900">継続サポート</h4>
                  </div>
                  <p className="text-green-800 leading-relaxed text-sm md:text-base">
                    ・成果まで寄り添う長期サポート<br />
                    ・LINEでいつでも相談・質問OK<br />
                    ・進捗に応じた個別アドバイスでモチベーション維持
                  </p>
                </div>
              </div>
            </div>

            {/* アクションボタンエリア */}
            <div className="text-center">
              <button
                onClick={() => handleLinkClick(EXTERNAL_LINKS.LINE_OFFICIAL)}
                className="inline-flex items-center px-4 py-4 md:px-12 md:py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer mb-4"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINEで無料相談を始める
              </button>

              <p className="text-gray-500 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                ※ 初回相談は無料です。外部サイトが新しいタブで開きます
              </p>

              {/* 診断終了ボタン */}
              {onComplete && (
                <button
                  onClick={onComplete}
                  className="px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl transition-all duration-200 font-medium cursor-pointer"
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