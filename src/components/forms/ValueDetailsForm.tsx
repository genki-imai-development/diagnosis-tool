import React, { useState } from 'react';
import { ValueItem, SelectedValueItem } from '@/types/diagnosis';

interface ValueDetailsFormProps {
  valueItems: ValueItem[];
  onNext: (valueDetails: SelectedValueItem[]) => void;
  onBack: () => void;
}

export default function ValueDetailsForm({ valueItems, onNext, onBack }: ValueDetailsFormProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{
    satisfaction: number;
    satisfactionPoints: string;
    dissatisfactionPoints: string;
    idealState: string;
    obstacles: string;
  }>({
    satisfaction: 50,
    satisfactionPoints: '',
    dissatisfactionPoints: '',
    idealState: '',
    obstacles: ''
  });
  const [error, setError] = useState<string | null>(null);

  // プログレスの計算 - QuestionFormと同じ構造
  const totalSteps = 26; // 基本質問20 + 価値選択1 + 価値詳細5
  const currentStepNumber = 21 + currentQuestionIndex; // 基本質問20 + 価値選択1 + 現在の価値詳細質問
  const progressPercentage = (currentStepNumber / totalSteps) * 100;

  const currentItem = valueItems[0];
  
  const questions = [
    {
      id: 'satisfaction',
      title: '現状の満足度',
      question: `「${currentItem?.name}」について、現状の満足度は100点満点のうち、何点ですか？`,
      type: 'slider' as const
    },
    {
      id: 'satisfactionPoints',
      title: '満足している点',
      question: '満足している点を教えてください',
      type: 'textarea' as const,
      placeholder: '例：現在の状況で良いと思う点、うまくいっている部分...'
    },
    {
      id: 'dissatisfactionPoints', 
      title: '不満や課題',
      question: '不満や課題を感じている点を教えてください',
      type: 'textarea' as const,
      placeholder: '例：改善したい点、困っていること、課題に感じていること...'
    },
    {
      id: 'idealState',
      title: '理想の状態',
      question: 'どんな状態になれば100点満点ですか？',
      type: 'textarea' as const,
      placeholder: '例：理想的な状況、達成したい目標、なりたい状態...'
    },
    {
      id: 'obstacles',
      title: '障害や不安',
      question: 'その理想に近づくとき、一番の障害や不安はなんだと思いますか？',
      type: 'textarea' as const,
      placeholder: '例：時間がない、スキル不足、環境の制約、心配事...'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    // バリデーション
    if (currentQuestion.type === 'textarea') {
      const value = responses[currentQuestion.id as keyof typeof responses] as string;
      if (!value || value.trim().length < 2) {
        setError('2文字以上で入力してください');
        return;
      }
    }

    setError(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 全質問完了
      onNext([{
        id: currentItem.id,
        name: currentItem.name,
        satisfaction: responses.satisfaction,
        satisfactionPoints: responses.satisfactionPoints.trim(),
        dissatisfactionPoints: responses.dissatisfactionPoints.trim(),
        idealState: responses.idealState.trim(),
        obstacles: responses.obstacles.trim()
      }]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setError(null);
    } else {
      onBack();
    }
  };

  const handleSliderChange = (value: number) => {
    setResponses(prev => ({ ...prev, satisfaction: value }));
    setError(null);
  };

  const handleTextChange = (field: string, value: string) => {
    setResponses(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const isNextDisabled = () => {
    if (currentQuestion.type === 'slider') {
      return false; // スライダーは常に値があるので無効化しない
    }
    
    const value = responses[currentQuestion.id as keyof typeof responses] as string;
    return !value || value.trim().length < 2;
  };

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
              <span className="text-lg font-semibold">質問 {currentStepNumber + 1} / {totalSteps}</span>
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

      {/* 質問カード - QuestionFormと同じ構造 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="p-4 md:p-8 space-y-8">
            <div className="text-center mb-4 md:mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{currentStepNumber + 1}</span>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="space-y-6">
              {/* 入力エリア */}
              {currentQuestion.type === 'slider' ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      {responses.satisfaction}点
                    </div>
                    <div className="text-gray-500">
                      {responses.satisfaction < 30 ? '改善が必要' :
                       responses.satisfaction < 70 ? 'まずまず' : '満足'}
                    </div>
                  </div>
                  
                  <div className="px-4">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={responses.satisfaction}
                      onChange={(e) => handleSliderChange(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                        '--tw-gradient-from': '#3b82f6',
                        '--tw-gradient-to': '#a855f7'
                      } as React.CSSProperties}
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>0点</span>
                      <span>50点</span>
                      <span>100点</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <textarea
                    value={responses[currentQuestion.id as keyof typeof responses] as string}
                    onChange={(e) => handleTextChange(currentQuestion.id, e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full h-30 p-4 md:p-6 border-2 rounded-2xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-base md:text-lg leading-relaxed border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300"
                    rows={4}
                    maxLength={50}
                  />
                  <div className="mt-2 text-right text-sm">
                    <span className={`${
                      (responses[currentQuestion.id as keyof typeof responses] as string).length <= 1 || 
                      (responses[currentQuestion.id as keyof typeof responses] as string).length > 50 
                        ? 'text-red-500 font-semibold' 
                        : 'text-green-600 font-semibold'
                    }`}>
                      {(responses[currentQuestion.id as keyof typeof responses] as string).length} / 50 文字
                    </span>
                  </div>
                </div>
              )}

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
                {currentQuestionIndex > 0 || true ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-4 py-4 md:px-10 md:py-4 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg cursor-pointer"
                  >
                    {currentQuestionIndex === 0 ? '価値選択に戻る' : '前の質問'}
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  disabled={isNextDisabled()}
                  className={`px-4 py-4 md:px-10 md:py-4 rounded-2xl font-semibold text-base md:text-lg transition-all duration-200 ${
                    !isNextDisabled()
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                >
                  {currentQuestionIndex === questions.length - 1 ? '診断を実行' : '次の質問へ'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}; 