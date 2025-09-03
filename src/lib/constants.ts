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
    text: '初めて入ったレストランで、メニューに知らない料理がたくさんあります。あなたはどうしますか？',
    placeholder: '例：店員さんにおすすめを聞いて、説明してもらってから決めます。新しい味に出会えるのが楽しみです。',
    minLength: 10,
    order: 1
  },
  {
    id: 2,
    text: '親しい友人の誕生日パーティーに招待されました。会場には知らない人もたくさんいます。あなたはパーティーでどう過ごしますか？',
    placeholder: '例：最初は友人と話していますが、だんだん新しい人にも話しかけて、みんなでゲームを提案したりします。',
    minLength: 10,
    order: 2
  },
  {
    id: 3,
    text: '満員電車で座っていると、近くに妊婦さんが立っています。でも他にも疲れた様子の人がいます。あなたはどうしますか？',
    placeholder: '例：迷わず妊婦さんに声をかけて席を譲ります。他の人のことも気になりますが、まず一番必要な人を優先します。',
    minLength: 10,
    order: 3
  },
  {
    id: 4,
    text: 'ずっと楽しみにしていたアーティストのコンサートが、当日の朝に急に中止になりました。あなたはどう感じ、どうしますか？',
    placeholder: '例：すごくガッカリして落ち込みますが、友達と連絡を取って代わりに映画を見に行くことにします。返金のことも確認します。',
    minLength: 10,
    order: 4
  },
  {
    id: 5,
    text: '新しい趣味（例：楽器、スポーツ、料理など）を始めたいと思います。あなたはどのように始めますか？',
    placeholder: '例：まずネットで情報を集めて、体験教室があるか調べます。計画を立ててから道具を揃えて、週2回は練習すると決めて始めます。',
    minLength: 10,
    order: 5
  }
];

// デバッグ・開発用設定
export const DEV_CONFIG = {
  ENABLE_CONSOLE_LOGS: process.env.NODE_ENV === 'development',
  API_TIMEOUT: 30000, // 30秒
} as const; 