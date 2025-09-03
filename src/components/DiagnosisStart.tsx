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
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full translate-y-20 -translate-x-20"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-3xl font-bold mb-4 leading-tight">
            あなたの性格を診断します
          </h1>
          <p className="text-xl md:text-xl font-light opacity-90 max-w-3xl mx-auto leading-relaxed">
            いくつかの質問にお答えいただくことで、あなたの性格傾向を分析します。<br />
            基本質問の後に、人生で大切にしたい項目の選択と詳細な質問があります。<br />
            所要時間は約10-15分です。
          </p>
        </div>
      </div>

      {/* 診断についてカード */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                <div className="bg-white rounded-full p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                診断について
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">
                    自由記述回答
                  </h3>
                  <p className="text-blue-800 leading-relaxed text-sm">
                    複数の質問に自由記述でお答えください
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-purple-900 mb-2">
                    AI性格分析
                  </h3>
                  <p className="text-purple-800 leading-relaxed text-sm">
                    AIが回答を分析し、性格傾向を診断します
                  </p>
                </div>
              </div>

              <div className="group">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">
                    詳細分析結果
                  </h3>
                  <p className="text-emerald-800 leading-relaxed text-sm">
                    詳細な分析結果をご提供します
                  </p>
                </div>
              </div>
            </div>
            {/* 開始ボタン */}
            <div className="text-center">
              <button
                onClick={onStart}
                className="px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl text-white transform hover:scale-105 cursor-pointer"
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
          <h3 className="text-2xl font-bold text-white flex items-center">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            ご注意
          </h3>
        </div>
        <div className="p-8">
          <p className="text-gray-700 leading-relaxed text-lg">
            この診断は娯楽目的です。医学的な診断や治療の参考にはなさらないでください。
            また、不適切な内容の投稿はお控えください。
          </p>
        </div>
      </div>
    </div>
  );
};