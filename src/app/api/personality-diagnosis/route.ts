import { NextResponse } from 'next/server';
import { DiagnosisPattern, DiagnosisResult, Answer, PersonalityScores } from '@/types/diagnosis';

// 診断結果パターンの定義（数値ベース）
const PATTERNS: DiagnosisPattern[] = [
  {
    id: "salaryman",
    name: "空を飛びたいサラリーマン",
    description: "創造性が高く、現実的な環境にいながらも理想を追い求める。協調性と勤勉性に優れ、組織内で信頼される存在。",
    scores: { creativity: 4, extraversion: 2, agreeableness: 4, emotionality: 3, conscientiousness: 4 }
  },
  {
    id: "firefighter",
    name: "注目されたい消防員",
    description: "外向性が高く、人々の注目を集めることを好む。情動性も高く、感情豊かでドラマチックな行動を取る傾向。",
    scores: { creativity: 3, extraversion: 4, agreeableness: 2, emotionality: 4, conscientiousness: 3 }
  },
  {
    id: "revolutionary",
    name: "革命を起こしたい事務員",
    description: "創造性が高く、現状打破を目指す。協調性も高く、人々をまとめて変革を起こそうとする。情動性は低く冷静。",
    scores: { creativity: 4, extraversion: 2, agreeableness: 4, emotionality: 2, conscientiousness: 4 }
  },
  {
    id: "rapper",
    name: "真面目なラッパー",
    description: "創造性と外向性が高く、表現力豊か。協調性は低く、独自のスタイルを貫く。勤勉性が高く、技術向上に励む。",
    scores: { creativity: 4, extraversion: 4, agreeableness: 2, emotionality: 2, conscientiousness: 4 }
  },
  {
    id: "mc",
    name: "人前が苦手なMC",
    description: "創造性が高く、表現力に優れる。外向性は低く、人前での活動は苦手。情動性が高く、感情表現が豊か。",
    scores: { creativity: 4, extraversion: 2, agreeableness: 2, emotionality: 4, conscientiousness: 3 }
  },
  {
    id: "teamleader",
    name: "一人になりたいチームリーダー",
    description: "外向性と協調性が高く、チームをまとめる能力に長ける。情動性も高く、メンバーの感情に敏感。",
    scores: { creativity: 3, extraversion: 4, agreeableness: 4, emotionality: 4, conscientiousness: 3 }
  },
  {
    id: "teacher",
    name: "暴れたい茶道の先生",
    description: "創造性は低く、伝統を重んじる。外向性も低く、内向的。情動性が高く、感情の起伏が激しい。",
    scores: { creativity: 2, extraversion: 2, agreeableness: 2, emotionality: 4, conscientiousness: 4 }
  },
  {
    id: "pharmacist",
    name: "スリルを求める薬剤師",
    description: "創造性と外向性が高く、新しい体験を求める。勤勉性が高く、責任感が強い。",
    scores: { creativity: 4, extraversion: 4, agreeableness: 3, emotionality: 3, conscientiousness: 4 }
  },
  {
    id: "archaeologist",
    name: "孤独を嫌う考古学者",
    description: "創造性は中程度で、研究に情熱を注ぐ。外向性は低いが、協調性が高く、チームワークを重視。",
    scores: { creativity: 3, extraversion: 2, agreeableness: 4, emotionality: 4, conscientiousness: 2 }
  },
  {
    id: "comedian",
    name: "完璧主義な笑い芸人",
    description: "創造性は低く、既存のパターンを重視。外向性が高く、人を楽しませることが好き。完璧主義で自己要求が厳しい。",
    scores: { creativity: 2, extraversion: 4, agreeableness: 3, emotionality: 2, conscientiousness: 2 }
  }
];

// 高精度マッチング関数
function selectPatternFromScores(userScores: PersonalityScores): DiagnosisPattern {
  let bestMatch = PATTERNS[0];
  let bestSimilarity = -Infinity;
  
  for (const pattern of PATTERNS) {
    const similarity = calculateSimilarity(userScores, pattern.scores);
    
    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestMatch = pattern;
    }
  }
  
  return bestMatch;
}

// 類似度計算関数（高精度版）
function calculateSimilarity(userScores: PersonalityScores, patternScores: PersonalityScores): number {
  const traits = ['creativity', 'extraversion', 'agreeableness', 'emotionality', 'conscientiousness'] as const;
  let totalSimilarity = 0;
  
  for (const trait of traits) {
    const difference = Math.abs(userScores[trait] - patternScores[trait]);
    
    // 差分に基づくスコアリング
    let traitSimilarity: number;
    switch (difference) {
      case 0:
        traitSimilarity = 10;  // 完全一致: 最高スコア
        break;
      case 1:
        traitSimilarity = 5;   // 1差: 良いマッチ
        break;
      case 2:
        traitSimilarity = 0;   // 2差: ニュートラル
        break;
      case 3:
        traitSimilarity = -5;  // 3差: マイナス評価
        break;
      case 4:
        traitSimilarity = -10; // 4差: 大きなマイナス評価
        break;
      default:
        traitSimilarity = -15; // 5差以上: 最大マイナス評価
    }
    
    totalSimilarity += traitSimilarity;
  }
  
  return totalSimilarity;
}

