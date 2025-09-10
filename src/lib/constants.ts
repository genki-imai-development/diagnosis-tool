import type { Question } from '@/types/diagnosis';

// アプリケーション全体で使用する定数

// UI関連の定数
export const UI_CONSTANTS = {
  // プログレス関連
  PROGRESS_ANIMATION_DURATION: 300, // ms
  
  // ボタンやカードのアニメーション
  HOVER_TRANSITION_DURATION: 'duration-200',
  
  // レスポンシブブレークポイント
  MAX_CONTENT_WIDTH: 'max-w-4xl',
  MAX_FORM_WIDTH: 'max-w-2xl',
  
  // カラーパレット
  PRIMARY_GRADIENT: 'from-blue-600 to-purple-600',
  SUCCESS_COLOR: 'green-500',
  WARNING_COLOR: 'yellow-500',
  ERROR_COLOR: 'red-500',
} as const;

// 外部リンク定数
export const EXTERNAL_LINKS = {
  LINE_OFFICIAL: 'https://line.me/R/ti/p/@example', // 実際のLINE公式アカウントURLに変更してください
  TWITTER: 'https://twitter.com/example',
  INSTAGRAM: 'https://instagram.com/example',
} as const;

// エラーメッセージの統一
export const ERROR_MESSAGES = {
  // 一般的なエラー
  UNKNOWN_ERROR: '予期しないエラーが発生しました',
  NETWORK_ERROR: 'ネットワークエラーが発生しました',
  SERVER_ERROR: 'サーバーエラーが発生しました',
  
  // バリデーションエラー
  REQUIRED_FIELD: 'この項目は必須です',
  INVALID_FORMAT: '入力形式が正しくありません',
  TEXT_TOO_SHORT: '文字数が不足しています',
  
  // API関連エラー
  API_KEY_MISSING: 'APIキーが設定されていません',
  RATE_LIMIT_EXCEEDED: 'APIの利用制限に達しました。しばらく時間をおいて再試行してください',
  AI_RESPONSE_EMPTY: 'AIからの応答が空です',
  AI_RESPONSE_PARSE_ERROR: 'AI応答の解析に失敗しました',
  
  // 診断関連エラー
  DIAGNOSIS_FAILED: '診断の実行に失敗しました',
  PREDICTION_FAILED: '未来予測の生成に失敗しました',
  INVALID_SCORES: 'スコア形式が不正です',
  INCOMPLETE_DATA: '必要な情報が不完全です',
} as const;

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  DIAGNOSIS_COMPLETED: '診断が完了しました',
  PREDICTION_COMPLETED: '未来予測が完了しました',
  DATA_SAVED: 'データが保存されました',
} as const;

// アプリケーション設定
export const APP_CONFIG = {
  APP_NAME: '性格診断・未来予測ツール',
  APP_DESCRIPTION: 'AIを使った性格診断と未来予測アプリケーション',
  
  // 診断関連設定
  PERSONALITY_TRAITS: [
    'creativity',
    'extraversion', 
    'agreeableness', 
    'emotionality', 
    'conscientiousness'
  ] as const,
  
  TRAIT_NAMES: {
    creativity: '創造性',
    extraversion: '外向性',
    agreeableness: '協調性',
    emotionality: '情動性',
    conscientiousness: '勤勉性',
  } as const,
} as const;

// 診断用質問データ
export const DIAGNOSIS_QUESTIONS: Question[] = [
  {
    id: 1,
    text: '新しい経験や挑戦に対するあなたの反応は？',
    options: [
      { id: 'challenge_1', text: 'いつも新しいことに積極的に挑戦したい' },
      { id: 'challenge_2', text: '興味があれば挑戦してみる' },
      { id: 'challenge_3', text: 'どちらとも言えない' },
      { id: 'challenge_4', text: '慣れ親しんだことを好む' },
      { id: 'challenge_5', text: '変化や新しいことは避けたい' }
    ],
    order: 1
  },
  {
    id: 2,
    text: '仕事や勉強での計画性について',
    options: [
      { id: 'planning_1', text: '詳細な計画を立てて、必ず守る' },
      { id: 'planning_2', text: 'ある程度計画を立てて実行する' },
      { id: 'planning_3', text: 'どちらとも言えない' },
      { id: 'planning_4', text: '計画は立てるが、よく変更する' },
      { id: 'planning_5', text: '計画を立てるのが苦手で、行き当たりばったり' }
    ],
    order: 2
  },
  {
    id: 3,
    text: 'パーティーや集まりでのあなたは？',
    options: [
      { id: 'social_1', text: '積極的に話しかけ、場を盛り上げる' },
      { id: 'social_2', text: '知っている人とは活発に話す' },
      { id: 'social_3', text: 'どちらとも言えない' },
      { id: 'social_4', text: '聞き役に回ることが多い' },
      { id: 'social_5', text: 'できるだけ静かな場所にいたい' }
    ],
    order: 3
  },
  {
    id: 4,
    text: '他人との意見の対立が起きた時',
    options: [
      { id: 'conflict_1', text: '相手の気持ちを最優先に考え、譲歩する' },
      { id: 'conflict_2', text: 'お互いの妥協点を見つけようとする' },
      { id: 'conflict_3', text: 'どちらとも言えない' },
      { id: 'conflict_4', text: '自分の意見をしっかりと主張する' },
      { id: 'conflict_5', text: '自分の考えを曲げることはない' }
    ],
    order: 4
  },
  {
    id: 5,
    text: 'ストレスを感じる状況での反応は？',
    options: [
      { id: 'stress_1', text: '冷静さを保ち、解決策を考える' },
      { id: 'stress_2', text: '少し緊張するが、なんとか対処する' },
      { id: 'stress_3', text: 'どちらとも言えない' },
      { id: 'stress_4', text: '不安になり、うまく対処できないことがある' },
      { id: 'stress_5', text: 'とても動揺し、パニックになりやすい' }
    ],
    order: 5
  }
];

// デバッグ・開発用設定
export const DEV_CONFIG = {
  ENABLE_CONSOLE_LOGS: process.env.NODE_ENV === 'development',
  API_TIMEOUT: 30000, // 30秒
} as const; 