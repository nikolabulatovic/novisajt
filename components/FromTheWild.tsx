'use client';

import { useState } from 'react';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

interface FromTheWildProps {
  onComplete: () => void;
}

export default function FromTheWild({ onComplete }: FromTheWildProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Sve domaće vrste potiču od divljih vrsta - nekada su to bile slobodne životinje.',
    'Ljudi su im ukrali slobodu i preuzeli potpunu kontrolu nad njihovim životima, uključujući kontrolu reprodukcije.',
    'Životinje nemaju nikakav izbor.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['from-the-wild'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="from-the-wild"
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
