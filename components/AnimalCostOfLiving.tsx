'use client';

import { useState } from 'react';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import TextBackdrop from './ui/TextBackdrop';

interface AnimalCostOfLivingProps {
  onComplete: () => void;
}

export default function AnimalCostOfLiving({
  onComplete,
}: AnimalCostOfLivingProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Životinje se ne ubijaju samo zbog mesa.',
    'Finansijski je neodrživo držati domaće životinje do njihove prirodne starosti.',
    'Veliki je novčani gubitak.',
    'Ubijanje je uslov opstanka svakog posla koji zavisi od uzgoja životinja.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['animal-cost-of-living'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
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

        <NextButton onClick={onComplete} label="Nastavi" show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
