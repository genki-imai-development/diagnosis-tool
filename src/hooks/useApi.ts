import { useState } from 'react';
import { Question } from '@/types/diagnosis';
import { getQuestions } from '@/lib/api';

export const useQuestions = () => {
  const [questions] = useState<Question[]>(getQuestions());

  return {
    questions,
  };
};