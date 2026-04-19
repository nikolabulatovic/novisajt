'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

interface RedPillIntroProps {
  onComplete: () => void;
}

export default function RedPillIntro({ onComplete }: RedPillIntroProps) {
  const t = useTranslations('RedPillIntro');
  const [showButton, setShowButton] = useState(false);
  const text = t.raw('text') as string[];

  const { backgroundImage, opacity } = sectionBackgrounds.intro;

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      showBackgroundEffects={false}
    >
      <ContentContainer spacing="sm">
        <StageTextSurface
          stage="intro"
          className="mx-1 sm:mx-2"
          contentClassName="p-8 md:p-12"
        >
          <AnimatedText
            text={text}
            delayAfterComplete={1000}
            textSize="md"
            alignment="center"
            wordTransitionDuration={3000}
            onComplete={() => setShowButton(true)}
          />
        </StageTextSurface>

        <NextButton onClick={onComplete} label={t('next')} show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
