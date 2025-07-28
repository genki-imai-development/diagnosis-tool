// 質問の型定義
export interface Question {
  id: number;
  text: string;
  order: number;
  category?: string;
}

// 回答の型定義
export interface Answer {
  questionId: number;
  text: string;
}

// 診断結果の型定義
export interface DiagnosisResult {
  pattern: string;
  scores: {
    勤勉性: number;
    外向性: number;
    協調性: number;
    情動性: number;
    創造性: number;
  };
  confidence?: number;
}

// API レスポンスの型定義
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
