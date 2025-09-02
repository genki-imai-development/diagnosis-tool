import { useState, useCallback } from 'react';
import type { Question, Answer, DiagnosisResult, SelectedValueItem, FuturePrediction } from '@/types/diagnosis';
import { getQuestions, runPersonalityDiagnosis, runFuturePrediction } from '@/lib/api';

/**
 * 質問データを取得するフック
 * @returns 質問データ
 */
export const useQuestions = () => {
  const [questions] = useState<Question[]>(getQuestions());

  return {
    questions,
  };
};

/**
 * 汎用APIフック
 * ローディング状態、エラーハンドリング、データ管理を統一
 * @param apiFunction 実行するAPI関数
 * @returns API実行状態とデータ
 */
export const useApi = <T>(apiFunction: (...args: any[]) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * API関数を実行
   */
  const execute = useCallback(async (...args: any[]): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction(...args);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '予期しないエラーが発生しました';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  /**
   * 状態をリセット
   */
  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    /** APIから取得したデータ */
    data,
    /** ローディング状態 */
    loading,
    /** エラーメッセージ */
    error,
    /** API実行関数 */
    execute,
    /** 状態リセット関数 */
    reset,
  };
};

/**
 * 性格診断用フック
 * @returns 性格診断API実行用のフック
 */
export const usePersonalityDiagnosis = () => {
  return useApi<DiagnosisResult>(runPersonalityDiagnosis);
};

/**
 * 将来予測用フック
 * @returns 将来予測API実行用のフック
 */
export const useFuturePrediction = () => {
  return useApi<{ predictions: FuturePrediction[] }>(runFuturePrediction);
};