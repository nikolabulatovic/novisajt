'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
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
      stage="intro"
      contentSpacing="sm"
      showBackgroundEffects={false}
      textSurfaceClassName="mx-1 sm:mx-2"
      textContentClassName="p-8 md:p-12"
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
