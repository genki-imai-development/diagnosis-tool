'use client';

import React, { useState } from 'react';
import { DiagnosisLayout } from '@/components/layout/DiagnosisLayout';
import { DiagnosisStart } from '@/components/DiagnosisStart';
import { QuestionForm } from '@/components/forms/QuestionForm';
import { useQuestions } from '@/hooks/useApi';
import { Answer, DiagnosisStep } from '@/types/diagnosis';

export default function HomePage() {
  // 質問データ
  const { questions } = useQuestions();
  // 開始画面 or 質問回答画面 判別用
  const [step, setStep] = useState<DiagnosisStep>('start');
  // 表示中の質問番号 ボタン表示を制御
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // 回答データ
  const [answers, setAnswers] = useState<Answer[]>([]);

  // 診断開始処理
  const handleDiagnosisStart = () => {
    setStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  // 次の質問へ or 診断を実行ボタン押下時
  const handleAnswerNext = (answer: Answer) => {
    setAnswers(prev => {
      const newAnswers = [...prev];

      // 既に回答がある場合は上書き、ない場合は追加
      const existingIndex = newAnswers.findIndex(a => a.questionId === answer.questionId);
      if (existingIndex >= 0) {
        newAnswers[existingIndex] = answer;
      } else {
        newAnswers.push(answer);
      }

      return newAnswers;
    });

    // 最後の質問かチェック
    if (currentQuestionIndex < questions.length - 1) {
      // 次の質問表示
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // 最後の質問の場合 → 診断実行ボタン表示（TODO 次回実装）
      console.log('全ての質問完了。回答データ:', [...answers, answer]);
      alert('質問回答フロー完了！\n診断実行ボタンが表示されました。\n\nコンソールを確認してください。');
    }
  };

  // 前の質問に戻る処理
  const handleAnswerPrevious = () => {
    // TODO 質問を保存
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
        </div>
      )}
    </DiagnosisLayout>
  );
}