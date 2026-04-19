'use client';

import { useTranslations } from 'next-intl';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

export default function ApatheticStance() {
  const t = useTranslations('ApatheticStance');
  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['apatican-stav'];
  const text = t.raw('text') as string[];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="apatican-stav"
          contentClassName="relative p-6 md:p-16"
        >
          <AnimatedText
            text={text}
            speed={120}
            delayAfterComplete={800}
            textSize="md"
            alignment="center"
            onComplete={() => {}}
          />
        </StageTextSurface>
      </ContentContainer>
    </PageContainer>
  );
}
