import { NextRequest, NextResponse } from 'next/server';
import { FuturePrediction, SelectedValueItem, DiagnosisResult } from '@/types/diagnosis';
import { callOpenAiApi, createErrorResponse } from '@/lib/api';
import { FUTURE_PREDICTION_SYSTEM_PROMPT, createFuturePredictionUserPrompt } from '@/lib/prompts';
import { validateValueDetails, validateFuturePredictions } from '@/lib/diagnosis';
import { checkRateLimit, createRateLimitResponse, addRateLimitHeaders } from '@/lib/rateLimit';

// 性格診断結果を整形する関数
function formatPersonalityInfo(diagnosisResult: DiagnosisResult): string {
  return `
【性格診断結果】
パターン: ${diagnosisResult.pattern.name}
特徴: ${diagnosisResult.pattern.description}
あなたの特性: ${diagnosisResult.characteristics}

【性格スコア】
- 創造性: ${diagnosisResult.scores.creativity}/5
- 外向性: ${diagnosisResult.scores.extraversion}/5
- 協調性: ${diagnosisResult.scores.agreeableness}/5
- 情動性: ${diagnosisResult.scores.emotionality}/5
- 勤勉性: ${diagnosisResult.scores.conscientiousness}/5
`;
}

// 価値詳細情報を整形する関数
function formatValueDetailsText(valueDetails: SelectedValueItem[]): string {
  return valueDetails
    .map((detail, index) => `
【価値項目${index + 1}: ${detail.name}】
現状: ${detail.currentStatus}
理想の未来: ${detail.idealFuture}
`)
    .join('\n');
}

export async function POST(req: NextRequest) {
  try {
    // レート制限チェック
    const { isAllowed, remaining, resetTime } = checkRateLimit(req);
    if (!isAllowed) {
      return createRateLimitResponse(remaining, resetTime);
    }

    // リクエストボディの解析とバリデーション
    const { valueDetails, diagnosisResult } = (await req.json()) as { 
      valueDetails?: SelectedValueItem[];
      diagnosisResult?: DiagnosisResult;
    };

    // 基本バリデーション
    if (!valueDetails) {
      return createErrorResponse('validation_failed', '価値詳細情報が必要です', 400);
    }

    if (!diagnosisResult) {
      return createErrorResponse('validation_failed', '性格診断結果が必要です', 400);
    }

    // 価値詳細のバリデーション
    const valueValidationError = validateValueDetails(valueDetails);
    if (valueValidationError) {
      return createErrorResponse('validation_failed', valueValidationError, 400);
    }

    // データを整形
    const personalityInfo = formatPersonalityInfo(diagnosisResult);
    const valueDetailsText = formatValueDetailsText(valueDetails);
    const userPrompt = createFuturePredictionUserPrompt(personalityInfo, valueDetailsText);

    // AI予測実行
    let aiResult: { predictions: FuturePrediction[] };
    try {
      aiResult = await callOpenAiApi(FUTURE_PREDICTION_SYSTEM_PROMPT, userPrompt, 0.3);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未来予測の生成に失敗しました';
      
      if (errorMessage.includes('利用制限')) {
        return createErrorResponse('rate_limit', errorMessage, 429);
      }
      
      return createErrorResponse('openai_error', errorMessage, 502);
    }

    // AI結果の検証
    const validationError = validateFuturePredictions(aiResult.predictions);
    if (validationError) {
      return createErrorResponse('validation_failed', validationError, 502);
    }

    // 予測結果を返却
    const response = NextResponse.json(aiResult);
    return addRateLimitHeaders(response, remaining, resetTime);
    
  } catch (error) {
    console.error('Internal server error:', error);
    return createErrorResponse('internal_error', 'サーバー内部エラーが発生しました', 500);
  }
} 