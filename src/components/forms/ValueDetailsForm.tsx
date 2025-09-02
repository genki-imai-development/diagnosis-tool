import React, { useState, useEffect } from 'react';
import { ValueItem, SelectedValueItem } from '@/types/diagnosis';

interface ValueDetailsFormProps {
  selectedValues: ValueItem[];
  onNext: (valueDetails: SelectedValueItem[]) => void;
  onPrevious: () => void;
  currentIndex: number;
  totalQuestions: number;
  initialValues?: SelectedValueItem[];
}

export const ValueDetailsForm: React.FC<ValueDetailsFormProps> = ({
  selectedValues,
  onNext,
  onPrevious,
  currentIndex,
  totalQuestions,
  initialValues = [],
}) => {
  // 詳細回答セット
  const [valueDetails, setValueDetails] = useState<SelectedValueItem[]>(initialValues);
  // 表示中の価値項目ID
  const [currentValueIndex, setCurrentValueIndex] = useState(0);
  // 表示中の質問の種類（現状 or 理想）
  const [currentQuestionType, setCurrentQuestionType] = useState<'current' | 'ideal'>('current');
  // 回答テキスト
  const [text, setText] = useState('');
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);
  // 診断実行中フラグ（インジケーターを100%にするため）
  const [isExecutingDiagnosis, setIsExecutingDiagnosis] = useState(false);

  // 表示中の価値項目
  const currentValue = selectedValues[currentValueIndex];
  // 表示中の質問の回答内容
  const currentDetail = valueDetails.find(d => d.id === currentValue?.id);

  // 初期化
  useEffect(() => {
    if (initialValues.length === 0) {
      const initialDetails: SelectedValueItem[] = selectedValues.map(value => ({
        id: value.id,
        name: value.name,
        currentStatus: '',
        idealFuture: ''
      }));
      setValueDetails(initialDetails);
    }
  }, [selectedValues, initialValues]);

  // 質問が変更されたときに入力内容を切り替える
  useEffect(() => {
    if (currentValue && currentDetail) {
      if (currentQuestionType === 'current') {
        setText(currentDetail.currentStatus);
      } else {
        setText(currentDetail.idealFuture);
      }
    }
    setError(null);
  }, [currentValueIndex, currentQuestionType, currentDetail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 文字数バリデーション（最小15文字） TODO: QuestionのminLengthに合わせる
    if (text.trim().length < 15) {
      setError('15文字以上で入力してください');
      return;
    }

    // 回答を保存
    const updatedDetails = [...valueDetails];
    const detailIndex = updatedDetails.findIndex(d => d.id === currentValue.id);
    
    if (currentQuestionType === 'current') {
      updatedDetails[detailIndex].currentStatus = text.trim();
      setValueDetails(updatedDetails);
      setCurrentQuestionType('ideal');
      setText(updatedDetails[detailIndex].idealFuture || '');
    } else {
      updatedDetails[detailIndex].idealFuture = text.trim();
      setValueDetails(updatedDetails);
      
      // 次の価値項目へ
      if (currentValueIndex < selectedValues.length - 1) {
        setCurrentValueIndex(prev => prev + 1);
        setCurrentQuestionType('current');
        setText(updatedDetails[detailIndex + 1]?.currentStatus || '');
      } else {
        // 全項目完了 - 診断実行
        setIsExecutingDiagnosis(true); // インジケーターを100%に
        onNext(updatedDetails);
      }
    }
    
    setError(null);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (error) {
      setError(null);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionType === 'ideal') {
      setCurrentQuestionType('current');
      setText(currentDetail?.currentStatus || '');
    } else if (currentValueIndex > 0) {
      setCurrentValueIndex(prev => prev - 1);
      setCurrentQuestionType('ideal');
      const prevValue = selectedValues[currentValueIndex - 1];
      const prevDetail = valueDetails.find(d => d.id === prevValue.id);
      setText(prevDetail?.idealFuture || '');
    } else {
      onPrevious();
    }
  };

  const getQuestionText = () => {
    if (currentQuestionType === 'current') {
      return `「${currentValue?.name}」の現状を教えてください`;
    } else {
      return `「${currentValue?.name}」の3年後の100点満点の理想の未来は？`;
    }
  };

  const getPlaceholder = () => {
    if (currentQuestionType === 'current') {
      return `例：現在の${currentValue?.name}について、どのような状況で、どのような課題や成果があるか...`;
    } else {
      return `例：3年後の${currentValue?.name}で実現したい理想的な状態、具体的な目標や成果...`;
    }
  };

  const getMinLength = () => 15;
  const currentLength = text.trim().length;
  const isValid = currentLength >= getMinLength();

  // 全体12ステップ（基本質問5 + 価値選択1 + 価値詳細6）での進捗計算
  const totalSteps = 12; // 5 + 1 + 6
  const valueDetailsStepIndex = (currentValueIndex * 2) + (currentQuestionType === 'current' ? 0 : 1);
  const currentStepNumber = 6 + valueDetailsStepIndex; // 基本質問5 + 価値選択1 = 6ステップ後から開始
  
  // 診断実行中は100%、それ以外は通常の進捗計算
  const progressPercentage = isExecutingDiagnosis 
    ? 100 
    : (currentStepNumber / totalSteps) * 100;

  // 最終質問かどうかを判定
  const isLastQuestion = currentValueIndex === selectedValues.length - 1 && currentQuestionType === 'ideal';

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* 進捗インジケーター */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>質問 {currentStepNumber + 1} / {totalSteps}</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 価値項目の進捗表示 */}
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {selectedValues.map((value, index) => (
            <div
              key={value.id}
              className={`w-3 h-3 rounded-full ${
                index < currentValueIndex
                  ? 'bg-green-500'
                  : index === currentValueIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          {currentValueIndex + 1} / {selectedValues.length} の項目
        </p>
      </div>

      {/* 質問フォーム */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {getQuestionText()}
          </h2>
          
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder={getPlaceholder()}
            className={`w-full p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-gray-900 placeholder-gray-500 ${
              error ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
            }`}
            rows={6}
            required
          />
          
          {/* 文字数カウンター */}
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className={`${
              isValid 
                ? 'text-green-600' 
                : currentLength > 0 
                ? 'text-amber-600' 
                : 'text-gray-500'
            }`}>
              {currentLength} / {getMinLength()}文字以上
              {isValid && <span className="ml-1">✓</span>}
            </span>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm flex items-center">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* ボタン */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={handlePrevious}
            className="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            ← 前へ
          </button>

          <button
            type="submit"
            disabled={!isValid}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              isValid
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            {isLastQuestion
              ? '診断を実行 →'
              : '次へ →'
            }
          </button>
        </div>
      </form>
    </div>
  );
}; 