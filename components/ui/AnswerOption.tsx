'use client';

import { MouseEvent } from 'react';

interface AnswerOptionProps {
  text: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  isSelected?: boolean;
  isDisabled?: boolean;
  index?: number;
  className?: string;
}

export default function AnswerOption({
  text,
  onClick,
  isSelected = false,
  isDisabled = false,
  index = 0,
  className = '',
}: AnswerOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
      className={`w-full text-center p-6 md:p-8 rounded-xl transition-all duration-300 transform cursor-pointer backdrop-blur-md group relative overflow-hidden ${
        isSelected
          ? 'scale-[1.02] bg-gray-800/60 border border-gray-600/50'
          : isDisabled
          ? 'opacity-50 cursor-not-allowed'
          : 'scale-100 bg-gray-900/50 border border-gray-800/30 hover:bg-gray-800/60 hover:border-gray-700/50'
      } ${className}`}>
      <span
        className='relative z-10 text-lg md:text-xl lg:text-2xl font-light transition-colors duration-300 text-gray-300 group-hover:text-gray-200'
        style={{ fontFamily: 'var(--font-literata), serif' }}>
        {text}
      </span>
    </button>
  );
}

