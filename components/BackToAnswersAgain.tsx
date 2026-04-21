'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/contexts/NavigationContext';
import { AnswerId } from '@/lib/answerIds';
import { mapLocalizedAnswerOptions } from '@/lib/mapLocalizedAnswerOptions';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import StoryStage from './ui/StoryStage';

interface BackToAnswersAgainProps {
  onComplete: (answer: string) => void;
  answers?: Record<string, string>;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.AGREE, labelKey: 'options.agree' },
  { id: AnswerId.NO, labelKey: 'options.no' },
];

export default function BackToAnswersAgain({
  onComplete,
}: BackToAnswersAgainProps) {
  const t = useTranslations('BackToAnswersAgain');
  const [showOptions, setShowOptions] = useState(false);
  const options = mapLocalizedAnswerOptions(OPTIONS, t);

  const text = [
    '[placeholder] Ponovo — rekao si da...',
    'Ovaj ekran drugi put prikazuje prethodne odgovore i nudi poslednju priliku za promenu.',
  ];

  return (
    <StoryStage
      stage={StageId.BackToAnswersAgain}
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
