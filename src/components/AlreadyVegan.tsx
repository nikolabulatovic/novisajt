'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';
import { AnswerId } from '@/src/lib/answerIds';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import StoryStage from './ui/StoryStage';

interface AlreadyVeganProps {
  onComplete: (answer: string) => void;
}

const OPTIONS: Array<{ id: string; labelKey: string }> = [
  { id: AnswerId.YES, labelKey: 'options.ready' },
  { id: AnswerId.NO, labelKey: 'options.moreInfo' },
];

export default function AlreadyVegan({ onComplete }: AlreadyVeganProps) {
  const t = useTranslations('AlreadyVegan');
  const [showOptions, setShowOptions] = useState(false);
  const options = mapLocalizedAnswerOptions(OPTIONS, t);

  const text = t.raw('text') as string[];

  return (
    <StoryStage
      stage={StageId.AlreadyVegan}
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
