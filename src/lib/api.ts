import { Question } from '@/types/diagnosis';
import { Answer, DiagnosisResult } from '@/types/diagnosis';

const questions: Question[] = [
  {
    id: 1,
    text: '初めて入ったレストランで、メニューに知らない料理がたくさんあります。あなたはどうしますか？',
    placeholder: '例：店員さんにおすすめを聞いて、説明してもらってから決めます。新しい味に出会えるのが楽しみです。',
    minLength: 15,
    order: 1
  },
  {
    id: 2,
    text: '親しい友人の誕生日パーティーに招待されました。会場には知らない人もたくさんいます。あなたはパーティーでどう過ごしますか？',
    placeholder: '例：最初は友人と話していますが、だんだん新しい人にも話しかけて、みんなでゲームを提案したりします。',
    minLength: 15,
    order: 2
  },
  {
    id: 3,
    text: '満員電車で座っていると、近くに妊婦さんが立っています。でも他にも疲れた様子の人がいます。あなたはどうしますか？',
    placeholder: '例：迷わず妊婦さんに声をかけて席を譲ります。他の人のことも気になりますが、まず一番必要な人を優先します。',
    minLength: 15,
    order: 3
  },
  {
    id: 4,
    text: 'ずっと楽しみにしていたアーティストのコンサートが、当日の朝に急に中止になりました。あなたはどう感じ、どうしますか？',
    placeholder: '例：すごくガッカリして落ち込みますが、友達と連絡を取って代わりに映画を見に行くことにします。返金のことも確認します。',
    minLength: 15,
    order: 4
  },
  {
    id: 5,
    text: '新しい趣味（例：楽器、スポーツ、料理など）を始めたいと思います。あなたはどのように始めますか？',
    placeholder: '例：まずネットで情報を集めて、体験教室があるか調べます。計画を立ててから道具を揃えて、週2回は練習すると決めて始めます。',
    minLength: 15,
    order: 5
  }
];

export const getQuestions = (): Question[] => {
  return questions;
};

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