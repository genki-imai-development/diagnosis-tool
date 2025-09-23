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
  REQUIRED_VALUE_DETAILS_COUNT: 1,
} as const;

// 診断結果パターンの定義（32パターン）
export const DIAGNOSIS_PATTERNS: DiagnosisPattern[] = [
  {
    id: "explorer",
    name: "エクスプローラー",
    description: "好奇心で世界を駆ける冒険者",
    scores: { creativity: 5, extraversion: 5, agreeableness: 1, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/explorer.png",
    keywords: "冒険心,好奇心,自由",
    keywords_summary: "あなたは生まれながらの冒険家です。新しいことへの好奇心が止まらず、誰にも縛られない自由な発想で世界を探索します。未知の体験に積極的に飛び込み、制約を嫌って自分らしい道を切り開いていく、真の探検家タイプです。"
  },
  {
    id: "challenger",
    name: "チャレンジャー",
    description: "まっすぐ突き進む野生の戦士",
    scores: { creativity: 5, extraversion: 5, agreeableness: 1, emotionality: 5, conscientiousness: 5 },
    image: "/images/patterns/challenger.png",
    keywords: "挑戦,情熱,突破力",
    keywords_summary: "あなたは燃える情熱を持った挑戦者です。困難な目標にも恐れることなく立ち向かい、強い突破力で障害を乗り越えます。熱い想いを原動力に、不可能を可能に変える力を持った、真の戦士タイプです。"
  },
  {
    id: "builder",
    name: "ビルダー",
    description: "着実に積み上げる職人肌",
    scores: { creativity: 1, extraversion: 1, agreeableness: 5, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/builder.png",
    keywords: "継続力,職人気質,信頼",
    keywords_summary: "あなたは確実性を重視する職人です。長期間にわたって継続する力と、細部までこだわる職人気質で、周囲から厚い信頼を得ています。一歩一歩着実に積み上げながら、質の高い成果を生み出す、真の匠タイプです。"
  },
  {
    id: "dreamer",
    name: "ドリーマー",
    description: "マイペースに夢を追うロマンチスト",
    scores: { creativity: 5, extraversion: 1, agreeableness: 1, emotionality: 5, conscientiousness: 1 },
    image: "/images/patterns/dreamer.png",
    keywords: "想像力,感性,独創性",
    keywords_summary: "あなたは豊かな内面世界を持つ夢想家です。無限の想像力と繊細な感性で、誰も思いつかない独創的なアイデアを生み出します。美しいものや感動的なものを察知する特別な感受性を持った、真の芸術家タイプです。"
  },
  {
    id: "connector",
    name: "コネクター",
    description: "忠実で人をつなぐ信頼の架け橋",
    scores: { creativity: 1, extraversion: 5, agreeableness: 5, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/connector.png",
    keywords: "社交性,協調性,信頼関係",
    keywords_summary: "あなたは人と人をつなぐ橋渡し役です。優れた社交性でコミュニティを広げ、協調性を大切にしながら長続きする信頼関係を築きます。チーム内の調和を促進し、みんなから頼られる、真の調整役タイプです。"
  },
  {
    id: "strategist",
    name: "ストラテジスト",
    description: "遠くを見通す冷静な策士",
    scores: { creativity: 5, extraversion: 1, agreeableness: 1, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/strategist.png",
    keywords: "戦略思考,冷静,計画性",
    keywords_summary: "あなたは論理的思考の達人です。全体を俯瞰する戦略思考と冷静な判断力で、具体的で実現可能な計画を設計します。感情に左右されない客観性と、目標達成への緻密な計画性を持った、真の参謀タイプです。"
  },
  {
    id: "innovator",
    name: "イノベーター",
    description: "新しい視点で常識を覆す発明家",
    scores: { creativity: 5, extraversion: 5, agreeableness: 1, emotionality: 5, conscientiousness: 1 },
    image: "/images/patterns/innovator.png",
    keywords: "革新,創造力,変革",
    keywords_summary: "あなたは常識を覆す革新者です。既存の枠組みを超えた創造力で全く新しい価値を生み出し、現状を変革する強い推進力を持っています。アイデアを現実に変える力で、より良い未来を創造する、真の発明家タイプです。"
  },
  {
    id: "guardian",
    name: "ガーディアン",
    description: "群れを守る王者のリーダー",
    scores: { creativity: 1, extraversion: 5, agreeableness: 5, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/guardian.png",
    keywords: "責任感,統率力,保護",
    keywords_summary: "あなたは強い使命感を持つ守護者です。深い責任感とリーダーシップで組織をまとめ、大切な人や価値のあるものを保護します。チームの方向性を示しながら、みんなを守り抜く意志を持った、真の統率者タイプです。"
  },
  {
    id: "visionary",
    name: "ビジョナリー",
    description: "夜に光を見る未来志向",
    scores: { creativity: 5, extraversion: 1, agreeableness: 1, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/visionary.png",
    keywords: "先見性,洞察力,未来志向",
    keywords_summary: "あなたは未来を見通す預言者です。まだ誰も気づいていない変化を予見する先見性と、物事の本質を見抜く深い洞察力で、現在より良い明日を思い描きます。時代を先取りする感覚を持った、真の未来志向タイプです。"
  },
  {
    id: "performer",
    name: "パフォーマー",
    description: "小さな体で場を盛り上げるムードメーカー",
    scores: { creativity: 1, extraversion: 5, agreeableness: 5, emotionality: 5, conscientiousness: 1 },
    image: "/images/patterns/performer.png",
    keywords: "表現力,エンターテイナー,情熱",
    keywords_summary: "あなたは天性のエンターテイナーです。豊かな表現力で周囲を楽しませ、情熱的な姿勢で場の雰囲気を明るくします。人を魅了し、感動させる特別な才能を持った、真のパフォーマータイプです。"
  },
  {
    id: "analyzer",
    name: "アナライザー",
    description: "針のような洞察力を持つ研究者",
    scores: { creativity: 1, extraversion: 1, agreeableness: 1, emotionality: 5, conscientiousness: 5 },
    image: "/images/patterns/analyzer.png",
    keywords: "分析力,研究心,論理思考",
    keywords_summary: "あなたは真実を追求する研究者です。複雑な情報を整理する分析力と、深く掘り下げる研究心で、事実と根拠に基づく論理思考を展開します。パターンや法則を見つけ出し、真実に到達する、真の探究者タイプです。"
  },
  {
    id: "adventurer",
    name: "アドベンチャラー",
    description: "走りながら世界を切り開く旅人",
    scores: { creativity: 5, extraversion: 5, agreeableness: 1, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/adventurer.png",
    keywords: "行動力,自由,探求心",
    keywords_summary: "あなたは実践派の旅人です。考えるより先に動く行動力と、縛られない自由な精神で、未知の領域を探求します。経験から学び、新しい発見を求めて進み続ける、真の冒険者タイプです。"
  },
  {
    id: "harmonizer",
    name: "ハーモナイザー",
    description: "穏やかに周囲を和ませる癒し系",
    scores: { creativity: 1, extraversion: 1, agreeableness: 5, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/harmonizer.png",
    keywords: "調和,平和,癒し",
    keywords_summary: "あなたは自然な癒し手です。みんなが心地よく過ごせる調和の取れた環境を作り、争いのない平和な状態を維持します。疲れた心を癒し、安らぎを与える、真の平和主義者タイプです。"
  },
  {
    id: "seeker",
    name: "シーカー",
    description: "未来の宝物をコツコツ蓄える探索者",
    scores: { creativity: 1, extraversion: 1, agreeableness: 5, emotionality: 5, conscientiousness: 5 },
    image: "/images/patterns/seeker.png",
    keywords: "探求,成長,向上心",
    keywords_summary: "あなたは成長への飽くなき探求者です。答えや解決策を求めて諦めずに探し続け、常により良い状態を目指す向上心で、昨日より今日へと発展していきます。現状に満足しない、真の成長志向タイプです。"
  },
  {
    id: "rebel",
    name: "レベル",
    description: "自分の道を登り続ける反逆者",
    scores: { creativity: 5, extraversion: 5, agreeableness: 1, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/rebel.png",
    keywords: "独立心,反骨精神,個性",
    keywords_summary: "あなたは自分らしさを貫く独立者です。他人に依存しない独立心と、既存のルールに挑戦する反骨精神で、誰とも違う特別な個性を発揮します。自分だけの道を切り開く、真の個性派タイプです。"
  },
  {
    id: "leader",
    name: "リーダー",
    description: "包容力と力強さを兼ね備える統率者",
    scores: { creativity: 5, extraversion: 5, agreeableness: 5, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/archaeologist.png",
    keywords: "指導力,包容力,統率",
    keywords_summary: "あなたは天性のリーダーです。チームを正しい方向に導く指導力と、多様な人を受け入れる包容力で、組織全体を一つの方向に統率します。それぞれの良さを活かしながら目標達成を支援する、真の統率者タイプです。"
  },
  {
    id: "thinker",
    name: "シンカー",
    description: "状況に合わせ変化しながら考える哲学者",
    scores: { creativity: 1, extraversion: 1, agreeableness: 1, emotionality: 5, conscientiousness: 1 },
    image: "/images/patterns/thinker.png",
    keywords: "思考力,哲学,内省",
    keywords_summary: "あなたは深遠な思索家です。物事を深く考える思考力と、人生の意味を考察する哲学的姿勢で、自分自身を見つめ直す内省を続けます。本質的な理解に到達する、真の哲学者タイプです。"
  },
  {
    id: "optimizer",
    name: "オプティマイザー",
    description: "効率よく動き回る実務家",
    scores: { creativity: 1, extraversion: 5, agreeableness: 5, emotionality: 5, conscientiousness: 5 },
    image: "/images/patterns/optimizer.png",
    keywords: "効率性,実用性,最適化",
    keywords_summary: "あなたは効率を追求する実務家です。無駄を省く効率性と、理論より実際に役立つ実用性で、現状をより良い状態に最適化し続けます。最小の労力で最大の成果を出す、真の改善者タイプです。"
  },
  {
    id: "creator",
    name: "クリエイター",
    description: "跳ねるように独自の世界を築く芸術家",
    scores: { creativity: 5, extraversion: 1, agreeableness: 1, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/creator.png",
    keywords: "創作,芸術性,独創",
    keywords_summary: "あなたは独自の世界を創造する芸術家です。何もないところから新しい作品を生み出す創作力と、人の心を動かす芸術性で、誰も真似できない独創的なアイデアを発想します。美しさと感動を追求する、真のクリエイタータイプです。"
  },
  {
    id: "driver",
    name: "ドライバー",
    description: "粘り強く前に進める推進力",
    scores: { creativity: 1, extraversion: 5, agreeableness: 5, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/driver.png",
    keywords: "推進力,粘り強さ,達成力",
    keywords_summary: "あなたは目標達成の専門家です。迷わず進み続ける推進力と、困難に負けない粘り強さで、設定した目標を確実に実現させる達成力を発揮します。最後まで諦めない、真の実行者タイプです。"
  },
  {
    id: "healer",
    name: "ヒーラー",
    description: "優しさで周囲を癒す共感者",
    scores: { creativity: 1, extraversion: 1, agreeableness: 5, emotionality: 5, conscientiousness: 1 },
    image: "/images/patterns/healer.png",
    keywords: "共感力,癒し,優しさ",
    keywords_summary: "あなたは心の癒し手です。他人の気持ちを理解する深い共感力と、傷ついた心を慰める癒しの力で、思いやりを持って接する優しさを発揮します。人を癒し回復に導く、真のヒーラータイプです。"
  },
  {
    id: "pioneer",
    name: "パイオニア",
    description: "未知の地を切り開く挑戦者",
    scores: { creativity: 5, extraversion: 5, agreeableness: 1, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/pioneer.png",
    keywords: "開拓精神,先駆者,勇気",
    keywords_summary: "あなたは新天地を切り開く開拓者です。誰も歩いたことのない道を切り開く開拓精神と、新しい分野で道筋を作る先駆者としての使命感で、不確実な状況でも前進する勇気を発揮します。未来を創造する、真のパイオニアタイプです。"
  },
  {
    id: "protector",
    name: "プロテクター",
    description: "のんびり×意志の強さで守る存在",
    scores: { creativity: 1, extraversion: 5, agreeableness: 5, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/protector.png",
    keywords: "守護,安定感,誠実",
    keywords_summary: "あなたは信頼できる守護者です。大切な人やものを守り抜く守護の責任感と、周囲に安心感を与える安定した存在感で、嘘をつかず約束を守る誠実な人柄を示します。みんなの支えとなる、真のプロテクタータイプです。"
  },
  {
    id: "observer",
    name: "オブザーバー",
    description: "忍耐と落ち着きで見守る賢者",
    scores: { creativity: 1, extraversion: 1, agreeableness: 1, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/observer.png",
    keywords: "観察力,忍耐,冷静",
    keywords_summary: "あなたは洞察に優れた観察者です。細かい変化も見逃さない観察力と、時間をかけて物事に取り組む忍耐力で、感情に流されない冷静な判断を下します。状況を正確に把握する、真の賢者タイプです。"
  },
  {
    id: "maverick",
    name: "マーベリック",
    description: "独立独歩で突き進むカリスマ",
    scores: { creativity: 1, extraversion: 5, agreeableness: 1, emotionality: 5, conscientiousness: 3 },
    image: "/images/patterns/maverick.png",
    keywords: "カリスマ,独立,個性",
    keywords_summary: "あなたは人を惹きつけるカリスマです。自然と注目を集める魅力的な存在感と、他人に頼らない独立した意志で、誰とも違う独特で魅力的な個性を発揮します。周囲を魅了する、真のカリスマタイプです。"
  },
  {
    id: "supporter",
    name: "サポーター",
    description: "群れを支える温厚なフォロワー",
    scores: { creativity: 1, extraversion: 1, agreeableness: 5, emotionality: 1, conscientiousness: 3 },
    image: "/images/patterns/supporter.png",
    keywords: "支援,協力,温厚",
    keywords_summary: "あなたは頼れるサポーターです。他人の成功を後押しする支援の心と、チームワークを大切にする協力精神で、穏やかで温厚な人柄を示します。みんなと一緒に目標達成を目指す、真のサポータータイプです。"
  },
  {
    id: "tactician",
    name: "タクティシャン",
    description: "高みから戦況を読む戦略家",
    scores: { creativity: 5, extraversion: 5, agreeableness: 1, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/tactician.png",
    keywords: "戦術,戦略,知略",
    keywords_summary: "あなたは知略に優れた戦略家です。具体的な状況に応じて最適な戦術を選択し、長期的な視点で戦略を立案します。頭脳を使って困難な問題を解決する知恵と工夫で、勝利を導く、真のタクティシャンタイプです。"
  },
  {
    id: "nurturer",
    name: "ナーチュラー",
    description: "ゆったり共に成長する仲間思い",
    scores: { creativity: 1, extraversion: 1, agreeableness: 5, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/nurturer.png",
    keywords: "育成,成長,仲間思い",
    keywords_summary: "あなたは他人を育てる教育者です。他人の才能を見つけて育成する愛情と、時間をかけて着実に成長していく発達への理解で、仲間の幸せを大切に思う心を持ちます。みんなの成長を支える、真のナーチュラータイプです。"
  },
  {
    id: "catalyst",
    name: "カタリスト",
    description: "周囲に刺激を与える変革者",
    scores: { creativity: 5, extraversion: 5, agreeableness: 5, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/catalyst.png",
    keywords: "触媒,変革,刺激",
    keywords_summary: "あなたは変化を促す触媒です。周囲の人や環境に良い影響を与える触媒の力と、現状をより良い方向に導く変革の推進力で、マンネリを破る新鮮な刺激を与えます。周囲を活性化させる、真のカタリストタイプです。"
  },
  {
    id: "realist",
    name: "リアリスト",
    description: "厳しい環境でも歩み続ける現実家",
    scores: { creativity: 1, extraversion: 1, agreeableness: 1, emotionality: 1, conscientiousness: 5 },
    image: "/images/patterns/realist.png",
    keywords: "現実主義,堅実,実直",
    keywords_summary: "あなたは地に足のついた現実家です。理想より現実を重視する現実主義と、リスクを避ける堅実な判断で、飾らず偽らない実直な人柄を示します。確実で安全な方法を選択する、真のリアリストタイプです。"
  },
  {
    id: "optimist",
    name: "オプティミスト",
    description: "小さなことも楽しみに変える楽天家",
    scores: { creativity: 1, extraversion: 5, agreeableness: 5, emotionality: 1, conscientiousness: 1 },
    image: "/images/patterns/optimist.png",
    keywords: "楽観,ポジティブ,明るさ",
    keywords_summary: "あなたは太陽のような楽天家です。困難な状況でも希望を見出す楽観的な心と、物事の良い面に注目するポジティブな姿勢で、周囲を元気にする明るさを放ちます。場の雰囲気を明るくする、真のオプティミストタイプです。"
  },
  {
    id: "philosopher",
    name: "フィロソファー",
    description: "深い洞察で物事を見つめる思想家",
    scores: { creativity: 5, extraversion: 1, agreeableness: 1, emotionality: 5, conscientiousness: 1 },
    image: "/images/patterns/philosopher.png",
    keywords: "哲学,洞察,深思",
    keywords_summary: "あなたは深遠な思想家です。人生や世界の本質的な問題について哲学的に考察し、表面的でない物事の本当の意味を洞察します。時間をかけて本質的な答えを導き出す深い思考力を持った、真のフィロソファータイプです。"
  }
];

// ビッグファイブのカテゴリ型を定義
type BigFiveLevel = 'High' | 'Low' | 'Medium';
type BigFiveScoreMap = {
  extraversion: BigFiveLevel;
  agreeableness: BigFiveLevel;
  conscientiousness: BigFiveLevel;
  neuroticism: BigFiveLevel;
  openness: BigFiveLevel;
};

// YES/NO回答からビッグファイブスコアを直接計算
export function calculateBigFiveFromAnswers(answers: Answer[]): PersonalityScores {
  const categories = {
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    neuroticism: 0,
    openness: 0
  };

  // 各カテゴリのYES回答数をカウント
  answers.forEach(answer => {
    const question = DIAGNOSIS_QUESTIONS.find(q => q.id === answer.questionId);
    if (question && answer.value) {
      categories[question.category]++;
    }
  });

  // High/Low/Mediumに分類して1-5スケールに変換
  const convertToScore = (yesCount: number): number => {
    if (yesCount >= 3) return 5; // High
    if (yesCount <= 2) return 1; // Low
    return 3; // Medium (fallback)
  };

  return {
    creativity: convertToScore(categories.openness),        // 開放性 → 創造性
    extraversion: convertToScore(categories.extraversion),
    agreeableness: convertToScore(categories.agreeableness),
    emotionality: convertToScore(categories.neuroticism),   // 神経症傾向 → 情動性
    conscientiousness: convertToScore(categories.conscientiousness)
  };
}

// ビッグファイブスコアレベルを取得
export function getBigFiveScoreLevels(answers: Answer[]): BigFiveScoreMap {
  const categories = {
    extraversion: 0,
    agreeableness: 0,
    conscientiousness: 0,
    neuroticism: 0,
    openness: 0
  };

  // 各カテゴリのYES回答数をカウント
  answers.forEach(answer => {
    const question = DIAGNOSIS_QUESTIONS.find(q => q.id === answer.questionId);
    if (question && answer.value) {
      categories[question.category]++;
    }
  });

  // High/Low/Mediumに分類
  const getLevel = (yesCount: number): BigFiveLevel => {
    if (yesCount >= 3) return 'High';
    if (yesCount <= 2) return 'Low';
    return 'Medium';
  };

  return {
    extraversion: getLevel(categories.extraversion),
    agreeableness: getLevel(categories.agreeableness),
    conscientiousness: getLevel(categories.conscientiousness),
    neuroticism: getLevel(categories.neuroticism),
    openness: getLevel(categories.openness)
  };
}

// BIG5組み合わせに基づくパターンマッチング
export function selectPatternFromBigFive(scoreLevels: BigFiveScoreMap): DiagnosisPattern {
  // 完全一致を探す
  for (const pattern of DIAGNOSIS_PATTERNS) {
    if (matchesBigFivePattern(pattern.scores, scoreLevels)) {
      return pattern;
    }
  }
  
  // 完全一致がない場合、最も近いパターンを返す
  return findClosestPattern(scoreLevels);
}

// パターンの一致判定
function matchesBigFivePattern(patternScores: PersonalityScores, userLevels: BigFiveScoreMap): boolean {
  const patternLevels = convertScoresToLevels(patternScores);
  
  return patternLevels.extraversion === userLevels.extraversion &&
         patternLevels.agreeableness === userLevels.agreeableness &&
         patternLevels.conscientiousness === userLevels.conscientiousness &&
         patternLevels.neuroticism === userLevels.neuroticism &&
         patternLevels.openness === userLevels.openness;
}

// スコアをレベルに変換
function convertScoresToLevels(scores: PersonalityScores): BigFiveScoreMap {
  const getLevel = (score: number): BigFiveLevel => {
    if (score >= 4) return 'High';
    if (score <= 2) return 'Low';
    return 'Medium';
  };

  return {
    extraversion: getLevel(scores.extraversion),
    agreeableness: getLevel(scores.agreeableness),
    conscientiousness: getLevel(scores.conscientiousness),
    neuroticism: getLevel(scores.emotionality), // emotionality → neuroticism
    openness: getLevel(scores.creativity)        // creativity → openness
  };
}

// 最も近いパターンを見つける
function findClosestPattern(userLevels: BigFiveScoreMap): DiagnosisPattern {
  let bestMatch = DIAGNOSIS_PATTERNS[0];
  let bestSimilarity = -Infinity;
  
  for (const pattern of DIAGNOSIS_PATTERNS) {
    const patternLevels = convertScoresToLevels(pattern.scores);
    const similarity = calculateLevelSimilarity(userLevels, patternLevels);
    
    if (similarity > bestSimilarity) {
      bestSimilarity = similarity;
      bestMatch = pattern;
    }
  }
  
  return bestMatch;
}

// レベルベースの類似度計算
function calculateLevelSimilarity(userLevels: BigFiveScoreMap, patternLevels: BigFiveScoreMap): number {
  let matches = 0;
  const traits: (keyof BigFiveScoreMap)[] = ['extraversion', 'agreeableness', 'conscientiousness', 'neuroticism', 'openness'];
  
  for (const trait of traits) {
    if (userLevels[trait] === patternLevels[trait]) {
      matches++;
    }
  }
  
  return matches;
}

// バリデーション関数群
export function validateAnswers(answers: Answer[]): string | null {
  if (!Array.isArray(answers)) {
    return 'answersは必須です';
  }

  if (answers.length === 0) {
    return 'answersが空です';
  }

  // 回答が有効な値であることをチェック
  const invalidAnswer = answers.find((a) => a.value === null || a.value === undefined);
  if (invalidAnswer) {
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
      // YES/NO回答を使用
      const answerText = a.text || (a.value ? 'YES' : 'NO');
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
    (detail) => 
      !detail.satisfactionPoints?.trim() || 
      !detail.dissatisfactionPoints?.trim() || 
      !detail.idealState?.trim() || 
      !detail.obstacles?.trim() ||
      detail.satisfaction < 0 || 
      detail.satisfaction > 100
  );
  if (incompleteDetail) {
    return '全ての価値項目の回答が必要です';
  }

  return null;
}

export function validateFuturePredictions(predictions: FuturePrediction[]): string | null {
  // console.log('=== VALIDATION FUNCTION DEBUG ===');
  // console.log('Input predictions:', predictions);
  // console.log('Is array?', Array.isArray(predictions));
  // console.log('Type of predictions:', typeof predictions);
  
  if (!predictions || !Array.isArray(predictions)) {
    console.error('VALIDATION ERROR: predictions is not an array');
    return '予測結果の形式が不正です';
  }

  // console.log('Predictions length:', predictions.length);
  if (predictions.length !== 1) {
    console.error(`VALIDATION ERROR: Expected 1 prediction, got ${predictions.length}`);
    return '1つの価値項目の予測が必要です';
  }

  for (const prediction of predictions) {
    // console.log('=== VALIDATING PREDICTION ===');
    // console.log('Prediction object:', prediction);
    // console.log('valueId:', prediction.valueId, 'type:', typeof prediction.valueId);
    // console.log('valueName:', prediction.valueName, 'type:', typeof prediction.valueName);
    // console.log('bestFuture:', prediction.bestFuture, 'type:', typeof prediction.bestFuture);
    // console.log('gapLevel:', prediction.gapLevel, 'type:', typeof prediction.gapLevel);
    // console.log('barriers:', prediction.barriers, 'type:', typeof prediction.barriers);
    // console.log('roadmap:', prediction.roadmap, 'type:', typeof prediction.roadmap);
    
    if (!prediction.valueId) {
      console.error('VALIDATION ERROR: valueId is missing or falsy');
      return '予測情報が不完全または形式が不正です（valueId）';
    }
    
    if (!prediction.valueName) {
      console.error('VALIDATION ERROR: valueName is missing or falsy');
      return '予測情報が不完全または形式が不正です（valueName）';
    }
    
    if (!prediction.bestFuture) {
      console.error('VALIDATION ERROR: bestFuture is missing or falsy');
      return '予測情報が不完全または形式が不正です（bestFuture）';
    }
    
    if (typeof prediction.bestFuture !== 'string') {
      console.error('VALIDATION ERROR: bestFuture is not a string, got:', typeof prediction.bestFuture);
      return '予測情報が不完全または形式が不正です（bestFuture型）';
    }
    
    // gapLevelはAPIで設定するためバリデーション不要
    
    if (!prediction.barriers) {
      console.error('VALIDATION ERROR: barriers is missing or falsy');
      return '予測情報が不完全または形式が不正です（barriers）';
    }
    
    if (typeof prediction.barriers !== 'string') {
      console.error('VALIDATION ERROR: barriers is not a string, got:', typeof prediction.barriers);
      return '予測情報が不完全または形式が不正です（barriers型）';
    }
    
    if (!prediction.roadmap) {
      console.error('VALIDATION ERROR: roadmap is missing or falsy');
      return '予測情報が不完全または形式が不正です（roadmap）';
    }
    
    if (typeof prediction.roadmap !== 'string') {
      console.error('VALIDATION ERROR: roadmap is not a string, got:', typeof prediction.roadmap);
      return '予測情報が不完全または形式が不正です（roadmap型）';
    }
  }

  // console.log('=== VALIDATION PASSED ===');
  return null;
} 