export async function POST(req: Request) {
  try {
    // JSONボディをパース & answers配列を格納
    const { answers } = (await req.json()) as { answers?: Answer[] };

    // 存在チェック
    if (!Array.isArray(answers)) {
      return NextResponse.json(
        { error: 'validation_failed', message: 'answersは必須です' },
        { status: 400 }
      );
    }
    // 空配列チェック
    if (answers.length === 0) {
      return NextResponse.json(
        { error: 'validation_failed', message: 'answersが空です' },
        { status: 400 }
      );
    }
    // 各回答の文字数チェック（15文字以上）
    const tooShort = answers.find((a) => (a.text?.trim().length ?? 0) < 15);
    if (tooShort) {
      return NextResponse.json(
        { error: 'validation_failed', message: '各回答は15文字以上が必要です' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'config_error', message: 'OPENAI_API_KEYが未設定です' },
        { status: 500 }
      );
    }

    // ユーザーの回答を整形
    const userText = answers
      .map((a) => `Q${a.questionId}: ${a.text.trim()}`)
      .join('\n');

    // AI診断プロンプト構築
    const systemPrompt = `あなたは性格診断の専門家です。ユーザーの自由記述回答を分析し、以下の5つの性格特性をそれぞれ1-5の整数で採点してください。

【評価する性格特性】
1. 創造性（creativity）: 新しいアイデアや体験への開放度
2. 外向性（extraversion）: 社交性や刺激を求める傾向  
3. 協調性（agreeableness）: 他者との協調や共感性
4. 情動性（emotionality）: 感情の不安定さや敏感さ
5. 勤勉性（conscientiousness）: 責任感や自己統制力

【採点基準】
- 1点: 非常に低い
- 2点: 低い
- 3点: 普通
- 4点: 高い
- 5点: 非常に高い

ユーザーの回答を分析し、5特性のスコアを評価してください。

さらに、以下の追加情報も生成してください：
- あなたの特性: ユーザーの性格の特徴を簡潔に説明
- 特性が活かされる環境・仕事: その特性を発揮できる職場や仕事の種類
- 特性が活かされない環境・仕事: その特性が発揮しにくい職場や仕事の種類

出力は以下の厳密なJSONのみで返してください。余分な文字は含めないでください。

{
  "scores": {
    "creativity": 1,
    "extraversion": 1,
    "agreeableness": 1,
    "emotionality": 1,
    "conscientiousness": 1
  },
  "characteristics": "string",
  "suitableEnvironments": "string",
  "unsuitableEnvironments": "string"
}`;

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `以下がユーザーの回答です。分析して診断結果を返してください:\n\n${userText}` },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' as const },
    };

    // OpenAI API呼び出し
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const errorBody = await resp.text();
      console.error('OpenAI API error:', resp.status, errorBody);
      
      // レート制限やクォータ超過の場合は適切なエラーメッセージ
      if (resp.status === 429) {
        return NextResponse.json(
          { error: 'rate_limit', message: 'APIの利用制限に達しました。しばらく時間をおいて再試行してください。' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: 'openai_error', message: 'AI診断の実行に失敗しました' },
        { status: 502 }
      );
    }

    const data = await resp.json();
    const content = data?.choices?.[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: 'openai_empty', message: 'AIの応答が空です' },
        { status: 502 }
      );
    }

    // JSONとしてパース
    let result: DiagnosisResult | null = null;
    try {
      result = JSON.parse(content) as DiagnosisResult;
    } catch (e) {
      console.error('Failed to parse AI JSON:', content);
      return NextResponse.json(
        { error: 'parse_error', message: 'AI応答の解析に失敗しました' },
        { status: 502 }
      );
    }

    // 結果の検証
    const s = result?.scores;
    const validScore = (n: unknown) =>
      typeof n === 'number' && Number.isFinite(n) && n >= 1 && n <= 5;
    
    if (
      !s ||
      ![
        validScore(s.creativity),
        validScore(s.extraversion),
        validScore(s.agreeableness),
        validScore(s.emotionality),
        validScore(s.conscientiousness),
      ].every(Boolean)
    ) {
      return NextResponse.json(
        { error: 'validation_failed', message: 'スコア形式が不正です' },
        { status: 502 }
      );
    }

    // 追加フィールドの検証
    if (!result.characteristics || !result.suitableEnvironments || !result.unsuitableEnvironments) {
      return NextResponse.json(
        { error: 'validation_failed', message: '特性情報が不完全です' },
        { status: 502 }
      );
    }

    // スコアからパターンを選択
    const selectedPattern = selectPatternFromScores(s);

    // 最終的な診断結果を構築
    const finalResult: DiagnosisResult = {
      scores: s,
      pattern: selectedPattern,
      characteristics: result.characteristics,
      suitableEnvironments: result.suitableEnvironments,
      unsuitableEnvironments: result.unsuitableEnvironments
    };

    // 診断結果を返却
    return NextResponse.json(finalResult);
    
  } catch (e) {
    console.error('Internal server error:', e);
    return NextResponse.json(
      { error: 'internal_error', message: 'サーバー内部エラーが発生しました' },
      { status: 500 }
    );
  }
} 