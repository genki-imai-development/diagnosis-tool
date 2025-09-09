import { DiagnosisPattern, PersonalityScores, Answer, SelectedValueItem, FuturePrediction } from '@/types/diagnosis';
import { APP_CONFIG, DIAGNOSIS_QUESTIONS } from '@/lib/constants';

// マジックナンバーを定数化
export const SIMILARITY_SCORES = {
  PERFECT_MATCH: 10,    // 完全一致
  GOOD_MATCH: 5,        // 1差: 良いマッチ
  NEUTRAL: 0,           // 2差: ニュートラル
  NEGATIVE: -5,         // 3差: マイナス評価
  POOR: -10,            // 4差: 大きなマイナス評価
  WORST: -15,           // 5差以上: 最大マイナス評価
} as const;

export const VALIDATION_CONSTRAINTS = {
  MIN_ANSWER_LENGTH: 10,
  MIN_SCORE: 1,
  MAX_SCORE: 5,
  REQUIRED_VALUE_DETAILS_COUNT: 3,
} as const;

// 診断結果パターンの定義
export const DIAGNOSIS_PATTERNS: DiagnosisPattern[] = [
  {
    id: "salaryman",
    name: "空を飛びたいサラリーマン",
    description: "会社では真面目に働くけど、心の中ではいつも夢を見ている人。みんなから信頼されて、新しいアイデアもたくさん思いつく。",
    scores: { creativity: 4, extraversion: 2, agreeableness: 4, emotionality: 3, conscientiousness: 4 },
    image: "/images/patterns/salaryman.png"
  },
  {
    id: "firefighter",
    name: "注目されたい消防員",
    description: "人を助ける仕事をしているけど、実はみんなに「すごいね！」って言われたい人。感情豊かで、目立つのが大好き。",
    scores: { creativity: 3, extraversion: 4, agreeableness: 2, emotionality: 4, conscientiousness: 3 },
    image: "/images/patterns/firefighter.png"
  },
  {
    id: "revolutionary",
    name: "革命を起こしたい事務員",
    description: "普通の事務仕事をしているけど、「世界を変えたい」と思っている人。冷静で、みんなと協力するのが上手。",
    scores: { creativity: 4, extraversion: 2, agreeableness: 4, emotionality: 2, conscientiousness: 4 },
    image: "/images/patterns/revolutionary.png"
  },
  {
    id: "rapper",
    name: "真面目なラッパー",
    description: "音楽で自分を表現するのは得意だけど、一人で黙々と練習するタイプ。人前に出るのは平気だけど、群れるのは苦手。",
    scores: { creativity: 4, extraversion: 4, agreeableness: 2, emotionality: 2, conscientiousness: 4 },
    image: "/images/patterns/rapper.png"
  },
  {
    id: "mc",
    name: "人前が苦手なMC",
    description: "表現力があって創造性豊かだけど、実は人前に出るのが恥ずかしい人。感情表現が上手で、とても繊細。",
    scores: { creativity: 4, extraversion: 2, agreeableness: 2, emotionality: 4, conscientiousness: 3 },
    image: "/images/patterns/mc.png"
  },
  {
    id: "teamleader",
    name: "一人になりたいチームリーダー",
    description: "チームをまとめるのが得意で、みんなの気持ちもよくわかる。でも時々、一人の時間がほしくなる優しい人。",
    scores: { creativity: 3, extraversion: 4, agreeableness: 4, emotionality: 4, conscientiousness: 3 },
    image: "/images/patterns/teamleader.png"
  },
  {
    id: "teacher",
    name: "暴れたい茶道の先生",
    description: "伝統的なお茶の作法を教えているけど、本当は自由に動き回りたい人。感情の変化が激しくて、じっとしているのが苦手。",
    scores: { creativity: 2, extraversion: 2, agreeableness: 2, emotionality: 4, conscientiousness: 4 },
    image: "/images/patterns/teacher.png"
  },
  {
    id: "pharmacist",
    name: "スリルを求める薬剤師",
    description: "薬の仕事では責任感が強くて真面目だけど、プライベートではドキドキする体験が大好きな人。新しいことにチャレンジするのが好き。",
    scores: { creativity: 4, extraversion: 4, agreeableness: 3, emotionality: 3, conscientiousness: 4 },
    image: "/images/patterns/pharmacist.png"
  },
  {
    id: "archaeologist",
    name: "孤独を嫌う考古学者",
    description: "一人で研究する仕事だけど、実はみんなでワイワイするのが一番好きな人。人とのつながりをとても大切にしている。",
    scores: { creativity: 3, extraversion: 2, agreeableness: 4, emotionality: 4, conscientiousness: 2 },
    image: "/images/patterns/archaeologist.png"
  },
  {
    id: "comedian",
    name: "完璧主義な笑い芸人",
    description: "人を笑わせるのは得意だけど、自分には厳しくて「もっと上手くなりたい」といつも思っている人。真面目で努力家。",
    scores: { creativity: 2, extraversion: 4, agreeableness: 3, emotionality: 2, conscientiousness: 2 },
    image: "/images/patterns/comedian.png"
  }
];

