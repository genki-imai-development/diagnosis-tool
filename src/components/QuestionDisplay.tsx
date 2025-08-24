import React from 'react';
import { Question } from '@/types/diagnosis';

interface QuestionDisplayProps {
  questions: Question[];
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  questions,
}) => {
  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-gray-600">質問が見つかりませんでした。</p>
      </div>
    );
  }

  // 最初の質問を表示
  const firstQuestion = questions[0];

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* 進捗インジケーター */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>質問 1 / {questions.length}</span>
          <span>{Math.round((1 / questions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(1 / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 質問表示 */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {firstQuestion.text}
          </h2>
          
          <div className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 min-h-[150px] flex items-center justify-center">
            <p className="text-gray-500 text-center">
              {firstQuestion.placeholder || '回答フォームは今後実装予定です'}
            </p>
          </div>
          
          {/* 質問の詳細情報 */}
          <div className="mt-4 text-sm text-gray-600">
            <p>最小文字数: {firstQuestion.minLength}文字</p>
          </div>
        </div>
      </div>
    </div>
  );
};
