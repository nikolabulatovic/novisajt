'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AnswerId } from '@/lib/answerIds';
import { mapLocalizedAnswerOptions } from '@/lib/mapLocalizedAnswerOptions';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
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
  const options = mapLocalizedAnswerOptions(OPTIONS, t);

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
      footer={
        showOptions ? (
          <AnswerOptions options={options} onSelect={handleAnswer} />
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
