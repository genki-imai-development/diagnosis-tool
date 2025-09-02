'use client';

import React from 'react';
import { DiagnosisLayout } from '@/components/layout/DiagnosisLayout';
import { DiagnosisStart } from '@/components/DiagnosisStart';
import { QuestionForm } from '@/components/forms/QuestionForm';
import { ValueSelectionForm } from '@/components/forms/ValueSelectionForm';
import { ValueDetailsForm } from '@/components/forms/ValueDetailsForm';
import { FuturePrediction } from '@/components/FuturePrediction';
import { RadarChart } from '@/components/ui/RadarChart';
import { useQuestions } from '@/hooks/useApi';
import { useDiagnosis } from '@/hooks/useDiagnosis';

/**
 * メインページコンポーネント
 * 診断フロー全体を管理し、各ステップのコンポーネントを表示
 */
export default function HomePage() {
  // 質問データを取得
  const { questions } = useQuestions();
  
  // 診断フローの状態とアクションを取得
  const {
    // 現在の状態
    step,
    currentQuestionIndex,
    answers,
    selectedValues,
    valueDetails,
    result,
    isRunning,
    apiError,
    totalQuestionsCount,
    QUESTION_COUNTS,
    
    // アクション関数
    startDiagnosis,
    handleAnswerNext,
    handleAnswerPrevious,
    handleValueSelectionNext,
    handleValueDetailsNext,
    goToFuturePrediction,
    handleFuturePredictionComplete,
    goToPreviousStep,
  } = useDiagnosis();

  // 現在の質問を取得
  const currentQuestion = questions[currentQuestionIndex];
  
  // 現在の回答を取得（編集時の初期値として使用）
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  return (
    <DiagnosisLayout>
      {/* ステップ1: 診断開始画面 */}
      {step === 'start' && (
        <div className="animate-fade-in">
          <DiagnosisStart onStart={startDiagnosis} />
        </div>
      )}

      {/* ステップ2: 基本質問（5問） */}
      {step === 'questions' && currentQuestion && (
        <div className="animate-fade-in">
          <QuestionForm
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={QUESTION_COUNTS.BASE_QUESTIONS}
            onNext={handleAnswerNext}
            onPrevious={currentQuestionIndex > 0 ? handleAnswerPrevious : undefined}
            initialValue={currentAnswer?.text || ''}
            isLastQuestion={currentQuestionIndex === QUESTION_COUNTS.BASE_QUESTIONS - 1}
          />
        </div>
      )}

      {/* ステップ3: 価値選択 */}
      {step === 'valueSelection' && (
        <div className="animate-fade-in">
          <ValueSelectionForm
            onNext={handleValueSelectionNext}
            onPrevious={goToPreviousStep}
            currentIndex={QUESTION_COUNTS.BASE_QUESTIONS}
            totalQuestions={totalQuestionsCount}
          />
        </div>
      )}

      {/* ステップ4: 価値詳細入力 */}
      {step === 'valueDetails' && selectedValues.length > 0 && (
        <div className="animate-fade-in">
          <ValueDetailsForm
            selectedValues={selectedValues}
            onNext={handleValueDetailsNext}
            onPrevious={goToPreviousStep}
            currentIndex={QUESTION_COUNTS.BASE_QUESTIONS + QUESTION_COUNTS.VALUE_SELECTION}
            totalQuestions={totalQuestionsCount}
            initialValues={valueDetails}
          />
        </div>
      )}

      {/* ローディング画面（AI診断実行中） */}
      {isRunning && (
        <div className="animate-fade-in">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              AIが診断を実行中です...
            </h2>
            <p className="text-gray-600">
              あなたの回答を分析し、性格傾向を診断しています
            </p>
          </div>
        </div>
      )}

      {/* エラー表示 */}
      {apiError && (
        <div className="animate-fade-in">
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-red-900 mb-2">
                エラーが発生しました
              </h2>
              <p className="text-red-700 mb-4">{apiError}</p>
              <button
                onClick={startDiagnosis}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                最初からやり直す
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ステップ5: 診断結果表示 */}
      {step === 'result' && result && (
        <div className="animate-fade-in">
          <div className="space-y-8">
            {/* 結果ヘッダー */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                診断結果
              </h1>
              <p className="text-lg text-gray-600">
                あなたの性格傾向が分析されました
              </p>
            </div>

            {/* 性格パターン表示 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                あなたのタイプ
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-2">
                  {result.pattern.name}
                </h3>
                <p className="text-gray-700">
                  {result.pattern.description}
                </p>
              </div>
            </div>

            {/* レーダーチャート */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                性格特性のバランス
              </h2>
              <RadarChart scores={result.scores} />
            </div>

            {/* 詳細特性 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                あなたの特性
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {result.characteristics}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">
                    活かされる環境・仕事
                  </h3>
                  <p className="text-green-800 text-sm">
                    {result.suitableEnvironments}
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h3 className="font-semibold text-yellow-900 mb-2">
                    注意が必要な環境・仕事
                  </h3>
                  <p className="text-yellow-800 text-sm">
                    {result.unsuitableEnvironments}
                  </p>
                </div>
              </div>
            </div>

            {/* 次のステップボタン */}
            <div className="text-center">
              <button
                onClick={goToFuturePrediction}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                未来予測を見る →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ステップ6: 将来予測 */}
      {step === 'futurePrediction' && result && valueDetails.length > 0 && (
        <div className="animate-fade-in">
          <FuturePrediction
            valueDetails={valueDetails}
            diagnosisResult={result}
            onComplete={handleFuturePredictionComplete}
          />
        </div>
      )}
    </DiagnosisLayout>
  );
}