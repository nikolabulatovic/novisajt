'use client';

import { useState } from 'react';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

interface OtherPigsProps {
  onComplete: () => void;
}

export default function OtherPigs({ onComplete }: OtherPigsProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Ostali prasići nisu imali tu sreću.',
    'Njima je dan smrti određen pre nego što su se rodili. Ne zato što je neko sadista — nego zato što postoji potražnja za njihovim telima.',
    'Neko im oduzima život jer mi to naručujemo. Kao proizvod. Kao robu.',
    'Industrija ne mrzi životinje. Industrija ih ne vidi.',
  ];

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['other-pigs'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="other-pigs"
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
