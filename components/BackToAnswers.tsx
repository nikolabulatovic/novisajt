'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/contexts/NavigationContext';
import { AnswerId } from '@/lib/answerIds';
import { mapLocalizedAnswerOptions } from '@/lib/mapLocalizedAnswerOptions';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import StoryStage from './ui/StoryStage';

interface BackToAnswersProps {
  onComplete: (answer: string) => void;
  answers?: Record<string, string>;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.AGREE, labelKey: 'options.agree' },
  { id: AnswerId.NO, labelKey: 'options.no' },
];

export default function BackToAnswers({ onComplete }: BackToAnswersProps) {
  const t = useTranslations('BackToAnswers');
  const [showOptions, setShowOptions] = useState(false);
  const options = mapLocalizedAnswerOptions(OPTIONS, t);

  const text = [
    '[placeholder] Rekao si da...',
    'Ovaj ekran prikazuje prethodne odgovore korisnika i vraća ih na razmišljanje.',
  ];

  return (
    <StoryStage
      stage={StageId.BackToAnswers}
      footer={
        showOptions ? (
          <AnswerOptions options={options} onSelect={onComplete} />
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
