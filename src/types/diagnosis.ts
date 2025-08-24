// 質問の型定義
export interface Question {
  id: number;
  text: string;
  placeholder?: string;
  minLength: number;
  order: number;
}

// 回答の型定義
export interface Answer {
  questionId: number;
  text: string;
}
