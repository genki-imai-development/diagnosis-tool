'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { DiagnosisLayout } from '@/components/layout/DiagnosisLayout';
import { DiagnosisStart } from '@/components/DiagnosisStart';
import { QuestionForm } from '@/components/forms/QuestionForm';
import { ValueSelectionForm } from '@/components/forms/ValueSelectionForm';
import ValueDetailsForm from '@/components/forms/ValueDetailsForm';
import { DiagnosisResult } from '@/components/DiagnosisResult';
import { FuturePrediction } from '@/components/FuturePrediction';
import { useDiagnosis } from '@/hooks/useDiagnosis';
import { DIAGNOSIS_QUESTIONS } from '@/lib/constants';

/**
 * メインページコンポーネント
 * 診断フロー全体を管理し、各ステップのコンポーネントを表示
 */
export default function HomePage() {
  const router = useRouter();
  // 診断フローの状態とアクションを取得
  const {
    // 現在の状態
    step,
    currentQuestionIndex,
    answers,
    selectedValues,
    result,
    futurePredictions,
    isDiagnosisRunning,
    isFuturePredictionRunning,
    apiError,
    QUESTION_COUNTS,

    // アクション関数
    startDiagnosis,
    resetToStart,
    handleAnswerNext,
    handleAnswerPrevious,
    handleValueSelectionNext,
    handleValueDetailsNext,
    goToFuturePrediction,
    goToPreviousStep,
  } = useDiagnosis();

  // 現在の質問を取得
  const currentQuestion = DIAGNOSIS_QUESTIONS[currentQuestionIndex];

  // 現在の回答を取得（以前までの回答を保持するため初期値として利用）
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  // 診断終了時にLPページへ遷移
  const handleDiagnosisComplete = () => {
    router.push('/lp');
  };

  return (
    <DiagnosisLayout>
      {/* ステップ1: 診断開始画面 */}
      {step === 'start' && (
        <DiagnosisStart onStart={startDiagnosis} />
      )}

      {/* ステップ2: 基本質問（20問） */}
      {step === 'questions' && currentQuestion && (
        <QuestionForm
          question={currentQuestion}
          currentIndex={currentQuestionIndex}
          totalQuestions={QUESTION_COUNTS.BASE_QUESTIONS + QUESTION_COUNTS.VALUE_SELECTION + QUESTION_COUNTS.VALUE_DETAILS}
          onNext={handleAnswerNext}
          onPrevious={currentQuestionIndex > 0 ? handleAnswerPrevious : undefined}
          initialValue={currentAnswer?.value}
        />
      )}

      {/* ステップ3: 価値選択 */}
      {step === 'valueSelection' && (
        <ValueSelectionForm
          onNext={handleValueSelectionNext}
          onPrevious={goToPreviousStep}
        />
      )}

      {/* ステップ4: 価値詳細入力 */}
      {step === 'valueDetails' && selectedValues.length > 0 && (
        <ValueDetailsForm
          valueItems={selectedValues}
          onNext={handleValueDetailsNext}
          onBack={goToPreviousStep}
        />
      )}

      {/* エラー表示 */}
      {apiError && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 p-6">
              <h3 className="text-2xl font-bold text-white flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                エラーが発生しました
              </h3>
            </div>
            <div className="p-8 text-center">
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">{apiError}</p>
              <button
                onClick={resetToStart}
                className="px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                最初からやり直す
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ステップ5: 診断結果表示 */}
      {step === 'result' && (
        <DiagnosisResult
          result={result}
          loading={isDiagnosisRunning}
          onNext={goToFuturePrediction}
        />
      )}

      {/* ステップ6: 将来予測 */}
      {step === 'futurePrediction' && (
        <FuturePrediction
          predictions={futurePredictions}
          loading={isFuturePredictionRunning}
          onComplete={handleDiagnosisComplete}
        />
      )}
    </DiagnosisLayout>
  );
}