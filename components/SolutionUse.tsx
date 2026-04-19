'use client';

import { useState } from 'react';

import StoryStage from './ui/StoryStage';

interface SolutionUseProps {
  onComplete: (answer: string) => void;
}

const OPTIONS = ['Da', 'Ne'] as const;

export default function SolutionUse({ onComplete }: SolutionUseProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    setSelected(value);
    setTimeout(() => onComplete(value), 400);
  };

  return (
    <StoryStage
      stage="solution-use"
      textContentClassName="p-6 md:p-16"
      footer={
        <div className="flex flex-row gap-6 justify-center flex-wrap">
          {OPTIONS.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`text-center px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
                selected === option
                  ? 'bg-gray-800/60 border-2 border-gray-600'
                  : 'bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50'
              }`}
            >
              <span
                className="text-lg md:text-xl text-gray-300 font-light"
                style={{ fontFamily: 'var(--font-literata), serif' }}
              >
                {option}
              </span>
            </button>
          ))}
        </div>
      }
    >
      <h1
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto"
        style={{ fontFamily: 'var(--font-literata), serif' }}
      >
        A sada da se osvrnemo na rešenje.
        <br />
        <br />
        Da li koristiš životinje?
      </h1>
    </StoryStage>
  );
}
