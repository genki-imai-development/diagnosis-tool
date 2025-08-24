import { Question } from '@/types/diagnosis';

// ハードコーディングされた質問データ（DB削除のため）
const questions: Question[] = [
  {
    id: 1,
    text: '普段の生活の中で、あなたが最もやりがいを感じる瞬間について詳しく教えてください。',
    placeholder: '例：仕事で新しいプロジェクトを成功させたとき、家族と過ごす時間、趣味に没頭しているときなど...',
    minLength: 50,
    order: 1
  },
  {
    id: 2,
    text: 'ストレスを感じたときに、あなたはどのような方法で対処していますか？具体的な行動や考え方を教えてください。',
    placeholder: '例：友人に相談する、運動をする、一人で考える時間を作る、音楽を聴くなど...',
    minLength: 40,
    order: 2
  },
  {
    id: 3,
    text: 'チームで何かを進める際に、あなたはどのような役割を担うことが多いですか？その理由も含めて説明してください。',
    placeholder: '例：リーダーシップをとる、アイデアを出す、調整役になる、サポートに回るなど...',
    minLength: 45,
    order: 3
  },
  {
    id: 4,
    text: '新しい環境や変化に対して、あなたはどのように感じ、どのように適応していますか？',
    placeholder: '例：不安を感じるが積極的に取り組む、慎重に様子を見る、興奮して挑戦するなど...',
    minLength: 40,
    order: 4
  },
  {
    id: 5,
    text: 'あなたが人生で大切にしている価値観や信念について教えてください。',
    placeholder: '例：誠実さ、家族との時間、成長、創造性、安定性、冒険心など...',
    minLength: 35,
    order: 5
  }
];

export const getQuestions = (): Question[] => {
  return questions;
};