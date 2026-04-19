'use client';

import { useState } from 'react';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import Pill from './ui/Pill';
import StageTextSurface from './ui/StageTextSurface';

interface VeganismPrincipleProps {
  onComplete: () => void;
}

export default function VeganismPrinciple({
  onComplete,
}: VeganismPrincipleProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Princip koji se protivi korišćenju životinja zove se veganstvo.',
    'Na osnovu tvojih odgovora, već se slažeš sa ovim principom.',
    'Vreme je da počneš da ga praktikuješ.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['veganism-principle'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="veganism-principle"
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

        <div className="flex justify-center mt-8 md:mt-12">
          <Pill color="red" onClick={onComplete} show={showButton} />
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
