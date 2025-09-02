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
    <div className="max-w-2xl mx-auto p-6">
      {/* 進捗インジケーター */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>質問 {currentIndex + 1} / {totalQuestions}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 価値選択フォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            あなたの人生で最も大切にしたい項目を3つ選んでください
          </h2>
          
          <p className="text-gray-600 mb-6">
            以下の10個の項目から、あなたが最も重要だと思う3つを選択してください。
          </p>

          {/* 価値項目の選択 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {valueItems.map((item) => {
              const isSelected = selectedValues.some(v => v.id === item.id);
              const isDisabled = !isSelected && selectedValues.length >= 3;
              
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleValueToggle(item)}
                  disabled={isDisabled}
                  className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : isDisabled
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium mb-1">{item.name}</div>
                  <div className="text-sm opacity-80">{item.description}</div>
                  {isSelected && (
                    <div className="mt-2 text-blue-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* ボタン */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={onPrevious}
            className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            ← 前の質問に戻る
          </button>

          <button
            type="submit"
            disabled={selectedValues.length !== 3}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedValues.length === 3
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            選択を確定 →
          </button>
        </div>
      </form>
    </div>
  );
}; 