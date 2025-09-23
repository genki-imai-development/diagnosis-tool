import React from 'react';
import { RadarChart } from '@/components/ui/RadarChart';
import type { DiagnosisResult as DiagnosisResultType } from '@/types/diagnosis';
import Image from 'next/image';

interface DiagnosisResultProps {
  result: DiagnosisResultType | null;
  loading: boolean;
  onNext?: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  result,
  loading,
  onNext,
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                AI分析中...10秒程度お待ちください
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                あなたの入力内容をもとに、性格特性を診断しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return;
    // return (
    //   <div className="max-w-4xl mx-auto">
    //     <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
    //       <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-6">
    //         <h3 className="text-2xl font-bold text-white flex items-center">
    //           <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
    //             <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
    //               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    //             </svg>
    //           </div>
    //           診断結果がありません
    //         </h3>
    //       </div>
    //       <div className="p-8 text-center">
    //         <p className="text-gray-700 text-lg leading-relaxed">
    //           診断データの生成に問題があったようです。
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // );
  }

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
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
            性格特性分析が完了しました！
          </h1>
          <p className="text-base font-light opacity-90 max-w-2xl mx-auto">
            あなたの入力内容をもとに、性格特性を診断しました。
          </p>
        </div>
      </div>

      {/* パーソナリティタイプカード */}
      <div className="relative mb-4 md:mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          {/* 背景英語テキスト */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-gray-300/40 font-black text-7xl md:text-9xl lg:text-[12rem] xl:text-[14rem] tracking-wider transform -rotate-12 select-none whitespace-nowrap">
              {result.pattern.id.toUpperCase()}
            </div>
          </div>
          
          <div className="p-4 md:p-8 relative z-10">
            <div className="text-center">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                <div className="bg-white rounded-full p-4">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto">
                    <Image
                      src={result.pattern.image}
                      alt={result.pattern.name}
                      width={128}
                      height={128}
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
              
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {result.pattern.name}
              </h2>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {result.pattern.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* レーダーチャートカード */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 mb-4 md:mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 md:p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            あなたの詳細分析
          </h3>
        </div>
        <div className="p-4 md:p-8 space-y-6">
          {/* キーワードカード */}
          <div className="mb-6">
            {/* セクション見出し */}
            <div className="mb-4">
              <h3 className="text-base md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                あなたを象徴するキーワード
              </h3>
              <div className="w-20 h-0.5 md:h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            {/* モバイル: 横スクロール */}
            <div className="md:hidden">
              <div className="flex gap-4 overflow-x-auto pb-4 px-4 -mx-4 scrollbar-hide">
                <div className="flex gap-4" style={{ width: 'max-content' }}>
                  {result.pattern.keywords.split(',').slice(0, 3).map((keyword, index) => {
                    // 固定デザイン設定
                    const cardDesigns = [
                      {
                        // 1つ目: ダイヤモンド
                        icon: (
                          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 2l2 4h8l2-4-3 20L12 18 9 22 6 2z"/>
                            <path d="M8 6l4 12 4-12H8z" opacity="0.5"/>
                          </svg>
                        ),
                        gradient: 'from-indigo-600 via-purple-600 to-pink-600',
                        border: 'border-indigo-300/30'
                      },
                      {
                        // 2つ目: フェニックス
                        icon: (
                          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6-.51-.96-.78-2.05-.78-3.19 0-3.73 3.02-6.75 6.75-6.75.37 0 .74.03 1.1.08C21.82 9.71 21 7.73 19.65 6.17 18.03 4.31 15.61 3 12.9 3c-.3 0-.6.01-.9.04V2z"/>
                            <path d="M17.62 11.54c-1.5 0-2.71 1.21-2.71 2.71 0 .45.11.87.31 1.24.43-.23.91-.37 1.42-.37 1.66 0 3 1.34 3 3 0 .83-.34 1.58-.88 2.12.54-.34.88-.94.88-1.62 0-1.5-1.21-2.71-2.71-2.71-.23 0-.45.03-.66.08.18-.4.28-.84.28-1.3 0-1.66-1.34-3-3-3-.93 0-1.76.43-2.31 1.1.23-.06.47-.1.72-.1 1.5 0 2.71 1.21 2.71 2.71 0 .83-.38 1.57-0.97 2.06.31.18.66.29 1.04.29 1.66 0 3-1.34 3-3 0-.45-.1-.87-.28-1.24.52.24 1.1.37 1.71.37 2.21 0 4-1.79 4-4s-1.79-4-4-4z"/>
                          </svg>
                        ),
                        gradient: 'from-orange-600 via-red-600 to-pink-600',
                        border: 'border-orange-300/30'
                      },
                      {
                        // 3つ目: 王冠
                        icon: (
                          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 16L3 6l5.5 6L12 4l3.5 8L21 6l-2 10H5zm2.7-2h8.6l.9-4.4L14 12l-2-5-2 5-3.2-2.4L7.7 14z"/>
                          </svg>
                        ),
                        gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
                        border: 'border-emerald-300/30'
                      }
                    ];

                    const design = cardDesigns[index];

                    return (
                      <div key={index} className="relative flex-shrink-0" style={{ width: '220px' }}>
                        {/* メインカード */}
                        <div className={`relative bg-gradient-to-br ${design.gradient} rounded-2xl p-6 border ${design.border} shadow-2xl overflow-hidden h-32`}>
                          {/* 背景アイコン */}
                          <div className="absolute inset-0 flex items-center justify-center text-white/15 opacity-100">
                            <div className="w-24 h-24">
                              {design.icon}
                            </div>
                          </div>
                          
                          {/* 装飾的なグラデーション層 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10"></div>
                          
                          {/* 光沢効果 */}
                          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
                          
                          {/* テキストコンテンツ */}
                          <div className="relative z-10 flex items-center justify-center h-full">
                            <h3 className="text-white font-bold text-base text-center leading-tight drop-shadow-lg">
                              {keyword.trim()}
                            </h3>
                          </div>
                          
                          {/* 下部の装飾ライン */}
                          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                        </div>
                        
                        {/* 外側のグロー効果 */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${design.gradient} rounded-2xl blur-xl opacity-20 -z-10 scale-105`}></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* デスクトップ: グリッド */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-6">
              {result.pattern.keywords.split(',').slice(0, 3).map((keyword, index) => {
                // 固定デザイン設定
                const cardDesigns = [
                  {
                    // 1つ目: ダイヤモンド
                    icon: (
                      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 2l2 4h8l2-4-3 20L12 18 9 22 6 2z"/>
                        <path d="M8 6l4 12 4-12H8z" opacity="0.5"/>
                      </svg>
                    ),
                    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
                    border: 'border-indigo-300/30'
                  },
                  {
                    // 2つ目: フェニックス
                    icon: (
                      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.19 0 2.34-.21 3.41-.6-.51-.96-.78-2.05-.78-3.19 0-3.73 3.02-6.75 6.75-6.75.37 0 .74.03 1.1.08C21.82 9.71 21 7.73 19.65 6.17 18.03 4.31 15.61 3 12.9 3c-.3 0-.6.01-.9.04V2z"/>
                        <path d="M17.62 11.54c-1.5 0-2.71 1.21-2.71 2.71 0 .45.11.87.31 1.24.43-.23.91-.37 1.42-.37 1.66 0 3 1.34 3 3 0 .83-.34 1.58-.88 2.12.54-.34.88-.94.88-1.62 0-1.5-1.21-2.71-2.71-2.71-.23 0-.45.03-.66.08.18-.4.28-.84.28-1.3 0-1.66-1.34-3-3-3-.93 0-1.76.43-2.31 1.1.23-.06.47-.1.72-.1 1.5 0 2.71 1.21 2.71 2.71 0 .83-.38 1.57-0.97 2.06.31.18.66.29 1.04.29 1.66 0 3-1.34 3-3 0-.45-.1-.87-.28-1.24.52.24 1.1.37 1.71.37 2.21 0 4-1.79 4-4s-1.79-4-4-4z"/>
                      </svg>
                    ),
                    gradient: 'from-orange-600 via-red-600 to-pink-600',
                    border: 'border-orange-300/30'
                  },
                  {
                    // 3つ目: 王冠
                    icon: (
                      <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 16L3 6l5.5 6L12 4l3.5 8L21 6l-2 10H5zm2.7-2h8.6l.9-4.4L14 12l-2-5-2 5-3.2-2.4L7.7 14z"/>
                      </svg>
                    ),
                    gradient: 'from-emerald-600 via-teal-600 to-cyan-600',
                    border: 'border-emerald-300/30'
                  }
                ];

                const design = cardDesigns[index];

                return (
                  <div key={index} className="relative group">
                    {/* メインカード */}
                    <div className={`relative bg-gradient-to-br ${design.gradient} rounded-2xl p-8 border ${design.border} shadow-2xl overflow-hidden`}>
                      {/* 背景アイコン */}
                      <div className="absolute inset-0 flex items-center justify-center text-white/15 opacity-100">
                        <div className="w-32 h-32 md:w-40 md:h-40">
                          {design.icon}
                        </div>
                      </div>
                      
                      {/* 装飾的なグラデーション層 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10"></div>
                      
                      {/* 光沢効果 */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"></div>
                      
                      {/* テキストコンテンツ */}
                      <div className="relative z-10 flex items-center justify-center h-24 md:h-28">
                        <h3 className="text-white font-bold text-lg md:text-xl text-center leading-tight drop-shadow-lg">
                          {keyword.trim()}
                        </h3>
                      </div>
                      
                      {/* 下部の装飾ライン */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </div>
                    
                    {/* 外側のグロー効果 */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${design.gradient} rounded-2xl blur-xl opacity-20 -z-10 scale-105`}></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* キーワード総評エリア */}
          {/* <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-4 md:p-6 border border-slate-200 mb-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-slate-500 to-gray-600 rounded-full flex items-center justify-center mt-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 011.414 0L9 8.586 7.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L9 8.586z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-slate-800 leading-relaxed text-sm md:text-base">
                  {result.pattern.keywords_summary}
                </p>
              </div>
            </div>
          </div> */}

          {/* 1. あなたの強み（才能） */}
          <div className="group">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-4 md:p-6 border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-base md:text-lg font-bold text-purple-900">
                  あなたの強み（才能）
                </h4>
              </div>
              <p className="text-purple-800 leading-relaxed text-sm md:text-base">
                {result.strengths}
              </p>
            </div>
          </div>

          {/* 2. あなたのやる気スイッチ（原動力） */}
          <div className="group">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 md:p-6 border border-orange-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-base md:text-lg font-bold text-orange-900">
                  あなたのやる気スイッチ（原動力）
                </h4>
              </div>
              <p className="text-orange-800 leading-relaxed text-sm md:text-base">
                {result.motivation}
              </p>
            </div>
          </div>

          {/* 3. マッチする環境（最も輝く環境） */}
          <div className="group">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 md:p-6 border border-green-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-base md:text-lg font-bold text-green-900">
                  マッチする環境（最も輝く環境）
                </h4>
              </div>
              <div className="text-green-800 leading-relaxed text-sm md:text-base">
                {result.goodEnvironment.split('\n').map((line, index) => {
                  if (line.startsWith('・')) {
                    return (
                      <div key={index} className="flex items-center ml-4 my-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                        <span>{line.substring(1)}</span>
                      </div>
                    );
                  } else if (line.includes('適職：')) {
                    return (
                      <div key={index} className="font-semibold mt-3 mb-2 text-green-900">
                        {line}
                      </div>
                    );
                  } else if (line.trim()) {
                    return (
                      <p key={index} className="mb-2">
                        {line}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          {/* 4. マッチしない環境（輝かない環境） */}
          <div className="group">
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-4 md:p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-base md:text-lg font-bold text-gray-900">
                  マッチしない環境（輝かない環境）
                </h4>
              </div>
              <div className="text-gray-800 leading-relaxed text-sm md:text-base">
                {result.badEnvironment.split('\n').map((line, index) => {
                  if (line.startsWith('・')) {
                    return (
                      <div key={index} className="flex items-center ml-4 my-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full mr-2 flex-shrink-0"></div>
                        <span>{line.substring(1)}</span>
                      </div>
                    );
                  } else if (line.includes('避けるべき職業：')) {
                    return (
                      <div key={index} className="font-semibold mt-3 mb-2 text-gray-900">
                        {line}
                      </div>
                    );
                  } else if (line.trim()) {
                    return (
                      <p key={index} className="mb-2">
                        {line}
                      </p>
                    );
                  }
                  return null;
                })}
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
            次へ進む
          </button>
        </div>
      )}
    </div>
  );
}; 