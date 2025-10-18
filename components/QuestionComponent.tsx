
import React from 'react';
import type { Question } from '../types';

interface QuestionProps {
  question: Question;
  onAnswer: (value: number) => void;
}

export const QuestionComponent: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-8 w-full transition-all duration-500 ease-in-out">
      <h2 className="text-2xl md:text-3xl text-center font-serif mb-8 min-h-[6rem]">
        {question.text}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full bg-brand-green-dark/10 text-brand-green-dark font-semibold py-4 px-2 rounded-lg border-2 border-transparent hover:border-brand-green-dark hover:bg-white transition-all duration-200 ease-in-out"
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
};
