// 質問の選択肢型定義
export interface QuestionOption {
  id: string;
  text: string;
}

// 質問の型定義
export interface Question {
  id: number;
  text: string;
  options: QuestionOption[]; // 選択肢（必須）
  order: number;
}

// 回答の型定義
export interface Answer {
  questionId: number;
  text: string; // 選択した選択肢のテキスト
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
export type DiagnosisStep = 
  | 'start' 
  | 'questions' 
  | 'valueSelection' 
  | 'valueDetails' 
  | 'result' 
  | 'futurePrediction';

// 5特性スコアの型定義
export interface PersonalityScores {
  /** 創造性 (1-5) */
  creativity: number;
  /** 外向性 (1-5) */
  extraversion: number;
  /** 協調性 (1-5) */
  agreeableness: number;
  /** 情動性 (1-5) */
  emotionality: number;
  /** 勤勉性 (1-5) */
  conscientiousness: number;
}

// 診断パターンの型定義
export interface DiagnosisPattern {
  id: string;
  name: string;
  description: string;
  scores: PersonalityScores;
  image: string; // 画像ファイルのパス
}

// 診断結果の型定義
export interface DiagnosisResult {
  scores: PersonalityScores;
  pattern: DiagnosisPattern;
  /** あなたの特性 */
  characteristics: string;
  /** 特性が活かされる環境・仕事 */
  suitableEnvironments: string;
  /** 特性が活かされない環境・仕事 */
  unsuitableEnvironments: string;
}

// 未来予測の型定義
export interface FuturePrediction {
  valueId: string;
  valueName: string;
  /** 実現可能性の高い未来 */
  realisticPrediction: string;
  /** 理想の未来 */
  idealPrediction: string;
  /** 理想の未来の実現可能性（0-100%） */
  idealRealizationProbability: number;
  /** 理想の未来を実現するためのワンポイントアドバイス */
  onePointAdvice: string;
}