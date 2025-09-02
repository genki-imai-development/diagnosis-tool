import { useState } from 'react';
import { Answer, DiagnosisStep, DiagnosisResult, ValueItem, SelectedValueItem } from '@/types/diagnosis';
import { runPersonalityDiagnosis } from '@/lib/api';

/**
 * 診断フロー全体の状態管理を行うカスタムフック
 * メインコンポーネントの複雑さを軽減し、状態管理を分離
 */
export const useDiagnosis = () => {
  // === 基本的な状態 ===
  const [step, setStep] = useState<DiagnosisStep>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // === データ保存用の状態 ===
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedValues, setSelectedValues] = useState<ValueItem[]>([]);
  const [valueDetails, setValueDetails] = useState<SelectedValueItem[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  
  // === ローディング・エラー状態 ===
  const [isRunning, setIsRunning] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // === 定数（設定値） ===
  const QUESTION_COUNTS = {
    BASE_QUESTIONS: 5,        // 基本質問数
    VALUE_SELECTION: 1,       // 価値選択
    VALUE_DETAILS: 6,         // 価値詳細（3項目 × 2質問）
  } as const;

  const totalQuestionsCount = 
    QUESTION_COUNTS.BASE_QUESTIONS + 
    QUESTION_COUNTS.VALUE_SELECTION + 
    QUESTION_COUNTS.VALUE_DETAILS;

  // === アクション関数 ===
  
  /**
   * 診断を最初から開始する
   */
  const startDiagnosis = () => {
    setStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedValues([]);
    setValueDetails([]);
    setIsRunning(false);
    setApiError(null);
    setResult(null);
  };

  /**
   * 基本質問の回答を処理し、次のステップに進む
   */
  const handleAnswerNext = (answer: Answer) => {
    // 回答を更新（既存の回答があれば上書き）
    const updatedAnswers = [...answers];
    const existingIndex = updatedAnswers.findIndex(a => a.questionId === answer.questionId);
    
    if (existingIndex >= 0) {
      updatedAnswers[existingIndex] = answer;
    } else {
      updatedAnswers.push(answer);
    }
    setAnswers(updatedAnswers);

    // 次のステップを決定
    if (currentQuestionIndex < QUESTION_COUNTS.BASE_QUESTIONS - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('valueSelection');
    }
  };

  /**
   * 前の質問に戻る
   */
  const handleAnswerPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  /**
   * 価値選択を完了し、価値詳細ステップに進む
   */
  const handleValueSelectionNext = (values: ValueItem[]) => {
    setSelectedValues(values);
    setStep('valueDetails');
  };

  /**
   * 価値詳細を完了し、AI診断を実行する
   */
  const handleValueDetailsNext = async (details: SelectedValueItem[]) => {
    setValueDetails(details);
    
    try {
      setIsRunning(true);
      setApiError(null);
      
      const diagnosisResult = await runPersonalityDiagnosis(answers);
      setResult(diagnosisResult);
      setStep('result');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '診断の実行に失敗しました';
      setApiError(errorMessage);
    } finally {
      setIsRunning(false);
    }
  };

  /**
   * 診断結果から将来予測ステップに進む
   */
  const goToFuturePrediction = () => {
    setStep('futurePrediction');
  };

  /**
   * 将来予測完了後の処理
   */
  const handleFuturePredictionComplete = () => {
    // 必要に応じて追加の処理を実装
    console.log('将来予測が完了しました');
  };

  /**
   * 前のステップに戻る（価値選択から基本質問など）
   */
  const goToPreviousStep = () => {
    switch (step) {
      case 'valueSelection':
        setStep('questions');
        setCurrentQuestionIndex(QUESTION_COUNTS.BASE_QUESTIONS - 1);
        break;
      case 'valueDetails':
        setStep('valueSelection');
        break;
      default:
        // その他のステップでは戻る処理なし
        break;
    }
  };

  // === 戻り値 ===
  return {
    // 状態
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
    
    // アクション
    startDiagnosis,
    handleAnswerNext,
    handleAnswerPrevious,
    handleValueSelectionNext,
    handleValueDetailsNext,
    goToFuturePrediction,
    handleFuturePredictionComplete,
    goToPreviousStep,
  };
}; 