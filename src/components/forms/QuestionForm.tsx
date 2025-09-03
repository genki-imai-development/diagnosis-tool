import React, { useState, useEffect } from 'react';
import { Question, Answer } from '@/types/diagnosis';
import { validateAnswer } from '@/utils/validation';

interface QuestionFormProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onNext: (answer: Answer) => void;
  onPrevious?: () => void;
  initialValue?: string;
  isLastQuestion?: boolean;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onNext,
  onPrevious,
  initialValue = '',
  isLastQuestion = false,
}) => {
  const [text, setText] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  // 質問が変更されたときに入力内容を保持する
  useEffect(() => {
    setText(initialValue); // 以前までの回答を保持
    setError(null); // バリデーションエラーはクリア
  }, [question.id, initialValue]); // question.idを監視して質問変更を検知

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 文字数バリデーション実行
    const validationError = validateAnswer(text, question);
    if (validationError) {
      setError(validationError);
      return;
    }

    // エラーをクリアして次へ
    setError(null);
    onNext({
      questionId: question.id,
      text: text.trim(),
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // 入力中にエラーをクリア
    if (error) {
      setError(null);
    }
  };

  const currentLength = text.trim().length;
  const isValid = currentLength >= question.minLength;

  // 全体12ステップ（基本質問5 + 価値選択1 + 価値詳細6）での進捗計算
  // 基本質問は0%から開始し、1問目完了時に約8.33%（100/12）
  const totalSteps = 12; // 5 + 1 + 6
  const progressPercentage = (currentIndex / totalSteps) * 100; // 0%からスタート

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

      {/* 質問カード */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-8 space-y-8">
            <div className="text-center mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                <div className="bg-white rounded-full p-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{currentIndex + 1}</span>
                  </div>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
                {question.text}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder={question.placeholder || '自由にご記入ください...'}
                  className={`w-full p-6 border-2 rounded-2xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-lg leading-relaxed ${
                    error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                  }`}
                  rows={4}
                  required
                />
                
                {/* 文字数カウンター */}
                <div className="flex justify-between items-center mt-4">
                  <div className={`flex items-center text-sm font-medium ${
                    isValid 
                      ? 'text-emerald-600' 
                      : currentLength > 0 
                      ? 'text-amber-600' 
                      : 'text-gray-500'
                  }`}>
                    <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                      isValid ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      {isValid ? (
                        <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    {currentLength} / {question.minLength}文字以上
                  </div>
                </div>

                {/* エラーメッセージ */}
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
              </div>

              {/* ボタン */}
              <div className="flex justify-between items-center pt-6">
                {currentIndex > 0 ? (
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="px-8 py-4 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg cursor-pointer"
                  >
                    ← 前の質問に戻る
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                    isValid
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