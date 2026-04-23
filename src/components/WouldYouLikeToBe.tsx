'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';
import type { LocalizedAnswerOption } from '@/src/lib/answerIds';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import StoryStage from './ui/StoryStage';

interface WouldYouLikeToBeProps {
  onComplete: (answer: string) => void;
}

export default function WouldYouLikeToBe({
  onComplete,
}: WouldYouLikeToBeProps) {
  const t = useTranslations('WouldYouLikeToBe');
  const [showOptions, setShowOptions] = useState(false);

  const text = t.raw('text') as string[];
  const options = (t.raw('options') as LocalizedAnswerOption[]).map(
    (option) => ({
      id: option.id,
      label: option.label,
    }),
  );

  return (
    <StoryStage
      stage={StageId.WouldYouLikeToBe}
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
