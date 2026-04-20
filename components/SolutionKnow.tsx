'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AnswerId } from '@/lib/answerIds';

import StoryStage from './ui/StoryStage';

interface SolutionKnowProps {
  onComplete: (answer: string) => void;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.YES, labelKey: 'options.yes' },
  { id: AnswerId.DONT_KNOW, labelKey: 'options.dontKnow' },
  { id: AnswerId.NO, labelKey: 'options.no' },
];

export default function SolutionKnow({ onComplete }: SolutionKnowProps) {
  const t = useTranslations('SolutionKnow');
  const [selected, setSelected] = useState<string | null>(null);

  const handleAnswer = (value: string) => {
    setSelected(value);
    setTimeout(() => onComplete(value), 400);
  };

  return (
    <StoryStage
      stage="solution-know"
      textContentClassName="p-6 md:p-16"
      footer={
        <div className="flex flex-row gap-6 justify-center flex-wrap">
          {OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className={`text-center px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
                selected === option.id
                  ? 'bg-gray-800/60 border-2 border-gray-600'
                  : 'bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50'
              }`}
            >
              <span
                className="text-lg md:text-xl text-gray-300 font-light"
                style={{ fontFamily: 'var(--font-literata), serif' }}
              >
                {t(option.labelKey)}
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
        Da li znaš da je moguće živeti zdrav život bez korišćenja životinja, kao
        milioni ljudi danas?
      </h1>
    </StoryStage>
  );
}
