import React from 'react';

interface DiagnosisStartProps {
  onStart: () => void;
}

export const DiagnosisStart: React.FC<DiagnosisStartProps> = ({
  onStart,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ヘロー開始セクション */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-4 md:p-8 mb-4 md:mb-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-4 md:mb-5">
            <div className="w-14 h-14 md:w-18 md:h-18 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-7 h-7 :w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-xl md:text-2xl font-bold mb-4 leading-tight">
            ライフコーチAIを使ってみましょう！
          </h1>
          <p className="text-base font-light opacity-90 max-w-3xl mx-auto leading-relaxed">
            AI×Big5で性格を分析し、あなたの強みと才能を発見します。<br />
            人生で大切にしたい価値を明確にして、理想の自分への具体的なロードマップを作成します。<br />
            所要時間は約5-10分です。
          </p>
        </div>
      </div>

      {/* 診断についてカード */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-4 md:p-8">
            <div className="text-center mb-4">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
                3つのステップで理想の未来へ
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4 md:mb-8">
              <div className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 md:p-6 border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <span className="text-white font-bold text-sm md:text-base">1</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">
                    自己理解
                  </h3>
                  <p className="text-blue-800 leading-relaxed text-sm">
                    AI×Big5であなたの性格傾向を分析し、強みと才能を発見します。
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 md:p-6 border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <span className="text-white font-bold text-sm md:text-base">2</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">
                    目標設定
                  </h3>
                  <p className="text-purple-800 leading-relaxed text-sm">
                    大切にしたい価値を選択し、現状と理想のギャップを明確化します。
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 md:p-6 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <span className="text-white font-bold text-sm md:text-base">3</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">
                    行動計画
                  </h3>
                  <p className="text-emerald-800 leading-relaxed text-sm">
                    目標達成までの具体的なロードマップを作成します。
                  </p>
                </div>
              </div>
            </div>
            {/* 開始ボタン */}
            <div className="text-center">
              <button
                onClick={onStart}
                className="px-12 py-4 text-base md:text-lg font-semibold rounded-2xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl text-white transform hover:scale-105 cursor-pointer"
              >
                診断を開始する
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 注意事項カード */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-6">
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            ご注意
          </h3>
        </div>
        <div className="p-4 md:p-8">
          <p className="text-gray-700 leading-relaxed text-base">
            この診断は自己理解と目標設定を支援するツールです。医学的な診断や治療の参考にはなさらないでください。
          </p>
        </div>
      </div>
    </div>
  );
};