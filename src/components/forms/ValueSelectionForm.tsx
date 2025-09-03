import React, { useState } from 'react';
import { ValueItem } from '@/types/diagnosis';

interface ValueSelectionFormProps {
  onNext: (selectedValues: ValueItem[]) => void;
  onPrevious: () => void;
  currentIndex: number;
  totalQuestions: number;
}

export const ValueSelectionForm: React.FC<ValueSelectionFormProps> = ({
  onNext,
  onPrevious,
  currentIndex,
  totalQuestions,
}) => {
  const [selectedValues, setSelectedValues] = useState<ValueItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 価値項目の定義
  const valueItems: ValueItem[] = [
    { id: 'career', name: '仕事・キャリア', description: '職業や仕事での成長、スキルアップ' },
    { id: 'money', name: 'お金・経済', description: '収入、貯蓄、投資、経済的な安定' },
    { id: 'health', name: '健康・身体', description: '身体的健康、運動、食事、睡眠' },
    { id: 'relationships', name: '人間関係', description: '家族、友人、恋人、コミュニティ' },
    { id: 'learning', name: '学習・成長', description: '知識、スキル、自己啓発、教育' },
    { id: 'hobbies', name: '趣味・楽しみ', description: 'レジャー、娯楽、創造的活動' },
    { id: 'spirituality', name: '精神・心', description: '心の平安、精神的な成長、価値観' },
    { id: 'contribution', name: '社会貢献', description: 'ボランティア、社会への貢献、環境保護' },
    { id: 'creativity', name: '創造性・表現', description: 'アート、音楽、創作活動、自己表現' },
    { id: 'adventure', name: '冒険・挑戦', description: '新しい体験、リスクテイク、挑戦' }
  ];

  // 価値項目の選択時
  const handleValueToggle = (value: ValueItem) => {
    setSelectedValues(prev => {
      const isSelected = prev.some(v => v.id === value.id);
      if (isSelected) {
        return prev.filter(v => v.id !== value.id);
      } else {
        if (prev.length >= 3) {
          return prev;
        }
        return [...prev, value];
      }
    });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedValues.length !== 3) {
      setError('3つの項目を選択してください');
      return;
    }

    onNext(selectedValues);
  };

  // 全体12ステップ（基本質問5 + 価値選択1 + 価値詳細6）での進捗計算
  // 価値選択は5ステップ完了後の状態（5/12 = 約41.67%）
  const totalSteps = 12; // 5 + 1 + 6
  const progressPercentage = (5 / totalSteps) * 100; // 基本質問5問完了後

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 進捗インジケーターカード */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-semibold">質問 {currentIndex + 1} / {totalQuestions}</span>
            </div>
            <span className="text-lg font-bold">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 価値選択カード */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-8 space-y-8">
            <div className="text-center mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                <div className="bg-white rounded-full p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
                あなたの人生で最も大切にしたい項目を3つ選んでください
              </h2>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                以下の10個の項目から、あなたが最も重要だと思う3つを選択してください。
              </p>
            </div>

            <div className="space-y-6">
              {/* 価値項目の選択 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {valueItems.map((item) => {
                  const isSelected = selectedValues.some(v => v.id === item.id);
                  const isDisabled = !isSelected && selectedValues.length >= 3;
                  
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleValueToggle(item)}
                      disabled={isDisabled}
                      className={`relative p-6 border-2 rounded-2xl text-left transition-all duration-300 group hover:shadow-lg ${
                        isSelected
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 text-blue-900 shadow-lg cursor-pointer'
                          : isDisabled
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
                      }`}
                    >
                      {/* 選択状態インジケーター */}
                      <div className="absolute top-4 right-4">
                        {isSelected ? (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className={`w-6 h-6 border-2 rounded-full ${
                            isDisabled ? 'border-gray-300' : 'border-gray-400 group-hover:border-blue-400'
                          }`} />
                        )}
                      </div>

                      <div className="pr-8">
                        <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                        <p className="text-sm opacity-80 leading-relaxed">{item.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* エラーメッセージ */}
              {error && (
                <div className="p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                  <p className="text-red-600 font-medium flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              {/* ボタン */}
              <div className="flex justify-between items-center pt-6">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="px-8 py-4 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  ← 前の質問に戻る
                </button>

                <button
                  type="submit"
                  disabled={selectedValues.length !== 3}
                  className={`px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                    selectedValues.length === 3
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                >
                  次の質問へ →
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 