'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';

interface SpasaRevelationPart2Props {
  onComplete: () => void;
}

export default function SpasaRevelationPart2({
  onComplete,
}: SpasaRevelationPart2Props) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Koren problema je to što se životinje gledaju kao objekti i resursi, a ne kao svesna bića koja jesu. Ne poštujemo ih u najosnovnijem smislu.',
    'Druga bića ne postoje da bismo ih mi koristili. Tu su da žive svoj život.',
  ];

  return (
    <PageContainer
      backgroundImage="/images/spasa-revelation-part2-bg.jpg"
      backgroundImageOpacity={0.8}
      overlayOpacity={0.5}>
      <ContentContainer spacing="lg">
        <div className='relative p-16'>
          <TextBackdrop type="linear" />
          <div className='relative z-10'>
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

        <NextButton onClick={onComplete} label='Nastavi' show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}

