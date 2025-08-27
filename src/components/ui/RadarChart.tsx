import React from 'react';
import { PersonalityScores } from '@/types/diagnosis';

export const RadarChart: React.FC<{ scores: PersonalityScores }> = ({ scores }) => {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.35;

  // 5角形の頂点を計算
  const getPoint = (index: number, value: number) => {
    const angle = (index * 72 - 90) * (Math.PI / 180);
    const normalizedValue = value / 5;
    const x = center + Math.cos(angle) * radius * normalizedValue;
    const y = center + Math.sin(angle) * radius * normalizedValue;
    return { x, y };
  };

  const points = [
    getPoint(0, scores.creativity),
    getPoint(1, scores.extraversion),
    getPoint(2, scores.agreeableness),
    getPoint(3, scores.emotionality),
    getPoint(4, scores.conscientiousness),
  ];

  const chartPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + 'Z';

  return (
    <div className="flex justify-center">
      <svg width={size} height={size}>
        {/* グリッド線 */}
        {[1, 2, 3, 4, 5].map(level => {
          const r = (radius * level) / 5;
          const gridPoints = Array.from({ length: 5 }, (_, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);
            return `${center + Math.cos(angle) * r} ${center + Math.sin(angle) * r}`;
          });
          const path = gridPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p}`).join(' ') + 'Z';
          return (
            <path key={level} d={path} fill="none" stroke="#e5e7eb" strokeWidth="1" />
          );
        })}

        {/* 軸線 */}
        {Array.from({ length: 5 }, (_, i) => {
          const angle = (i * 72 - 90) * (Math.PI / 180);
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          return (
            <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#d1d5db" strokeWidth="1" />
          );
        })}

        {/* レーダーチャート */}
        <path d={chartPath} fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="2" />

        {/* 頂点 */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
        ))}

        {/* ラベル */}
        {['創造性', '外向性', '協調性', '情動性', '勤勉性'].map((label, i) => {
          const angle = (i * 72 - 90) * (Math.PI / 180);
          const x = center + Math.cos(angle) * (radius + 20);
          const y = center + Math.sin(angle) * (radius + 20);
          return (
            <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-sm fill-gray-700">
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}; 