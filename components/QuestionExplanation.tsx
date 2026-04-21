'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { AnimatedTextBlock } from '@/lib/i18n/animatedText';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface QuestionExplanationProps {
  onComplete: () => void;
}

export default function QuestionExplanation({
  onComplete,
}: QuestionExplanationProps) {
  const [showButton, setShowButton] = useState(false);
  const t = useTranslations('QuestionExplanation');
  const text = t.raw('blocks') as AnimatedTextBlock;

  return (
    <StoryStage
      stage="explanation"
      footer={
        <NextButton onClick={onComplete} label={t('next')} show={showButton} />
      }
    >
      <AnimatedText
        text={text}
        speed={100}
        delayAfterComplete={1200}
        textSize="lg"
        alignment="center"
        wordTransitionDuration={5000}
        onComplete={() => setShowButton(true)}
      />
    </StoryStage>
  );
}
