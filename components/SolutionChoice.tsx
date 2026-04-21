'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AnswerId } from '@/lib/answerIds';
import { mapLocalizedAnswerOptions } from '@/lib/mapLocalizedAnswerOptions';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import StoryStage from './ui/StoryStage';

interface SolutionChoiceProps {
  onComplete: (answer: string) => void;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.AGREE, labelKey: 'options.agree' },
  { id: AnswerId.DISAGREE, labelKey: 'options.disagree' },
];

export default function SolutionChoice({ onComplete }: SolutionChoiceProps) {
  const t = useTranslations('SolutionChoice');
  const [showOptions, setShowOptions] = useState(false);
  const options = mapLocalizedAnswerOptions(OPTIONS, t);

  const text = [
    'Moguće je živeti bez korišćenja životinja.',
    'Imamo izbor.',
    '',
    'Složili smo se da životinje treba pustiti da žive svoj život.',
    'Nastaviti da ih koristiš znači da će se i dalje uzgajati, eksploatisati i ubijati kao direktna posledica tvog izbora.',
    '',
    'To je biranje suprotno sopstvenom uverenju.',
  ];

  const handleAnswer = (value: string) => {
    onComplete(value);
  };

  return (
    <StoryStage
      stage="solution-choice"
      textContentClassName="relative p-6 md:p-16"
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
