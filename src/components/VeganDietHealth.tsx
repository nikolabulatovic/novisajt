'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AnswerId } from '@/src/lib/answerIds';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import StoryStage from './ui/StoryStage';

interface VeganDietHealthProps {
  onComplete: (answer: string) => void;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.ACCEPT, labelKey: 'options.accept' },
  { id: AnswerId.REJECT, labelKey: 'options.reject' },
];

export default function VeganDietHealth({ onComplete }: VeganDietHealthProps) {
  const t = useTranslations('VeganDietHealth');
  const [showOptions, setShowOptions] = useState(false);
  const options = mapLocalizedAnswerOptions(OPTIONS, t);

  const text = [
    'Zdravlje ljudi koji jedu pretežno ili potpuno biljnu hranu proučavaju se u nauci već decenijama.',
    'Na osnovu velikog broja istraživanja, mnoge velike medicinske i dijetološke organizacije objavile su zvanične stavove o veganskoj ishrani.',
    'Ti stavovi navode da biljna ishrana može biti nutritivno potpuna i pogodna za sve životne faze, uključujući detinjstvo, trudnoću i starije doba, kao i za sportiste.',
  ];

  const handleAnswer = (value: string) => {
    onComplete(value);
  };

  return (
    <StoryStage
      stage="vegan-diet-health"
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
