'use client';

import { useState } from 'react';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

interface ViciousCycleProps {
  onComplete: () => void;
}

export default function ViciousCycle({ onComplete }: ViciousCycleProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Prisilnom veštačkom oplodnjom stvaramo milijarde novih životinja godišnje.',
    'To je neprestani ciklus.',
    'Pilići se razdvajaju po polu čim se ispile i muški se ubijaju ubrzo nakon rođenja jer nisu isplativi.',
    'Ženke postaju koke nosilje.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['vicious-cycle'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="vicious-cycle"
          contentClassName="relative p-6 md:p-16"
        >
          <AnimatedText
            text={text}
            speed={120}
            delayAfterComplete={1000}
            textSize="md"
            alignment="center"
            onComplete={() => setShowButton(true)}
          />
        </StageTextSurface>

        <NextButton onClick={onComplete} label="Nastavi" show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
