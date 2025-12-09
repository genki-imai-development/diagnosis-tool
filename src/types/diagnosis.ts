// 質問の選択肢型定義
export interface QuestionOption {
  id: string;
  text: string;
}

// ビッグファイブのカテゴリ型
export type BigFiveCategory = 'extraversion' | 'agreeableness' | 'conscientiousness' | 'neuroticism' | 'openness';

// 質問の型定義
export interface Question {
  id: number;
  text: string;
  category: BigFiveCategory; // ビッグファイブのカテゴリを追加
  options?: QuestionOption[]; // YES/NO形式では不要だが、後方互換性のためoptionalに
  order: number;
}

// 回答の型定義
export interface Answer {
  questionId: number;
  value: boolean; // YES/NO形式のためboolean値
  text?: string; // 表示用テキスト（オプション）
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
  satisfaction: number; // 現状の満足度（0-100）
  satisfactionPoints: string; // 満足している点
  dissatisfactionPoints: string; // 不満や課題を感じている点
  idealState: string; // どんな状態になれば100点満点か
  obstacles: string; // 理想に近づくときの障害や不安
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

// 相性情報の型定義
export interface Compatibility {
  id: string;
  name: string;
}

// 診断パターンの型定義
export interface DiagnosisPattern {
  id: string;
  name: string;
  description: string;
  scores: PersonalityScores;
  image: string; // 画像ファイルのパス
  keywords: string; // カンマ区切りの3つのキーワード
  short_description: string; // 50文字以下の短い紹介文
  keywords_summary: string; // 3つのキーワード全体の総評
  bestCompatibility?: Compatibility; // 最高の相性
  worstCompatibility?: Compatibility; // 最悪の相性
}

// 診断結果の型定義
export interface DiagnosisResult {
  scores: PersonalityScores;
  pattern: DiagnosisPattern;
  /** あなたの強み（才能） */
  strengths: string;
  /** あなたのやる気スイッチ（原動力） */
  motivation: string;
  /** マッチする環境（最も輝く環境） */
  goodEnvironment: string;
  /** マッチしない環境（輝かない環境） */
  badEnvironment: string;
}

// 未来予測の型定義
export interface FuturePrediction {
  valueId: string;
  valueName: string;
  /** あなたが描く「最高の未来」 */
  bestFuture: string;
  /** ギャップレベル（0-100の数値） */
  gapLevel: number;
  /** あなたを止めている障壁（励ましの言葉） */
  barriers: string;
  /** ロードマップ（現状もの） */
  roadmap: string;
}