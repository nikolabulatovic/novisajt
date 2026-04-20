'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AnswerId } from '@/lib/answerIds';

import AnimatedText from './ui/AnimatedText';
import StoryStage from './ui/StoryStage';

interface LetThemLiveProps {
  onComplete: (answer: string) => void;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.ACCEPT, labelKey: 'options.accept' },
  { id: AnswerId.REJECT, labelKey: 'options.reject' },
];

export default function LetThemLive({ onComplete }: LetThemLiveProps) {
  const t = useTranslations('LetThemLive');
  const [showOptions, setShowOptions] = useState(false);

  const text = [
    { line: [{ text: 'Druga svesna bića ne postoje da bi služila nama.' }] },
    {
      line: [
        {
          text: 'Ne postoje da bi bila iskorišćena. Ne postoje da bi bila potrošena.',
        },
      ],
    },
    { line: [{ text: 'Postoje iz istog razloga kao i mi:' }] },
    { line: [{ text: 'Da žive svoj život.', bold: true }] },
  ];

  const handleAnswer = (answer: string) => {
    onComplete(answer);
  };

  return (
    <StoryStage
      stage="let-them-live"
      textContentClassName="relative p-6 md:p-16"
      footer={
        showOptions ? (
          <div className="flex flex-row gap-6 justify-center flex-wrap px-4">
            {OPTIONS.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className="text-center px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50"
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
        ) : null
      }
    >
      <AnimatedText
        text={text}
        speed={120}
        delayAfterComplete={1000}
        textSize="md"
        alignment="center"
        onComplete={() => setShowOptions(true)}
      />
    </StoryStage>
  );
}
