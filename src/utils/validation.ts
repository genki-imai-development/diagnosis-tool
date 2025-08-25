import { Question } from '@/types/diagnosis';

// 文字数バリデーション
export const validateTextLength = (text: string, minLength: number): boolean => {
  return text.trim().length >= minLength;
};

// バリデーションエラーメッセージ生成
export const getValidationErrorMessage = (minLength: number): string => {
  return `${minLength}文字以上で入力してください`;
};

// 質問の回答をバリデーション
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