'use client';

import { useState } from 'react';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import TextBackdrop from './ui/TextBackdrop';
import Pill from './ui/Pill';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface AdditionalResourcesProps {
  onComplete: () => void;
}

export default function AdditionalResources({ onComplete }: AdditionalResourcesProps) {
  const [showButton, setShowButton] = useState(false);
  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['nije-ubedilo-resursi'];

  const text = [
    '[placeholder] Razumemo tvoju sumnju. Evo dodatnih resursa i dokaza.',
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
              delayAfterComplete={1000}
              textSize="md"
              alignment="center"
              onComplete={() => setShowButton(true)}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <Pill color="red" onClick={onComplete} show={showButton} />
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
