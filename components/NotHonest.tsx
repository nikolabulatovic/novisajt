'use client';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

export default function NotHonest() {
  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['nisi-iskren'];

  const text = [
    '[placeholder] Nisi bio iskren prema sebi.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="nisi-iskren"
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
