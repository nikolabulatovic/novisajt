'use client';

import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import TextBackdrop from './ui/TextBackdrop';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

export default function RecognizingInjustice() {
  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['prepoznavanje-nepravde'];

  const text = [
    '[placeholder] Prepoznao si nepravdu, ali si odlučio da ne deluješ.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <PageContainer backgroundImage={backgroundImage} backgroundImageOpacity={opacity}>
      <ContentContainer spacing="lg">
        <div className="relative p-6 md:p-16">
          <TextBackdrop type="linear" />
          <div className="relative z-10">
            <AnimatedText
              text={text}
              speed={120}
              delayAfterComplete={800}
              textSize="md"
              alignment="center"
              onComplete={() => {}}
            />
          </div>
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
