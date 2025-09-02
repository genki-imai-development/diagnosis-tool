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

  // 質問が変更されたときに入力内容を切り替える
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

      {/* 質問フォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {question.text}
          </h2>
          
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder={question.placeholder || '自由にご記入ください...'}
            className={`w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            }`}
            rows={6}
            required
          />
          
          {/* 文字数カウンター */}
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className={`${
              isValid 
                ? 'text-green-600' 
                : currentLength > 0 
                ? 'text-amber-600' 
                : 'text-gray-500'
            }`}>
              {currentLength} / {question.minLength}文字以上
              {isValid && <span className="ml-1">✓</span>}
            </span>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
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
          {currentIndex > 0 ? (
            <button
              type="button"
              onClick={onPrevious}
              className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              ← 前の質問に戻る
            </button>
          ) : (
            <div />
          )}

          <button
            type="submit"
            disabled={!isValid}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            {isLastQuestion ? '診断を実行 →' : '次の質問へ →'}
          </button>
        </div>
      </form>
    </div>
  );
};