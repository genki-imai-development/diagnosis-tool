import React, { useState, useEffect } from 'react';
import { Question, Answer } from '@/types/diagnosis';

interface QuestionFormProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onNext: (answer: Answer) => void;
  onPrevious?: () => void;
  initialValue?: boolean;
  isLastQuestion?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onNext,
  onPrevious,
}) => {
  const [selectedValue, setSelectedValue] = useState<boolean | null>(null);

  // 質問が変更されたときに選択肢をリセット
  useEffect(() => {
    setSelectedValue(null); // 選択肢はリセット
  }, [question.id]); // question.idを監視して質問変更を検知



  const handleOptionChange = (value: boolean) => {
    setSelectedValue(value);
    
    // 選択されたら即座に次の質問へ進む
    onNext({
      questionId: question.id,
      value: value,
      text: value ? 'YES' : 'NO',
    });
  };



  // プログレス計算
  const totalSteps = 26; // 基本質問20 + 価値選択1 + 価値詳細5
  const progressPercentage = (currentIndex / totalSteps) * 100; // 1問目は0%から開始

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 進捗インジケーターカード */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-4 md:mb-8">
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

      {/* 質問カード */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-4 md:p-8 space-y-8">
            <div className="text-center mb-4 md:mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{currentIndex + 1}</span>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
                {question.text}
              </h2>
            </div>

            <div className="space-y-6">
              {/* YES/NO選択肢フォーム */}
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
                {/* YES選択肢 */}
                <div className="relative flex-1 max-w-xs">
                  <div className={`absolute inset-0 rounded-2xl transform transition-all duration-300 ${
                    selectedValue === true 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 opacity-30 scale-105' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 scale-100 hover:scale-105'
                  }`}></div>
                  <label className={`group relative block p-3 md:p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 active:scale-50 ${
                    selectedValue === true
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-purple-50 shadow-xl scale-105'
                      : 'border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 hover:border-blue-500 hover:shadow-xl hover:scale-105'
                  }`}>
                    <div className="flex flex-col items-center text-center">
                      <input
                        type="radio"
                        name={`question-option-${question.id}`}
                        value="yes"
                        checked={selectedValue === true}
                        onChange={() => handleOptionChange(true)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-1 md:mb-3 transition-all duration-300 ${
                        selectedValue === true
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 md:from-gray-100 md:to-gray-200 text-white md:text-gray-600 group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white group-hover:shadow-lg'
                      }`}>
                        <span className="text-xl md:text-2xl font-bold">✓</span>
                      </div>
                      <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                        selectedValue === true
                          ? 'text-blue-600'
                          : 'text-gray-700 md:group-hover:text-blue-600'
                      }`}>YES</span>
                    </div>
                  </label>
                </div>

                {/* NO選択肢 */}
                <div className="relative flex-1 max-w-xs">
                  <div className={`absolute inset-0 rounded-2xl transform transition-all duration-300 ${
                    selectedValue === false 
                      ? 'bg-gradient-to-r from-gray-500 to-gray-600 opacity-30 scale-105' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 opacity-20 scale-100 hover:scale-105'
                  }`}></div>
                  <label className={`group relative block p-3 md:p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 active:scale-50 ${
                    selectedValue === false
                      ? 'border-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 shadow-xl scale-105'
                      : 'border-gray-200 bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 hover:border-gray-500 hover:shadow-xl hover:scale-105'
                  }`}>
                    <div className="flex flex-col items-center text-center">
                      <input
                        type="radio"
                        name={`question-option-${question.id}`}
                        value="no"
                        checked={selectedValue === false}
                        onChange={() => handleOptionChange(false)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-1 md:mb-3 transition-all duration-300 ${
                        selectedValue === false
                          ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg'
                          : 'bg-gradient-to-r from-gray-500 to-gray-600 md:from-gray-100 md:to-gray-200 text-white md:text-gray-600 group-hover:from-gray-500 group-hover:to-gray-600 group-hover:text-white group-hover:shadow-lg'
                      }`}>
                        <span className="text-xl md:text-2xl font-bold">✗</span>
                      </div>
                      <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
                        selectedValue === false
                          ? 'text-gray-600'
                          : 'text-gray-700 group-hover:text-gray-600'
                      }`}>NO</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* 戻るボタン */}
              {currentIndex > 0 && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="px-6 py-3 md:px-8 md:py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg cursor-pointer"
                  >
                    前の質問に戻る
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};