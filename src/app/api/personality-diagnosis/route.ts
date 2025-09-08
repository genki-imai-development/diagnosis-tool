import { NextRequest, NextResponse } from 'next/server';
import { DiagnosisResult, Answer } from '@/types/diagnosis';
import { callOpenAiApi, createErrorResponse } from '@/lib/api';
import { PERSONALITY_DIAGNOSIS_SYSTEM_PROMPT, createPersonalityDiagnosisUserPrompt } from '@/lib/prompts';
import {
  selectPatternFromScores,
  validateAnswers,
  validatePersonalityScores,
  formatAnswersText
} from '@/lib/diagnosis';
import { checkRateLimit, createRateLimitResponse, addRateLimitHeaders } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    // レート制限チェック
    const { isAllowed, remaining, resetTime } = checkRateLimit(req);
    if (!isAllowed) {
      return createRateLimitResponse(remaining, resetTime);
    }

    // リクエストボディの解析とバリデーション
    const { answers } = (await req.json()) as { answers?: Answer[] };

    // undefinedチェック
    if (!answers) {
      return createErrorResponse('validation_failed', 'answersは必須です', 400);
    }

    const validationError = validateAnswers(answers);
    if (validationError) {
      return createErrorResponse('validation_failed', validationError, 400);
    }

    // ユーザーの回答を整形
    const userText = formatAnswersText(answers);
    const userPrompt = createPersonalityDiagnosisUserPrompt(userText);

    // AI診断実行
    let aiResult: DiagnosisResult;
    try {
      aiResult = await callOpenAiApi(PERSONALITY_DIAGNOSIS_SYSTEM_PROMPT, userPrompt, 0.3);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'AI診断の実行に失敗しました';
      
      if (errorMessage.includes('利用制限')) {
        return createErrorResponse('rate_limit', errorMessage, 429);
      }
      
      return createErrorResponse('openai_error', errorMessage, 502);
    }

    // AI結果の検証
    if (!aiResult.scores || !validatePersonalityScores(aiResult.scores)) {
      return createErrorResponse('validation_failed', 'スコア形式が不正です', 502);
    }

    if (!aiResult.characteristics || !aiResult.strengths) {
      return createErrorResponse('validation_failed', '特性情報が不完全です', 502);
    }

    // スコアからパターンを選択
    const selectedPattern = selectPatternFromScores(aiResult.scores);

    // 最終的な診断結果を構築
    const finalResult: DiagnosisResult = {
      scores: aiResult.scores,
      pattern: selectedPattern,
      characteristics: aiResult.characteristics,
      strengths: aiResult.strengths
    };

    const response = NextResponse.json(finalResult);
    return addRateLimitHeaders(response, remaining, resetTime);
    
  } catch (error) {
    console.error('Internal server error:', error);
    return createErrorResponse('internal_error', 'サーバー内部エラーが発生しました', 500);
  }
} 