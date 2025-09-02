import type { Question, Answer, DiagnosisResult, SelectedValueItem, FuturePrediction } from '@/types/diagnosis';

// 共通定数
export const API_CONFIG = {
  OPENAI_MODEL: 'gpt-4o-mini',
  RESPONSE_FORMAT: { type: 'json_object' as const },
  TIMEOUT: 30000, // 30秒
} as const;

// 共通エラーレスポンス型
export interface ApiErrorResponse {
  error: string;
  message: string;
}

/**
 * OpenAI APIの共通呼び出し関数
 * @param systemPrompt システムプロンプト
 * @param userPrompt ユーザープロンプト  
 * @param temperature 生成の創造性（0-1）
 * @returns AI応答のJSONオブジェクト
 */
export async function callOpenAiApi(
  systemPrompt: string,
  userPrompt: string,
  temperature: number = 0.3
): Promise<any> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEYが未設定です');
  }

  const payload = {
    model: API_CONFIG.OPENAI_MODEL,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature,
    response_format: API_CONFIG.RESPONSE_FORMAT,
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('OpenAI API error:', response.status, errorBody);
    
    if (response.status === 429) {
      throw new Error('APIの利用制限に達しました。しばらく時間をおいて再試行してください。');
    }
    
    throw new Error('AI処理の実行に失敗しました');
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('AIの応答が空です');
  }

  try {
    return JSON.parse(content);
  } catch (e) {
    console.error('Failed to parse AI JSON:', content);
    throw new Error('AI応答の解析に失敗しました');
  }
}

/**
 * API実行前のバリデーション（共通化）
 */
export function validateApiKey(): void {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEYが未設定です');
  }
}

/**
 * エラーレスポンスの作成（API Routes用）
 */
export function createErrorResponse(
  error: string,
  message: string,
  status: number
): Response {
  return new Response(
    JSON.stringify({ error, message }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

// === 質問データの管理 ===

const questions: Question[] = [
  {
    id: 1,
    text: '初めて入ったレストランで、メニューに知らない料理がたくさんあります。あなたはどうしますか？',
    placeholder: '例：店員さんにおすすめを聞いて、説明してもらってから決めます。新しい味に出会えるのが楽しみです。',
    minLength: 15,
    order: 1
  },
  {
    id: 2,
    text: '親しい友人の誕生日パーティーに招待されました。会場には知らない人もたくさんいます。あなたはパーティーでどう過ごしますか？',
    placeholder: '例：最初は友人と話していますが、だんだん新しい人にも話しかけて、みんなでゲームを提案したりします。',
    minLength: 15,
    order: 2
  },
  {
    id: 3,
    text: '満員電車で座っていると、近くに妊婦さんが立っています。でも他にも疲れた様子の人がいます。あなたはどうしますか？',
    placeholder: '例：迷わず妊婦さんに声をかけて席を譲ります。他の人のことも気になりますが、まず一番必要な人を優先します。',
    minLength: 15,
    order: 3
  },
  {
    id: 4,
    text: 'ずっと楽しみにしていたアーティストのコンサートが、当日の朝に急に中止になりました。あなたはどう感じ、どうしますか？',
    placeholder: '例：すごくガッカリして落ち込みますが、友達と連絡を取って代わりに映画を見に行くことにします。返金のことも確認します。',
    minLength: 15,
    order: 4
  },
  {
    id: 5,
    text: '新しい趣味（例：楽器、スポーツ、料理など）を始めたいと思います。あなたはどのように始めますか？',
    placeholder: '例：まずネットで情報を集めて、体験教室があるか調べます。計画を立ててから道具を揃えて、週2回は練習すると決めて始めます。',
    minLength: 15,
    order: 5
  }
];

/**
 * 診断用の質問データを取得
 * @returns 質問データの配列
 */
export const getQuestions = (): Question[] => {
  return questions;
};

// === API呼び出し関数 ===

/**
 * 性格診断API呼び出し関数
 * @param answers ユーザーの回答配列
 * @returns 診断結果
 */
export async function runPersonalityDiagnosis(answers: Answer[]): Promise<DiagnosisResult> {
  const res = await fetch('/api/personality-diagnosis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error?.message || '診断の実行に失敗しました');
  }

  return (await res.json()) as DiagnosisResult;
}

/**
 * 将来予測API呼び出し関数
 * @param valueDetails 価値詳細データ
 * @param diagnosisResult 性格診断結果
 * @returns 将来予測結果
 */
export async function runFuturePrediction(
  valueDetails: SelectedValueItem[],
  diagnosisResult: DiagnosisResult
): Promise<{ predictions: FuturePrediction[] }> {
  const response = await fetch('/api/future-prediction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      valueDetails,
      diagnosisResult,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '未来予測の生成に失敗しました');
  }

  return response.json();
}