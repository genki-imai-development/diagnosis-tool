import { useState } from 'react';
import { Answer, DiagnosisStep, DiagnosisResult, ValueItem, SelectedValueItem, FuturePrediction } from '@/types/diagnosis';
import { runPersonalityDiagnosis, runFuturePrediction } from '@/lib/api';

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
  const [futurePredictions, setFuturePredictions] = useState<FuturePrediction[] | null>(null);
  
  // === ローディング・エラー状態 ===
  const [isDiagnosisRunning, setIsDiagnosisRunning] = useState(false); // 診断実行中
  const [isFuturePredictionRunning, setIsFuturePredictionRunning] = useState(false); // 未来予測実行中
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
   * ・「診断を開始する」ボタン押下時
   */
  const startDiagnosis = () => {
    setStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedValues([]);
    setValueDetails([]);
    setIsDiagnosisRunning(false);
    setIsFuturePredictionRunning(false);
    setApiError(null);
    setResult(null);
  };

  /**
   * 基本質問（前半5問）の回答を処理し、次のステップに進む
   * ・「　次の質問へ」ボタン押下時
   */
  const handleAnswerNext = (answer: Answer) => {
    // 回答を格納（既存の回答があれば上書き）
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
   * 価値選択を完了し、価値詳細ステップに進む
   * ・「選択を確定」ボタン押下時
   */
  const handleValueSelectionNext = (values: ValueItem[]) => {
    setSelectedValues(values);
    setStep('valueDetails');
  };

  /**
   * 価値詳細を完了し、API呼び出しを実行する
   * ・「診断を実行」ボタン押下時
   */
  const handleValueDetailsNext = async (details: SelectedValueItem[]) => {
    setValueDetails(details);

    try {
      setIsDiagnosisRunning(true);
      setApiError(null);

      if (!answers.length) {
        throw new Error('回答データが不足しています');
      }
      const diagnosisResult = await runPersonalityDiagnosis(answers);
      setResult(diagnosisResult);
      setStep('result');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '診断の実行に失敗しました';
      setApiError(errorMessage);
    } finally {
      setIsDiagnosisRunning(false);
    }
  };

  /**
   * 診断結果から将来予測ステップに進み、API呼び出しを実行する
   * ・「未来予想を見る」ボタン押下時
   */
  const goToFuturePrediction = async () => {
    setStep('futurePrediction');

    try {
      setIsFuturePredictionRunning(true);
      setApiError(null);

      if (!result || !valueDetails.length) {
        throw new Error('診断結果または価値詳細データが不足しています');
      }
      const predictionResult = await runFuturePrediction(valueDetails, result);
      setFuturePredictions(predictionResult.predictions);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未来予測の生成に失敗しました';
      setApiError(errorMessage);
    } finally {
      setIsFuturePredictionRunning(false);
    }
  };

  /**
   * 診断を完全にリセットして最初の画面に戻る
   * ・「診断を終了して最初に戻る」ボタン押下時
   */
  const resetToStart = () => {
    setStep('start');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedValues([]);
    setValueDetails([]);
    setIsDiagnosisRunning(false);
    setIsFuturePredictionRunning(false);
    setApiError(null);
    setResult(null);
    setFuturePredictions(null);
  };

  /**
   * 前のステップに戻る（価値選択から基本質問など）
   * ・「前の質問に戻る」ボタン押下時
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

  /**
   * 前の質問に戻る
   * ・「前の質問に戻る」ボタン押下時
   */
  const handleAnswerPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
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
    futurePredictions,
    isDiagnosisRunning,
    isFuturePredictionRunning,
    apiError,
    totalQuestionsCount,
    QUESTION_COUNTS,
    
    // アクション
    startDiagnosis,
    resetToStart,
    handleAnswerNext,
    handleAnswerPrevious,
    handleValueSelectionNext,
    handleValueDetailsNext,
    goToFuturePrediction,
    goToPreviousStep,
  };
}; 