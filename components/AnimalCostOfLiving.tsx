'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface AnimalCostOfLivingProps {
  onComplete: () => void;
}

export default function AnimalCostOfLiving({
  onComplete,
}: AnimalCostOfLivingProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Životinja se drži u životu dok se od nje može zaraditi.',
    'Držati je znači obezbediti prostor, hranu, vodu i negu.',
    'Kada više ne donosi prihod, ljudi je uklanjaju.',
    'Svake godine stvaramo nove životinje da bismo ih koristili.',
    'Zato ih ne izdržavamo do prirodne starosti.',
  ];

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['animal-cost-of-living'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
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
