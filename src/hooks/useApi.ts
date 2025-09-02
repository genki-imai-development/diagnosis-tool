import { useState, useCallback } from 'react';

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