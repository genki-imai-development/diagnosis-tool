import React, { useState } from 'react';
import { ValueItem } from '@/types/diagnosis';

interface ValueSelectionFormProps {
  onNext: (selectedValues: ValueItem[]) => void;
  onPrevious: () => void;
}

export const ValueSelectionForm: React.FC<ValueSelectionFormProps> = ({
  onNext,
  onPrevious,
}) => {
  const [selectedValues, setSelectedValues] = useState<ValueItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 価値項目の定義
  const valueItems: ValueItem[] = [
    { id: 'health_mind', name: '健康・心', description: '身体の健康・心・精神のバランス・ストレス管理・睡眠・生活習慣' },
    { id: 'work_growth', name: '仕事・成長', description: '働き方・スキル・成長・挑戦・やりがい・キャリア形成' },
    { id: 'money_life', name: 'お金・生活', description: '収入・貯蓄・投資・経済的自由・資産形成・時間管理・ライフスタイル' },
    { id: 'relationships', name: '人間関係', description: '家族・パートナー・友人・同僚・人脈・信頼関係・コミュニケーション' },
    { id: 'hobbies_leisure', name: '趣味・余暇', description: '趣味・遊び・旅行・創作・楽しみ・リラックス・新しい体験' },
    { id: 'society_contribution', name: '社会・貢献', description: '社会貢献・ボランティア・地域活動・環境・影響力・意義のある活動' }
  ];

  // 価値項目の選択時
  const handleValueToggle = (value: ValueItem) => {
    setSelectedValues(prev => {
      const isSelected = prev.some(v => v.id === value.id);
      if (isSelected) {
        return [];
      } else {
        return [value];
      }
    });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedValues.length !== 1) {
      setError('1つの項目を選択してください');
      return;
    }

    onNext(selectedValues);
  };

  // プログレス計算 - QuestionFormと同じ構造
  const totalSteps = 26; // 基本質問20 + 価値選択1 + 価値詳細5
  const currentStep = 20; // 基本質問20完了後
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 進捗インジケーターカード - QuestionFormと同じデザイン */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-4 md:mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-semibold">質問 {currentStep} / {totalSteps}</span>
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

      {/* 価値選択カード - QuestionFormと同じ構造 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-8">
            <div className="text-center mb-4 md:mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
                あなたが最も重要だと考える価値観を1つ選択してください
              </h2>
            </div>

            <div className="space-y-6">
              {/* 価値項目の選択 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {valueItems.map((item) => {
                  const isSelected = selectedValues.some(v => v.id === item.id);
                  const isDisabled = false; // 1つ選択なので無効化しない
                  
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleValueToggle(item)}
                      disabled={isDisabled}
                      className={`relative p-4 md:p-6 border-2 rounded-2xl text-left transition-all duration-300 hover:shadow-xl ${
                        isSelected
                          ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg transform scale-105'
                          : isDisabled
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                          : 'border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 cursor-pointer'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                            : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600'
                        } transition-all duration-300`}>
                          <span className="text-lg font-bold">
                            {isSelected ? '✓' : '○'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold text-lg mb-2 ${
                            isSelected ? 'text-blue-700' : 'text-gray-800'
                          } transition-colors duration-300`}>
                            {item.name}
                          </h3>
                          <p className={`text-sm leading-relaxed ${
                            isSelected ? 'text-blue-600' : 'text-gray-600'
                          } transition-colors duration-300`}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* エラーメッセージ - QuestionFormと同じデザイン */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                  <p className="text-red-600 font-medium flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              {/* ボタン - QuestionFormと同じデザイン */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={onPrevious}
                  className="px-4 py-4 md:px-10 md:py-4 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  前の質問に戻る
                </button>

                <button
                  type="submit"
                  disabled={selectedValues.length !== 1}
                  className={`px-4 py-4 md:px-10 md:py-4 rounded-2xl font-semibold text-base md:text-lg transition-all duration-200 ${
                    selectedValues.length === 1
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                >
                  次の質問へ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 