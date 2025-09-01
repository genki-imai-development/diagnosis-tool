import React, { useState, useEffect } from 'react';
import { SelectedValueItem, FuturePrediction } from '@/types/diagnosis';

interface FuturePredictionProps {
  valueDetails: SelectedValueItem[];
  onComplete?: () => void;
}

export const FuturePredictionComponent: React.FC<FuturePredictionProps> = ({
  valueDetails,
  onComplete,
}) => {
  const [predictions, setPredictions] = useState<FuturePrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/future-prediction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            valueDetails,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '未来予測の生成に失敗しました');
        }

        const data: { predictions: FuturePrediction[] } = await response.json();
        setPredictions(data.predictions);
      } catch (err) {
        console.error('Future prediction error:', err);
        setError(err instanceof Error ? err.message : '未知のエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [valueDetails]);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // useEffectが再実行される
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            あなたの未来を予測中...
          </h2>
          <p className="text-gray-600">
            価値観の詳細情報を基に、実現可能性の高い未来と理想の未来を生成しています
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              未来予測の生成に失敗しました
            </h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              再試行
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ヘッダー */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          現実と理想の未来のギャップ
        </h1>
        <p className="text-lg text-gray-600">
          価値観を基に、実現可能性の高い未来と理想の未来を比較できます
        </p>
      </div>

      {/* 予測結果 */}
      <div className="space-y-8">
        {predictions.map((prediction, index) => (
          <div
            key={prediction.valueId}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            {/* ヘッダー */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {prediction.valueName}
              </h3>
            </div>

            {/* 未来比較コンテナ */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* 実現可能性の高い未来 */}
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-5 border-l-4 border-gray-400">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  実現可能性の高い未来
                </h4>
                <p className="text-gray-800 leading-relaxed text-sm">
                  {prediction.realisticPrediction}
                </p>
              </div>

              {/* 理想の未来 */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-5 border-l-4 border-purple-500">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    理想の未来
                  </div>
                </h4>
                <p className="text-gray-800 leading-relaxed text-sm mb-3">
                  {prediction.idealPrediction}
                </p>
                {/* プログレスバー */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>実現可能性</span>
                    <span>{prediction.idealRealizationProbability}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        prediction.idealRealizationProbability >= 50 ? 'bg-green-500' :
                        prediction.idealRealizationProbability >= 30 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${prediction.idealRealizationProbability}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>


          </div>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            未来のギャップ分析が完了しました！
          </h3>
          <p className="text-gray-600 mb-4">
            現実と理想のギャップを把握できました。このギャップを埋めるための具体的な行動計画を立ててみませんか？
          </p>
          {onComplete && (
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              診断を終了
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 