import React, { useState, useEffect } from 'react';
import { ValueItem, SelectedValueItem } from '@/types/diagnosis';

interface ValueDetailsFormProps {
  selectedValues: ValueItem[];
  onNext: (valueDetails: SelectedValueItem[]) => void;
  onPrevious: () => void;
  totalQuestions: number;
  initialValues?: SelectedValueItem[];
}

export const ValueDetailsForm: React.FC<ValueDetailsFormProps> = ({
  selectedValues,
  onNext,
  onPrevious,
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

  // 質問が変更されたときに入力内容を保持する
  useEffect(() => {
    if (currentValue && currentDetail) {
      if (currentQuestionType === 'current') {
        setText(currentDetail.currentStatus);
      } else {
        setText(currentDetail.idealFuture);
      }
    }
    setError(null);
  }, [currentValueIndex, currentQuestionType, currentDetail, currentValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 文字数バリデーション（10文字以上50文字以下）
    if (text.trim().length < 10) {
      setError('10文字以上で入力してください');
      return;
    }

    if (text.trim().length > 50) {
      setError('50文字以下で入力してください');
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
      return `「${currentValue?.name}」について、あなたの理想の未来は？`;
    }
  };

  const getPlaceholder = () => {
    if (currentQuestionType === 'current') {
      return `例：現在の${currentValue?.name}について、どのような状況で、どのような課題があるか...`;
    } else {
      return `例：${currentValue?.name}で実現したい理想的な状態、具体的な目標など...`;
    }
  };

  const getMinLength = () => 10;
  const getMaxLength = () => 50;
  const currentLength = text.trim().length;
  const isValid = currentLength >= getMinLength() && currentLength <= getMaxLength();

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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 進捗インジケーターカード */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-4 md:mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-semibold">質問 {currentStepNumber + 1} / {totalSteps}</span>
            </div>
            <span className="text-lg font-bold">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 質問カード */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-10 transform rotate-1"></div>
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-8">
            <div className="text-center mb-4 md:mb-8">
              <div className="inline-block p-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-4 md:mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{currentStepNumber + 1}</span>
                </div>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight">
                {getQuestionText()}
              </h2>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder={getPlaceholder()}
                  className={`w-full p-4 md:p-6 border-2 rounded-2xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900 placeholder-gray-400 text-base md:text-lg leading-relaxed ${
                    error ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300'
                  }`}
                  rows={4}
                  maxLength={getMaxLength()}
                  required
                />
                
                {/* 文字数カウンター */}
                <div className="flex justify-between items-center mt-4">
                  <div className={`flex items-center text-sm font-medium ${
                    isValid 
                      ? 'text-emerald-600' 
                      : currentLength > 0 
                      ? 'text-amber-600' 
                      : 'text-gray-500'
                  }`}>
                    <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                      isValid ? 'bg-emerald-100' : 'bg-gray-100'
                    }`}>
                      {isValid ? (
                        <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    {currentLength} / {getMinLength()}〜{getMaxLength()}文字
                  </div>
                </div>

                {/* エラーメッセージ */}
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                    <p className="text-red-600 font-medium flex items-center">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {error}
                    </p>
                  </div>
                )}
              </div>

              {/* ボタン */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-4 py-4 md:px-10 md:py-4 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-2xl font-semibold transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  前の質問に戻る
                </button>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`px-4 py-4 md:px-10 md:py-4 rounded-2xl font-semibold text-base md:text-lg transition-all duration-200 ${
                    isValid
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer'
                      : 'bg-gray-300 cursor-not-allowed text-gray-500'
                  }`}
                >
                  {isLastQuestion
                    ? '診断を実行'
                    : '次の質問へ'
                  }
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 