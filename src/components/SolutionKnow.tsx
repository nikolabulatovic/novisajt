'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AnswerId } from '@/src/lib/answerIds';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';

import AnswerOptions from './ui/AnswerOptions';
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
  const options = mapLocalizedAnswerOptions(OPTIONS, t);

  const handleAnswer = (value: string) => {
    setSelected(value);
    setTimeout(() => onComplete(value), 400);
  };

  return (
    <StoryStage
      stage="solution-know"
      footer={
        <AnswerOptions
          options={options}
          onSelect={handleAnswer}
          selectedId={selected}
          containerClassName="flex flex-row gap-6 justify-center flex-wrap"
        />
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
