'use client';

import { useState } from 'react';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface DomesticationReproductionProps {
  onComplete: () => void;
}

export default function DomesticationReproduction({
  onComplete,
}: DomesticationReproductionProps) {
  const [showButton, setShowButton] = useState(false);

  const text =
    'Oduzeta sloboda. Biološke deformacije. Patnja kao nusprodukt "efikasnosti". Naša obaveza nije da ih koristimo humanije – već da ih ostavimo na miru.';

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds.domestication;

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      maxWidth="lg">
      <ContentContainer spacing="md" align="left">
        <div className="px-8">
          <AnimatedText
            text={text}
            speed={120}
            delayAfterComplete={2000}
            textSize="md"
            alignment="left"
            wordTransitionDuration={1200}
            onComplete={() => setShowButton(true)}
          />
        </div>

        <NextButton onClick={onComplete} label='Nastavi' show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
