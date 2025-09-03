import React from 'react';
import { PersonalityScores } from '@/types/diagnosis';

interface RadarChartProps {
  scores: PersonalityScores;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  // チャートの基本設定
  const size = 320;
  const center = size / 2;
  const radius = size * 0.32;

  // スコア値を配列に変換
  const scoreValues = [
    scores.creativity,
    scores.extraversion,
    scores.agreeableness,
    scores.emotionality,
    scores.conscientiousness,
  ];

  // ラベル設定
  const labels = [
    { text: '創造性', color: '#8b5cf6' },
    { text: '外向性', color: '#06b6d4' },
    { text: '協調性', color: '#10b981' },
    { text: '情動性', color: '#f59e0b' },
    { text: '勤勉性', color: '#ef4444' },
  ];

  // 5角形の頂点を計算
  const getPoint = (index: number, value: number) => {
    const angle = (index * 72 - 90) * (Math.PI / 180);
    const normalizedValue = value / 5;
    const x = center + Math.cos(angle) * radius * normalizedValue;
    const y = center + Math.sin(angle) * radius * normalizedValue;
    return { x, y };
  };

  // データポイントの計算
  const points = scoreValues.map((score, index) => getPoint(index, score));
  
  // チャートパスの生成
  const chartPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + 'Z';

  // グリッド線の生成（レベル2と4のみ）
  const generateGridPath = (level: number) => {
    const r = (radius * level) / 5;
    const gridPoints = Array.from({ length: 5 }, (_, i) => {
      const angle = (i * 72 - 90) * (Math.PI / 180);
      return `${center + Math.cos(angle) * r} ${center + Math.sin(angle) * r}`;
    });
    return gridPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p}`).join(' ') + 'Z';
  };

  // 外枠の生成
  const outerFramePath = (() => {
    const gridPoints = Array.from({ length: 5 }, (_, i) => {
      const angle = (i * 72 - 90) * (Math.PI / 180);
      return `${center + Math.cos(angle) * radius} ${center + Math.sin(angle) * radius}`;
    });
    return gridPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p}`).join(' ') + 'Z';
  })();

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width={size} height={size} className="drop-shadow-sm">
          {/* グラデーション定義 */}
          <defs>
            <radialGradient id="backgroundGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </radialGradient>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 背景円 */}
          <circle 
            cx={center} 
            cy={center} 
            r={radius + 10} 
            fill="url(#backgroundGradient)" 
            opacity="0.03"
          />

          {/* グリッド線 */}
          {[2, 4].map(level => (
            <path 
              key={level} 
              d={generateGridPath(level)} 
              fill="none" 
              stroke="#f1f5f9" 
              strokeWidth="1" 
              strokeDasharray="2,3"
              opacity="0.6"
            />
          ))}

          {/* 外枠 */}
          <path 
            d={outerFramePath} 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="2"
          />

          {/* 軸線 */}
          {Array.from({ length: 5 }, (_, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;
            return (
              <line 
                key={i} 
                x1={center} 
                y1={center} 
                x2={x} 
                y2={y} 
                stroke="#f1f5f9" 
                strokeWidth="1"
                opacity="0.4"
              />
            );
          })}

          {/* レーダーチャート本体 */}
          <path 
            d={chartPath} 
            fill="url(#chartGradient)" 
            stroke="#8b5cf6" 
            strokeWidth="2.5" 
            filter="url(#glow)"
            className="transition-all duration-300"
          />

          {/* データポイント */}
          {points.map((point, index) => (
            <g key={index}>
              <circle 
                cx={point.x} 
                cy={point.y} 
                r="8" 
                fill={labels[index].color} 
                opacity="0.2"
                className="animate-pulse"
              />
              <circle 
                cx={point.x} 
                cy={point.y} 
                r="5" 
                fill={labels[index].color} 
                stroke="white" 
                strokeWidth="2.5"
                className="transition-all duration-200 hover:r-6 cursor-pointer"
                filter="url(#glow)"
              />
            </g>
          ))}

          {/* ラベル */}
          {labels.map((label, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180);
            const labelRadius = radius + 35;
            const x = center + Math.cos(angle) * labelRadius;
            const y = center + Math.sin(angle) * labelRadius;
            
            return (
              <g key={index}>
                <rect
                  x={x - 28}
                  y={y - 12}
                  width="56"
                  height="24"
                  rx="12"
                  fill="white"
                  stroke={label.color}
                  strokeWidth="1.5"
                  opacity="0.95"
                  className="drop-shadow-sm"
                />
                <text 
                  x={x} 
                  y={y} 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  className="text-xs font-semibold pointer-events-none"
                  fill={label.color}
                >
                  {label.text}
                </text>
              </g>
            );
          })}

          {/* 中央点 */}
          <circle 
            cx={center} 
            cy={center} 
            r="3" 
            fill="#64748b" 
            opacity="0.3"
          />
        </svg>
      </div>
      
      {/* スコア表示 */}
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-5 gap-4">
          {labels.map((label, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-50 rounded-lg p-3">
              <div 
                className="w-4 h-4 rounded-full mb-2"
                style={{ backgroundColor: label.color }}
              />
              <span className="text-xs font-medium text-gray-700 mb-1 text-center">
                {label.text}
              </span>
              <div className="text-lg font-semibold text-gray-800">
                {scoreValues[index].toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 