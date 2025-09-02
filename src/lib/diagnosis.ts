import { DiagnosisPattern, PersonalityScores, Answer } from '@/types/diagnosis';
import { APP_CONFIG } from '@/lib/constants';

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
  MIN_ANSWER_LENGTH: 15,
  MIN_SCORE: 1,
  MAX_SCORE: 5,
  REQUIRED_VALUE_DETAILS_COUNT: 3,
} as const;

// 診断結果パターンの定義
export const DIAGNOSIS_PATTERNS: DiagnosisPattern[] = [
  {
    id: "salaryman",
    name: "空を飛びたいサラリーマン",
    description: "創造性が高く、現実的な環境にいながらも理想を追い求める。協調性と勤勉性に優れ、組織内で信頼される存在。",
    scores: { creativity: 4, extraversion: 2, agreeableness: 4, emotionality: 3, conscientiousness: 4 },
    image: "/images/patterns/salaryman.png"
  },
  {
    id: "firefighter",
    name: "注目されたい消防員",
    description: "外向性が高く、人々の注目を集めることを好む。情動性も高く、感情豊かでドラマチックな行動を取る傾向。",
    scores: { creativity: 3, extraversion: 4, agreeableness: 2, emotionality: 4, conscientiousness: 3 },
    image: "/images/patterns/firefighter.png"
  },
  {
    id: "revolutionary",
    name: "革命を起こしたい事務員",
    description: "創造性が高く、現状打破を目指す。協調性も高く、人々をまとめて変革を起こそうとする。情動性は低く冷静。",
    scores: { creativity: 4, extraversion: 2, agreeableness: 4, emotionality: 2, conscientiousness: 4 },
    image: "/images/patterns/revolutionary.png"
  },
  {
    id: "rapper",
    name: "真面目なラッパー",
    description: "創造性と外向性が高く、表現力豊か。協調性は低く、独自のスタイルを貫く。勤勉性が高く、技術向上に励む。",
    scores: { creativity: 4, extraversion: 4, agreeableness: 2, emotionality: 2, conscientiousness: 4 },
    image: "/images/patterns/rapper.png"
  },
  {
    id: "mc",
    name: "人前が苦手なMC",
    description: "創造性が高く、表現力に優れる。外向性は低く、人前での活動は苦手。情動性が高く、感情表現が豊か。",
    scores: { creativity: 4, extraversion: 2, agreeableness: 2, emotionality: 4, conscientiousness: 3 },
    image: "/images/patterns/mc.png"
  },
  {
    id: "teamleader",
    name: "一人になりたいチームリーダー",
    description: "外向性と協調性が高く、チームをまとめる能力に長ける。情動性も高く、メンバーの感情に敏感。",
    scores: { creativity: 3, extraversion: 4, agreeableness: 4, emotionality: 4, conscientiousness: 3 },
    image: "/images/patterns/teamleader.png"
  },
  {
    id: "teacher",
    name: "暴れたい茶道の先生",
    description: "創造性は低く、伝統を重んじる。外向性も低く、内向的。情動性が高く、感情の起伏が激しい。",
    scores: { creativity: 2, extraversion: 2, agreeableness: 2, emotionality: 4, conscientiousness: 4 },
    image: "/images/patterns/teacher.png"
  },
  {
    id: "pharmacist",
    name: "スリルを求める薬剤師",
    description: "創造性と外向性が高く、新しい体験を求める。勤勉性が高く、責任感が強い。",
    scores: { creativity: 4, extraversion: 4, agreeableness: 3, emotionality: 3, conscientiousness: 4 },
    image: "/images/patterns/pharmacist.png"
  },
  {
    id: "archaeologist",
    name: "孤独を嫌う考古学者",
    description: "創造性は中程度で、研究に情熱を注ぐ。外向性は低いが、協調性が高く、チームワークを重視。",
    scores: { creativity: 3, extraversion: 2, agreeableness: 4, emotionality: 4, conscientiousness: 2 },
    image: "/images/patterns/archaeologist.png"
  },
  {
    id: "comedian",
    name: "完璧主義な笑い芸人",
    description: "創造性は低く、既存のパターンを重視。外向性が高く、人を楽しませることが好き。完璧主義で自己要求が厳しい。",
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

  const tooShort = answers.find((a) => (a.text?.trim().length ?? 0) < VALIDATION_CONSTRAINTS.MIN_ANSWER_LENGTH);
  if (tooShort) {
    return `各回答は${VALIDATION_CONSTRAINTS.MIN_ANSWER_LENGTH}文字以上が必要です`;
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
    .map((a) => `Q${a.questionId}: ${a.text.trim()}`)
    .join('\n');
}

// 将来予測バリデーション関数群
export function validateValueDetails(valueDetails: any[]): string | null {
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

export function validateFuturePredictions(predictions: any[]): string | null {
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
      !prediction.realisticPrediction || 
      !prediction.idealPrediction ||
      typeof prediction.idealRealizationProbability !== 'number' ||
      prediction.idealRealizationProbability < 0 ||
      prediction.idealRealizationProbability > 100 ||
      !prediction.onePointAdvice
    ) {
      return '予測情報が不完全です';
    }
  }

  return null;
} 