// 高精度マッチング関数
export function selectPatternFromScores(userScores: PersonalityScores): DiagnosisPattern {
  let bestMatch = DIAGNOSIS_PATTERNS[0];
  let bestSimilarity = -Infinity;
  
  for (const pattern of DIAGNOSIS_PATTERNS) {
    const similarity = calculateSimilarity(userScores, pattern.scores);
    
    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestMatch = pattern;
    }
  }
  
  return bestMatch;
}

// 類似度計算関数（高精度版）
export function calculateSimilarity(userScores: PersonalityScores, patternScores: PersonalityScores): number {
  let totalSimilarity = 0;
  
  for (const trait of APP_CONFIG.PERSONALITY_TRAITS) {
    const difference = Math.abs(userScores[trait] - patternScores[trait]);
    
    // 差分に基づくスコアリング
    let traitSimilarity: number;
    switch (difference) {
      case 0:
        traitSimilarity = SIMILARITY_SCORES.PERFECT_MATCH;
        break;
      case 1:
        traitSimilarity = SIMILARITY_SCORES.GOOD_MATCH;
        break;
      case 2:
        traitSimilarity = SIMILARITY_SCORES.NEUTRAL;
        break;
      case 3:
        traitSimilarity = SIMILARITY_SCORES.NEGATIVE;
        break;
      case 4:
        traitSimilarity = SIMILARITY_SCORES.POOR;
        break;
      default:
        traitSimilarity = SIMILARITY_SCORES.WORST;
    }
    
    totalSimilarity += traitSimilarity;
  }
  
  return totalSimilarity;
}

// バリデーション関数群
export function validateAnswers(answers: Answer[]): string | null {
  if (!Array.isArray(answers)) {
    return 'answersは必須です';
  }

  if (answers.length === 0) {
    return 'answersが空です';
  }

  // 回答が空でないことをチェック
  const emptyAnswer = answers.find((a) => !a.text?.trim());
  if (emptyAnswer) {
    return '全ての質問に回答してください';
  }

  return null;
}

export function validatePersonalityScores(scores: PersonalityScores): boolean {
  return APP_CONFIG.PERSONALITY_TRAITS.every(trait => {
    const score = scores[trait];
    return typeof score === 'number' && 
           Number.isFinite(score) && 
           score >= VALIDATION_CONSTRAINTS.MIN_SCORE && 
           score <= VALIDATION_CONSTRAINTS.MAX_SCORE;
  });
}

// 回答テキストを整形する関数
export function formatAnswersText(answers: Answer[]): string {
  return answers
    .map((a) => {
      // 選択した選択肢のテキストを使用
      const answerText = a.text.trim();
      const question = DIAGNOSIS_QUESTIONS.find(q => q.id === a.questionId);
      const questionText = question?.text || `質問${a.questionId}`;
      return `${questionText}\n回答: ${answerText}`;
    })
    .join('\n\n');
}

// 将来予測バリデーション関数群
export function validateValueDetails(valueDetails: SelectedValueItem[]): string | null {
  if (!valueDetails || !Array.isArray(valueDetails)) {
    return '価値詳細情報が必要です';
  }

  if (valueDetails.length !== VALIDATION_CONSTRAINTS.REQUIRED_VALUE_DETAILS_COUNT) {
    return `価値詳細は${VALIDATION_CONSTRAINTS.REQUIRED_VALUE_DETAILS_COUNT}項目である必要があります`;
  }

  const incompleteDetail = valueDetails.find(
    (detail) => !detail.currentStatus?.trim() || !detail.idealFuture?.trim()
  );
  if (incompleteDetail) {
    return '全ての価値項目の現状と理想の未来が必要です';
  }

  return null;
}

export function validateFuturePredictions(predictions: FuturePrediction[]): string | null {
  if (!predictions || !Array.isArray(predictions)) {
    return '予測結果の形式が不正です';
  }

  if (predictions.length !== VALIDATION_CONSTRAINTS.REQUIRED_VALUE_DETAILS_COUNT) {
    return `${VALIDATION_CONSTRAINTS.REQUIRED_VALUE_DETAILS_COUNT}つの価値項目の予測が必要です`;
  }

  for (const prediction of predictions) {
    if (
      !prediction.valueId || 
      !prediction.valueName || 
      !prediction.gapAnalysis || 
      !prediction.gapLevel ||
      !['大', '中', '小'].includes(prediction.gapLevel) ||
      !prediction.detailedRoadmap
    ) {
      return '予測情報が不完全です';
    }
  }

  return null;
} 