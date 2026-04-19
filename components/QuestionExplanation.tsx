'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';
import { AnimatedTextBlock } from '@/lib/i18n/animatedText';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

interface QuestionExplanationProps {
  onComplete: () => void;
}

export default function QuestionExplanation({
  onComplete,
}: QuestionExplanationProps) {
  const [showButton, setShowButton] = useState(false);
  const t = useTranslations('QuestionExplanation');
  const text = t.raw('blocks') as AnimatedTextBlock;

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds.explanation;

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      maxWidth="lg"
    >
      <ContentContainer spacing="sm">
        <StageTextSurface
          stage="explanation"
          contentClassName="px-4 py-4 md:px-6 md:py-6"
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
        </StageTextSurface>

        <NextButton onClick={onComplete} label={t('next')} show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
