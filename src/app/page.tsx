'use client';

import React, { useState } from 'react';
import { DiagnosisLayout } from '@/components/layout/DiagnosisLayout';
import { DiagnosisStart } from '@/components/DiagnosisStart';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { useQuestions } from '@/hooks/useApi';

type DiagnosisStep = 'start' | 'questions';

export default function HomePage() {
  const [step, setStep] = useState<DiagnosisStep>('start');
  const { questions } = useQuestions();

  // 診断開始処理
  const handleDiagnosisStart = () => {
    setStep('questions');
  };

  // 最初に戻る処理
  const handleBackToStart = () => {
    setStep('start');
  };

  return (
    <DiagnosisLayout>
      {/* 開始画面 */}
      {step === 'start' && (
        <DiagnosisStart onStart={handleDiagnosisStart} />
      )}

      {/* 最初の質問表示画面 */}
      {step === 'questions' && (
        <div className="animate-fade-in">
          <QuestionDisplay questions={questions} />
          
          {/* 戻るボタン */}
          <div className="max-w-2xl mx-auto mt-8 text-center">
            <button
              onClick={handleBackToStart}
              className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              最初に戻る
            </button>
          </div>
        </div>
      )}
    </DiagnosisLayout>
  );
}