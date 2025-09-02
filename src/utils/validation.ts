import { Question } from '@/types/diagnosis';
import { VALIDATION_CONSTRAINTS } from '@/lib/diagnosis';

// 基本的な文字数バリデーション
export const validateTextLength = (text: string, minLength: number = VALIDATION_CONSTRAINTS.MIN_ANSWER_LENGTH): boolean => {
  return text.trim().length >= minLength;
};

// バリデーションエラーメッセージ生成（統一フォーマット）
export const getValidationErrorMessage = (minLength: number = VALIDATION_CONSTRAINTS.MIN_ANSWER_LENGTH): string => {
  return `${minLength}文字以上で入力してください`;
};

// 質問の回答をバリデーション（フロントエンド用）
export const validateAnswer = (text: string, question: Question): string | null => {
  const trimmedText = text.trim();
  
  if (trimmedText.length === 0) {
    return '回答を入力してください';
  }
  
  if (!validateTextLength(text, question.minLength)) {
    return getValidationErrorMessage(question.minLength);
  }
  
  return null;
};

// 一般的なバリデーション関数
export const validateRequired = (value: any, fieldName: string = 'この項目'): string | null => {
  if (value === null || value === undefined || value === '') {
    return `${fieldName}は必須です`;
  }
  return null;
};

export const validateArray = (array: any[], fieldName: string = '配列', minLength: number = 1): string | null => {
  if (!Array.isArray(array)) {
    return `${fieldName}は配列である必要があります`;
  }
  
  if (array.length < minLength) {
    return `${fieldName}は${minLength}個以上である必要があります`;
  }
  
  return null;
};

export const validateNumberRange = (
  value: number, 
  min: number = VALIDATION_CONSTRAINTS.MIN_SCORE, 
  max: number = VALIDATION_CONSTRAINTS.MAX_SCORE,
  fieldName: string = '数値'
): string | null => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return `${fieldName}は有効な数値である必要があります`;
  }
  
  if (value < min || value > max) {
    return `${fieldName}は${min}〜${max}の範囲で入力してください`;
  }
  
  return null;
};