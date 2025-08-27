'use client';

import React, { useState } from 'react';
import { DiagnosisLayout } from '@/components/layout/DiagnosisLayout';
import { DiagnosisStart } from '@/components/DiagnosisStart';
import { QuestionForm } from '@/components/forms/QuestionForm';
import { useQuestions } from '@/hooks/useApi';
import { Answer, DiagnosisStep, DiagnosisResult } from '@/types/diagnosis';
import { runPersonalityDiagnosis } from '@/lib/api';
import { RadarChart } from '@/components/ui/RadarChart';

export default function HomePage() {
  // 質問データ
  const { questions } = useQuestions();
  // 開始画面 or 質問回答画面 判別用
  const [step, setStep] = useState<DiagnosisStep>('start');
  // 表示中の質問番号 ボタン表示を制御
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 回答データ
  const [answers, setAnswers] = useState<Answer[]>([]);
  // 診断実行ローディング制御用
  const [isRunning, setIsRunning] = useState(false);
  // 診断実行エラー
  const [apiError, setApiError] = useState<string | null>(null);
  // 診断結果データ
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  // 診断開始処理
  const handleDiagnosisStart = () => {
    setStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsRunning(false);
    setApiError(null);
    setResult(null);
  };

  // 次の質問へ or 診断を実行ボタン押下時
  const handleAnswerNext = (answer: Answer) => {
    // 最新の回答リストに更新
    const updatedAnswers = (() => {
      const copied = [...answers];
      const existingIndex = copied.findIndex(a => a.questionId === answer.questionId);
      if (existingIndex >= 0) {
        copied[existingIndex] = answer;
      } else {
        copied.push(answer);
      }
      return copied;
    })();
    setAnswers(updatedAnswers);

    // 最後の質問かチェック
    if (currentQuestionIndex < questions.length - 1) {
      // 次の質問表示
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 最後の質問の場合 → 診断を実行
      (async () => {
        try {
          setIsRunning(true);
          setApiError(null);
          const res = await runPersonalityDiagnosis(updatedAnswers);
          setResult(res);
          setStep('result');
        } catch (e: any) {
          setApiError(e?.message || '診断に失敗しました');
        } finally {
          setIsRunning(false);
        }
      })();
    }
  };

  // 前の質問に戻る処理
  const handleAnswerPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // 現在の質問を取得
  const currentQuestion = questions[currentQuestionIndex];
  // 現在の回答を取得
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  // 最後の質問かどうか
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <DiagnosisLayout>
      {/* 開始画面 */}
      {step === 'start' && (
        <DiagnosisStart onStart={handleDiagnosisStart} />
      )}

      {/* 質問回答画面 */}
      {step === 'questions' && currentQuestion && (
        <div className="animate-fade-in">
          <QuestionForm
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onNext={handleAnswerNext}
            onPrevious={currentQuestionIndex > 0 ? handleAnswerPrevious : undefined}
            initialValue={currentAnswer?.text || ''}
            isLastQuestion={isLastQuestion}
          />

          {/* 診断実行ローディング */}
          {isRunning && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                <span className="text-blue-700">診断を実行中です...</span>
              </div>
            </div>
          )}
          {/* 診断実行エラー表示 */}
          {apiError && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{apiError}</p>
            </div>
          )}
        </div>
      )}

      {/* 結果表示画面 */}
      {step === 'result' && result && (
        <div className="space-y-6 animate-fade-in">
          {/* パターン情報 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">診断結果</h2>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">{result.pattern.name}</h3>
              <p className="text-gray-700 leading-relaxed">{result.pattern.description}</p>
            </div>
          </div>

          {/* 5特性スコア */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">5特性スコア</h3>
            <RadarChart scores={result.scores} />
          </div>

          {/* その他の特性情報 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">あなたの特性と適性</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">あなたの特性</h4>
                <p className="text-gray-700 leading-relaxed">{result.characteristics}</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-700 mb-2">特性が活かされる環境・仕事</h4>
                <p className="text-gray-700 leading-relaxed">{result.suitableEnvironments}</p>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">特性が活かされない環境・仕事</h4>
                <p className="text-gray-700 leading-relaxed">{result.unsuitableEnvironments}</p>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="flex justify-center">
            <button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              onClick={() => setStep('start')}
            >
              TOPに戻る
            </button>
          </div>
        </div>
      )}
    </DiagnosisLayout>
  );
}