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

// 価値選択項目の型定義
export interface ValueItem {
  id: string;
  name: string;
  description: string;
}

// 詳細回答の型定義
export interface SelectedValueItem {
  id: string;
  name: string;
  currentStatus: string;
  idealFuture: string;
}

// 診断ステップの型定義
export type DiagnosisStep = 'start' | 'questions' | 'valueSelection' | 'valueDetails' | 'result';

// 5特性スコアの型定義
export interface PersonalityScores {
  creativity: number; // 創造性 (1-5)
  extraversion: number; // 外向性 (1-5)
  agreeableness: number; // 協調性 (1-5)
  emotionality: number; // 情動性 (1-5)
  conscientiousness: number; // 勤勉性 (1-5)
}

// 診断パターンの型定義
export interface DiagnosisPattern {
  id: string;
  name: string;
  description: string;
  combination: string; // 5特性スコアの組み合わせ
}

export interface DiagnosisResult {
  scores: PersonalityScores;
  pattern: DiagnosisPattern;
  characteristics: string;  // あなたの特性
  suitableEnvironments: string; // 特性が活かされる環境・仕事
  unsuitableEnvironments: string; // 特性が活かされない環境・仕事
}