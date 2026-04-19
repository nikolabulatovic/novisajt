'use client';

import { useState } from 'react';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import Pill from './ui/Pill';
import StageTextSurface from './ui/StageTextSurface';

interface AdditionalResourcesProps {
  onComplete: () => void;
}

export default function AdditionalResources({
  onComplete,
}: AdditionalResourcesProps) {
  const [showButton, setShowButton] = useState(false);
  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['nije-ubedilo-resursi'];

  const text = [
    '[placeholder] Razumemo tvoju sumnju. Evo dodatnih resursa i dokaza.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="nije-ubedilo-resursi"
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
