'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';
import { AnswerId } from '@/src/lib/answerIds';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import StoryStage from './ui/StoryStage';

interface AddressingContradictionProps {
  onComplete: (answer: string) => void;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.AGREE, labelKey: 'options.agree' },
  { id: AnswerId.DISAGREE, labelKey: 'options.disagree' },
];

export default function AddressingContradiction({
  onComplete,
}: AddressingContradictionProps) {
  const t = useTranslations('AddressingContradiction');
  const [showOptions, setShowOptions] = useState(false);
  const options = mapLocalizedAnswerOptions(OPTIONS, t);

  const text = [
    '[placeholder] Postoji kontradiktornost između tvojih uverenja i ponašanja.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <StoryStage
      stage={StageId.AddressingContradiction}
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
