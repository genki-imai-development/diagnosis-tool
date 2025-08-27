'use client';

import React, { useState } from 'react';
import { DiagnosisLayout } from '@/components/layout/DiagnosisLayout';
import { DiagnosisStart } from '@/components/DiagnosisStart';
import { QuestionForm } from '@/components/forms/QuestionForm';
import { ValueSelectionForm } from '@/components/forms/ValueSelectionForm';
import { ValueDetailsForm } from '@/components/forms/ValueDetailsForm';
import { useQuestions } from '@/hooks/useApi';
import { Answer, DiagnosisStep, DiagnosisResult, ValueItem, SelectedValueItem } from '@/types/diagnosis';
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
  // 選択された価値項目
  const [selectedValues, setSelectedValues] = useState<ValueItem[]>([]);
  // 価値項目の詳細回答
  const [valueDetails, setValueDetails] = useState<SelectedValueItem[]>([]);
  // 診断実行ローディング制御用
  const [isRunning, setIsRunning] = useState(false);
  // 診断実行エラー
  const [apiError, setApiError] = useState<string | null>(null);
  // 診断結果データ
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  // 基本質問数（5問）
  const baseQuestionsCount = 5;
  // 価値選択（1問）
  const valueSelectionCount = 1;
  // 価値詳細（3項目 × 2質問 = 6問）
  const valueDetailsCount = 6;
  // 総質問数
  const totalQuestionsCount = baseQuestionsCount + valueSelectionCount + valueDetailsCount;

  // 診断開始処理
  const handleDiagnosisStart = () => {
    setStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedValues([]);
    setValueDetails([]);
    setIsRunning(false);
    setApiError(null);
    setResult(null);
  };

  // 基本質問の次の質問へ or 価値選択へ
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

    // 最後の基本質問かチェック
    if (currentQuestionIndex < baseQuestionsCount - 1) {
      // 次の質問表示
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 基本質問完了 → 価値選択へ
      setStep('valueSelection');
    }
  };

  // 価値選択完了 → 価値詳細へ
  const handleValueSelectionNext = (values: ValueItem[]) => {
    setSelectedValues(values);
    setStep('valueDetails');
  };

  // 価値詳細完了 → 診断実行
  const handleValueDetailsNext = (details: SelectedValueItem[]) => {
    setValueDetails(details);
    
    // 診断を実行
    (async () => {
      try {
        setIsRunning(true);
        setApiError(null);
        
        // 基本質問の回答のみを診断APIに送信
        // 価値詳細の回答は別途管理（将来的に診断ロジックに組み込む場合の拡張性を考慮）
        const res = await runPersonalityDiagnosis(answers);
        setResult(res);
        setStep('result');
      } catch (e: any) {
        setApiError(e?.message || '診断に失敗しました');
      } finally {
        setIsRunning(false);
      }
    })();
  };

  // 前の質問に戻る処理
  const handleAnswerPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  // 価値選択から基本質問に戻る
  const handleValueSelectionPrevious = () => {
    setStep('questions');
    setCurrentQuestionIndex(baseQuestionsCount - 1);
  };

  // 価値詳細から価値選択に戻る
  const handleValueDetailsPrevious = () => {
    setStep('valueSelection');
  };

  // 現在の質問を取得
  const currentQuestion = questions[currentQuestionIndex];
  // 現在の回答を取得
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);

  return (
    <DiagnosisLayout>
      {/* 開始画面 */}
      {step === 'start' && (
        <DiagnosisStart onStart={handleDiagnosisStart} />
      )}

      {/* 基本質問回答画面 */}
      {step === 'questions' && currentQuestion && (
        <div className="animate-fade-in">
          <QuestionForm
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={totalQuestionsCount}
            onNext={handleAnswerNext}
            onPrevious={currentQuestionIndex > 0 ? handleAnswerPrevious : undefined}
            initialValue={currentAnswer?.text || ''}
            isLastQuestion={false}
          />
        </div>
      )}

      {/* 価値選択画面 */}
      {step === 'valueSelection' && (
        <div className="animate-fade-in">
          <ValueSelectionForm
            onNext={handleValueSelectionNext}
            onPrevious={handleValueSelectionPrevious}
            currentIndex={baseQuestionsCount}
            totalQuestions={totalQuestionsCount}
          />
        </div>
      )}

      {/* 価値詳細質問画面 */}
      {step === 'valueDetails' && selectedValues.length > 0 && (
        <div className="animate-fade-in">
          <ValueDetailsForm
            selectedValues={selectedValues}
            onNext={handleValueDetailsNext}
            onPrevious={handleValueDetailsPrevious}
            currentIndex={baseQuestionsCount + valueSelectionCount}
            totalQuestions={totalQuestionsCount}
            initialValues={valueDetails}
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