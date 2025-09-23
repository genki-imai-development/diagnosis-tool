import { NextRequest, NextResponse } from 'next/server';
import { FuturePrediction, SelectedValueItem, DiagnosisResult } from '@/types/diagnosis';
import { callOpenAiApi, createErrorResponse, checkApiAccess } from '@/lib/api';
import { FUTURE_PREDICTION_SYSTEM_PROMPT, createFuturePredictionUserPrompt } from '@/lib/prompts';
import { validateValueDetails, validateFuturePredictions } from '@/lib/diagnosis';
import { checkRateLimit, createRateLimitResponse, addRateLimitHeaders } from '@/lib/rateLimit';

// オブジェクトをMarkdown形式に変換するヘルパー関数
function convertObjectToMarkdown(obj: any): string {
  if (typeof obj === 'string') return obj;
  
  try {
    // オブジェクトがロードマップ構造の場合の処理
    if (obj && typeof obj === 'object') {
      if (obj.shortTerm || obj.midTerm || obj.longTerm) {
        let markdown = '';
        
        if (obj.shortTerm) {
          markdown += '## 短期（1-3ヶ月）\n';
          markdown += typeof obj.shortTerm === 'string' ? obj.shortTerm + '\n\n' : JSON.stringify(obj.shortTerm) + '\n\n';
        }
        
        if (obj.midTerm) {
          markdown += '## 中期（3-12ヶ月）\n';
          markdown += typeof obj.midTerm === 'string' ? obj.midTerm + '\n\n' : JSON.stringify(obj.midTerm) + '\n\n';
        }
        
        if (obj.longTerm) {
          markdown += '## 長期（1年以上）\n';
          markdown += typeof obj.longTerm === 'string' ? obj.longTerm + '\n\n' : JSON.stringify(obj.longTerm) + '\n\n';
        }
        
        return markdown;
      }
    }
    
    // その他の場合はJSON文字列として返す
    return JSON.stringify(obj, null, 2);
  } catch (error) {
    return String(obj);
  }
}

// 性格診断結果を整形する関数
function formatPersonalityInfo(diagnosisResult: DiagnosisResult): string {
  return `
【性格診断結果】
パターン: ${diagnosisResult.pattern.name}
特徴: ${diagnosisResult.pattern.description}
あなたの強み: ${diagnosisResult.strengths}
やる気スイッチ: ${diagnosisResult.motivation}
マッチする環境: ${diagnosisResult.goodEnvironment}
マッチしない環境: ${diagnosisResult.badEnvironment}

【性格スコア】
- 創造性: ${diagnosisResult.scores.creativity}/5
- 外向性: ${diagnosisResult.scores.extraversion}/5
- 協調性: ${diagnosisResult.scores.agreeableness}/5
- 情動性: ${diagnosisResult.scores.emotionality}/5
- 勤勉性: ${diagnosisResult.scores.conscientiousness}/5
  `.trim();
}

// 価値詳細情報を整形する関数
function formatValueDetailsText(valueDetails: SelectedValueItem[]): string {
  return valueDetails
    .map((detail, index) => `
【価値項目${index + 1}: ${detail.name}】
満足度: ${detail.satisfaction}/100点
満足している点: ${detail.satisfactionPoints}
不満や課題: ${detail.dissatisfactionPoints}
理想の状態: ${detail.idealState}
障害や不安: ${detail.obstacles}
`)
    .join('\n');
}

export async function POST(req: NextRequest) {
  try {
    // アクセス制御チェック
    const { isAllowed, error } = checkApiAccess(req);
    if (!isAllowed && error) {
      return error;
    }

    // レート制限チェック
    const { isAllowed: rateLimitAllowed, remaining, resetTime } = checkRateLimit(req);
    if (!rateLimitAllowed) {
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
      aiResult = await callOpenAiApi(FUTURE_PREDICTION_SYSTEM_PROMPT, userPrompt, 0.3) as unknown as { predictions: FuturePrediction[] };
      console.log('=== AI RESULT DEBUG ===');
      console.log('Raw AI result:', JSON.stringify(aiResult, null, 2));
      console.log('Type of aiResult:', typeof aiResult);
      console.log('Has predictions property:', 'predictions' in aiResult);
      if (aiResult.predictions) {
        console.log('Predictions array length:', aiResult.predictions.length);
        console.log('First prediction:', JSON.stringify(aiResult.predictions[0], null, 2));
      }
      console.log('=== END DEBUG ===');

      // AIの結果を正規化（オブジェクトを文字列に変換）
      if (aiResult.predictions && Array.isArray(aiResult.predictions)) {
        const userSatisfaction = valueDetails[0]?.satisfaction || 0; // ユーザーが入力した満足度
        aiResult.predictions = aiResult.predictions.map(prediction => ({
          ...prediction,
          bestFuture: typeof prediction.bestFuture === 'string' 
            ? prediction.bestFuture 
            : JSON.stringify(prediction.bestFuture),
          gapLevel: userSatisfaction, // ユーザーが入力した満足度をそのまま使用
          barriers: typeof prediction.barriers === 'string' 
            ? prediction.barriers 
            : JSON.stringify(prediction.barriers),
          roadmap: typeof prediction.roadmap === 'string' 
            ? prediction.roadmap 
            : convertObjectToMarkdown(prediction.roadmap)
        }));
        console.log('Normalized predictions:', JSON.stringify(aiResult.predictions, null, 2));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未来予測の生成に失敗しました';
      
      if (errorMessage.includes('利用制限')) {
        return createErrorResponse('rate_limit', errorMessage, 429);
      }
      
      return createErrorResponse('openai_error', errorMessage, 502);
    }

    // AI結果の検証
    console.log('=== VALIDATION DEBUG ===');
    console.log('About to validate predictions:', aiResult.predictions);
    const validationError = validateFuturePredictions(aiResult.predictions);
    console.log('Validation result:', validationError);
    console.log('=== END VALIDATION DEBUG ===');
    
    if (validationError) {
      console.error('Validation failed with error:', validationError);
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