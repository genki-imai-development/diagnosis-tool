import { NextRequest, NextResponse } from 'next/server';
import { DiagnosisResult, Answer } from '@/types/diagnosis';
import { callOpenAiApi, createErrorResponse, checkApiAccess } from '@/lib/api';
import { PERSONALITY_DIAGNOSIS_SYSTEM_PROMPT, createPersonalityDiagnosisUserPrompt } from '@/lib/prompts';
import {
  calculateBigFiveFromAnswers,
  getBigFiveScoreLevels,
  selectPatternFromBigFive,
  validateAnswers,
  formatAnswersText
} from '@/lib/diagnosis';
import { checkRateLimit, createRateLimitResponse, addRateLimitHeaders } from '@/lib/rateLimit';

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
    const { answers } = (await req.json()) as { answers?: Answer[] };

    // undefinedチェック
    if (!answers) {
      return createErrorResponse('validation_failed', 'answersは必須です', 400);
    }

    const validationError = validateAnswers(answers);
    if (validationError) {
      return createErrorResponse('validation_failed', validationError, 400);
    }

    // YES/NO回答から直接ビッグファイブスコアを計算
    const scores = calculateBigFiveFromAnswers(answers);
    const scoreLevels = getBigFiveScoreLevels(answers);

    // スコアレベルからパターンを選択
    const selectedPattern = selectPatternFromBigFive(scoreLevels);

    // ユーザーの回答を整形してAI用プロンプトを作成
    const userAnswersText = formatAnswersText(answers);
    
    // 診断パターンの詳細情報を整形
    const patternScoresText = `創造性: ${selectedPattern.scores.creativity}, 外向性: ${selectedPattern.scores.extraversion}, 協調性: ${selectedPattern.scores.agreeableness}, 情動性: ${selectedPattern.scores.emotionality}, 勤勉性: ${selectedPattern.scores.conscientiousness}`;
    
    const userPrompt = createPersonalityDiagnosisUserPrompt(
      userAnswersText,
      selectedPattern.name,
      selectedPattern.description,
      selectedPattern.keywords,
      selectedPattern.keywords_summary,
      patternScoresText
    );

    // AI で特性と強みを生成
    let aiResult: { strengths: string; motivation: string; goodEnvironment: string; badEnvironment: string };
    try {
      aiResult = await callOpenAiApi(PERSONALITY_DIAGNOSIS_SYSTEM_PROMPT, userPrompt, 0.7) as { strengths: string; motivation: string; goodEnvironment: string; badEnvironment: string };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'AI診断内容生成に失敗しました';
      
      if (errorMessage.includes('利用制限')) {
        return createErrorResponse('rate_limit', errorMessage, 429);
      }
      
      return createErrorResponse('openai_error', errorMessage, 502);
    }

    // AI結果の検証
    if (!aiResult.strengths || !aiResult.motivation || !aiResult.goodEnvironment || !aiResult.badEnvironment) {
      return createErrorResponse('validation_failed', '診断内容が不完全です', 502);
    }

    // 最終的な診断結果を構築
    const finalResult: DiagnosisResult = {
      scores,
      pattern: selectedPattern,
      strengths: aiResult.strengths,
      motivation: aiResult.motivation,
      goodEnvironment: aiResult.goodEnvironment,
      badEnvironment: aiResult.badEnvironment
    };

    const response = NextResponse.json(finalResult);
    return addRateLimitHeaders(response, remaining, resetTime);
    
  } catch (error) {
    console.error('Internal server error:', error);
    return createErrorResponse('internal_error', 'サーバー内部エラーが発生しました', 500);
  }
} 