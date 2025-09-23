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
const BASE_QUESTIONS: Question[] = [
  // 外向性（Extraversion） - 質問1-4
  {
    id: 1,
    text: '初対面でも自分から話しかけるほうだ。',
    category: 'extraversion',
    order: 1
  },
  {
    id: 2,
    text: '飲み会や集まりでは、自然と会話の中心になりがちだ。',
    category: 'extraversion',
    order: 2
  },
  {
    id: 3,
    text: '休みの日は、家にいるより誰かと外で過ごすほうが楽しい。',
    category: 'extraversion',
    order: 3
  },
  {
    id: 4,
    text: '静かな時間よりも、ワイワイした雰囲気が好きだ。',
    category: 'extraversion',
    order: 4
  },
  // 協調性（Agreeableness） - 質問5-8
  {
    id: 5,
    text: '困っている人を見ると、つい手を貸したくなる。',
    category: 'agreeableness',
    order: 5
  },
  {
    id: 6,
    text: '友達や同僚の意見には、なるべく合わせるほうだ。',
    category: 'agreeableness',
    order: 6
  },
  {
    id: 7,
    text: '衝突を避けるためなら、自分の意見を引っ込めることがある。',
    category: 'agreeableness',
    order: 7
  },
  {
    id: 8,
    text: '人の気持ちを察して行動するのが得意だと思う。',
    category: 'agreeableness',
    order: 8
  },
  // 誠実性（Conscientiousness） - 質問9-12
  {
    id: 9,
    text: 'スケジュールや計画はきちんと守るタイプだ。',
    category: 'conscientiousness',
    order: 9
  },
  {
    id: 10,
    text: '机の上や部屋は、なるべく整理整頓していたい。',
    category: 'conscientiousness',
    order: 10
  },
  {
    id: 11,
    text: '締め切り前に焦らないように、早めに取りかかる。',
    category: 'conscientiousness',
    order: 11
  },
  {
    id: 12,
    text: '「まあいっか」よりも「ちゃんとしなきゃ」が口ぐせに近い。',
    category: 'conscientiousness',
    order: 12
  },
  // 神経症傾向（Neuroticism） - 質問13-16
  {
    id: 13,
    text: 'ちょっとしたことで不安になりやすい。',
    category: 'neuroticism',
    order: 13
  },
  {
    id: 14,
    text: '失敗すると、なかなか気持ちを切り替えられない。',
    category: 'neuroticism',
    order: 14
  },
  {
    id: 15,
    text: '他の人は気にしないことでも、自分はクヨクヨ考えてしまう。',
    category: 'neuroticism',
    order: 15
  },
  {
    id: 16,
    text: '寝る前に、つい今日のことを反省してしまうことが多い。',
    category: 'neuroticism',
    order: 16
  },
  // 開放性（Openness） - 質問17-20
  {
    id: 17,
    text: '新しい趣味や遊びには、まず試してみようと思う。',
    category: 'openness',
    order: 17
  },
  {
    id: 18,
    text: '子どもの頃から「なんで？」と考えるのが好きだった。',
    category: 'openness',
    order: 18
  },
  {
    id: 19,
    text: '想像をふくらませて妄想するのがけっこう楽しい。',
    category: 'openness',
    order: 19
  },
  {
    id: 20,
    text: '流行よりも「自分なりの面白さ」を大事にしたい。',
    category: 'openness',
    order: 20
  }
];

// 固定シードを使った簡易的なシャッフル関数
function shuffleWithSeed<T>(array: T[], seed: number): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let randomIndex;

  // シードベースの疑似乱数生成
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  while (currentIndex !== 0) {
    randomIndex = Math.floor(random() * currentIndex);
    currentIndex--;

    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex], shuffled[currentIndex]
    ];
  }

  return shuffled;
}

// 固定順序でシャッフルされた質問配列（シード値12345を使用）
export const DIAGNOSIS_QUESTIONS: Question[] = shuffleWithSeed(BASE_QUESTIONS, 12345);

// デバッグ・開発用設定
export const DEV_CONFIG = {
  ENABLE_CONSOLE_LOGS: process.env.NODE_ENV === 'development',
  API_TIMEOUT: 30000, // 30秒
} as const; 