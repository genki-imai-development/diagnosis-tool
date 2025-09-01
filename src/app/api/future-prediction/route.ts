import { NextResponse } from 'next/server';
import { FuturePrediction, SelectedValueItem, DiagnosisResult } from '@/types/diagnosis';

export async function POST(req: Request) {
  try {
    // リクエストボディをパース
    const { valueDetails, diagnosisResult } = (await req.json()) as { 
      valueDetails: SelectedValueItem[];
      diagnosisResult: DiagnosisResult;
    };

    // バリデーション
    if (!valueDetails || !Array.isArray(valueDetails)) {
      return NextResponse.json(
        { error: 'validation_failed', message: '価値詳細情報が必要です' },
        { status: 400 }
      );
    }

    if (!diagnosisResult) {
      return NextResponse.json(
        { error: 'validation_failed', message: '性格診断結果が必要です' },
        { status: 400 }
      );
    }

    if (valueDetails.length !== 3) {
      return NextResponse.json(
        { error: 'validation_failed', message: '価値詳細は3項目である必要があります' },
        { status: 400 }
      );
    }

    // 各価値詳細の内容チェック
    const incompleteDetail = valueDetails.find(
      (detail) => !detail.currentStatus?.trim() || !detail.idealFuture?.trim()
    );
    if (incompleteDetail) {
      return NextResponse.json(
        { error: 'validation_failed', message: '全ての価値項目の現状と理想の未来が必要です' },
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

    // 性格診断結果の整形
    const personalityInfo = `
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

    // 価値詳細情報の整形
    const valueDetailsText = valueDetails
      .map((detail, index) => `
【価値項目${index + 1}: ${detail.name}】
現状: ${detail.currentStatus}
理想の未来: ${detail.idealFuture}
`)
      .join('\n');

    // AIプロンプト構築
    const systemPrompt = `あなたは人生設計の専門家です。ユーザーの性格診断結果と価値観の詳細情報を基に、以下4つの要素を予測してください：

1. 実現可能性の高い未来（realisticPrediction）：性格特性を考慮した現状の延長線上での3年後
2. 理想の未来（idealPrediction）：ユーザーが描いた3年後の100点満点の理想を基にした未来
3. 理想の未来の実現可能性（idealRealizationProbability）：性格特性を考慮して現状から3年後に理想の未来を実現できる可能性を0-100%で評価
4. ワンポイントアドバイス（onePointAdvice）：理想の未来を実現するための具体的で実行可能なアドバイス

重要なポイント：
- 実現可能性の高い未来：性格特性（創造性、外向性、協調性、情動性、勤勉性のスコア）を考慮し、その人の性格に基づいた現実的な成長や変化を想定
- 理想の未来：ユーザーの「理想の未来」の記述をより具体的に発展させた素晴らしい内容
- 実現可能性の評価：性格特性、現状と理想のギャップ、必要な努力量、外的制約、時間的制約などを総合的に考慮
- ワンポイントアドバイス：性格特性を活かした具体的で実行可能なアクション、今日からでも始められる小さな一歩を提案
- 性格スコアが低い特性については、それに関連する変化は困難であることを反映
- 性格スコアが高い特性については、それを活かした成長の可能性を考慮
- 各価値項目について独立して予測を行う

出力は以下の厳密なJSONのみで返してください。余分な文字は含めないでください。

{
  "predictions": [
    {
      "valueId": "価値項目のID",
      "valueName": "価値項目の名前",
      "realisticPrediction": "実現可能性の高い3年後の未来を200-250文字で具体的に描写",
      "idealPrediction": "理想の3年後の未来を200-250文字で具体的に描写",
      "idealRealizationProbability": 25,
      "onePointAdvice": "理想の未来を実現するための具体的で実行可能なワンポイントアドバイスを100-150文字で提案"
    }
  ]
}`;

    const userPrompt = `以下の性格診断結果と価値観の詳細情報を基に、3つの価値項目それぞれについて「実現可能性の高い未来」「理想の未来」「理想の実現可能性」「ワンポイントアドバイス」を予測してください：

${personalityInfo}

${valueDetailsText}

各価値項目について：
1. 実現可能性の高い未来：性格特性を考慮した現状の延長線上での3年後の状況（性格的な制約や傾向を反映）
2. 理想の未来：ユーザーの「理想の未来」の記述を具体化し、さらに発展させた3年後の素晴らしい姿
3. 理想の実現可能性：性格特性、現状と理想のギャップ、必要な努力量、時間的制約、外的要因などを総合的に考慮して0-100%で評価
4. ワンポイントアドバイス：性格特性を活かした具体的で実行可能なアクション、今日からでも始められる小さな一歩を提案

性格スコアと特性情報を活用して、その人の性格に基づいた現実的な予測を行ってください。実現可能性の高い未来には、性格特性が自然に反映された内容にしてください。`;

    const payload = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
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
      
      if (resp.status === 429) {
        return NextResponse.json(
          { error: 'rate_limit', message: 'APIの利用制限に達しました。しばらく時間をおいて再試行してください。' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: 'openai_error', message: '未来予測の生成に失敗しました' },
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
    let result: { predictions: FuturePrediction[] } | null = null;
    try {
      result = JSON.parse(content) as { predictions: FuturePrediction[] };
    } catch (e) {
      console.error('Failed to parse AI JSON:', content);
      return NextResponse.json(
        { error: 'parse_error', message: 'AI応答の解析に失敗しました' },
        { status: 502 }
      );
    }

    // 結果の検証
    if (!result?.predictions || !Array.isArray(result.predictions)) {
      return NextResponse.json(
        { error: 'validation_failed', message: '予測結果の形式が不正です' },
        { status: 502 }
      );
    }

    if (result.predictions.length !== 3) {
      return NextResponse.json(
        { error: 'validation_failed', message: '3つの価値項目の予測が必要です' },
        { status: 502 }
      );
    }

    // 各予測の検証
    for (const prediction of result.predictions) {
      if (
        !prediction.valueId || 
        !prediction.valueName || 
        !prediction.realisticPrediction || 
        !prediction.idealPrediction ||
        typeof prediction.idealRealizationProbability !== 'number' ||
        prediction.idealRealizationProbability < 0 ||
        prediction.idealRealizationProbability > 100 ||
        !prediction.onePointAdvice
      ) {
        return NextResponse.json(
          { error: 'validation_failed', message: '予測情報が不完全です' },
          { status: 502 }
        );
      }
    }

    // 予測結果を返却
    return NextResponse.json(result);
    
  } catch (e) {
    console.error('Internal server error:', e);
    return NextResponse.json(
      { error: 'internal_error', message: 'サーバー内部エラーが発生しました' },
      { status: 500 }
    );
  }
} 