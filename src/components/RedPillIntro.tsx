'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface RedPillIntroProps {
  onComplete: () => void;
}

export default function RedPillIntro({ onComplete }: RedPillIntroProps) {
  const t = useTranslations('RedPillIntro');
  const [showButton, setShowButton] = useState(false);
  const text = t.raw('text') as string[];

  return (
    <StoryStage
      stage={StageId.Intro}
      footer={
        <NextButton onClick={onComplete} label={t('next')} show={showButton} />
      }
    >
      <AnimatedText
        text={text}
        delayAfterComplete={1000}
        textSize="md"
        alignment="center"
        wordTransitionDuration={3000}
        onComplete={() => setShowButton(true)}
      />
    </StoryStage>
  );
}
