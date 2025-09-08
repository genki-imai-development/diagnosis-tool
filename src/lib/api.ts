import type { Answer, DiagnosisResult, SelectedValueItem, FuturePrediction } from '@/types/diagnosis';

// 共通定数
export const API_CONFIG = {
  OPENAI_MODEL: 'gpt-4o-mini',
  RESPONSE_FORMAT: { type: 'json_object' as const },
  TIMEOUT: 60000, // 30秒
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
): Promise<Record<string, unknown>> {
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
  } catch {
    console.error('Failed to parse AI JSON:', content);
    throw new Error('AI応答の解析に失敗しました');
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