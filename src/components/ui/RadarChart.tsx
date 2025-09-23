import React from 'react';
import { PersonalityScores } from '@/types/diagnosis';

interface RadarChartProps {
  scores: PersonalityScores;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  // スコアをHigh/Lowのレベルに変換
  const getLevel = (score: number): 'High' | 'Low' => {
    return score >= 4 ? 'High' : 'Low';
  };

  // 特性データの定義
  const traits = [
    { 
      key: 'extraversion', 
      label: '外向性', 
      score: scores.extraversion,
      level: getLevel(scores.extraversion),
      color: '#06b6d4',
      description: 'エネルギッシュで社交的'
    },
    { 
      key: 'agreeableness', 
      label: '協調性', 
      score: scores.agreeableness,
      level: getLevel(scores.agreeableness),
      color: '#10b981',
      description: '思いやりがあり協力的'
    },
    { 
      key: 'conscientiousness', 
      label: '勤勉性', 
      score: scores.conscientiousness,
      level: getLevel(scores.conscientiousness),
      color: '#f59e0b',
      description: '責任感が強く計画的'
    },
    { 
      key: 'emotionality', 
      label: '情動性', 
      score: scores.emotionality,
      level: getLevel(scores.emotionality),
      color: '#ef4444',
      description: '感情豊かで敏感'
    },
    { 
      key: 'creativity', 
      label: '創造性', 
      score: scores.creativity,
      level: getLevel(scores.creativity),
      color: '#8b5cf6',
      description: '独創的で想像力豊か'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            あなたの性格特性
          </h3>
          <p className="text-gray-600">
            5つの性格特性のバランスを表示しています
          </p>
        </div>

        <div className="space-y-6">
          {traits.map((trait, index) => (
            <div key={trait.key} className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div 
                    className="w-4 h-4 rounded-full mr-3"
                    style={{ backgroundColor: trait.color }}
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {trait.label}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {trait.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div 
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      trait.level === 'High' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {trait.level}
                  </div>
                </div>
              </div>
              
              {/* 棒グラフバー */}
              <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ 
                    backgroundColor: trait.color,
                    width: trait.level === 'High' ? '100%' : '25%',
                    background: `linear-gradient(90deg, ${trait.color} 0%, ${trait.color}88 100%)`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span 
                    className={`text-sm font-bold ${
                      trait.level === 'High' ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {trait.level === 'High' ? '高い傾向' : '低い傾向'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}; 