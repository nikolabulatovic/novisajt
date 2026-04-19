'use client';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

export default function RecognizingInjustice() {
  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['prepoznavanje-nepravde'];

  const text = [
    '[placeholder] Prepoznao si nepravdu, ali si odlučio da ne deluješ.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="prepoznavanje-nepravde"
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
