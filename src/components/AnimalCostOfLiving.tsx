'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

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

  return (
    <StoryStage
      stage="animal-cost-of-living"
      footer={
        <NextButton onClick={onComplete} label="Nastavi" show={showButton} />
      }
    >
      <AnimatedText
        text={text}
        speed={120}
        delayAfterComplete={1000}
        textSize="md"
        alignment="center"
        onComplete={() => setShowButton(true)}
      />
    </StoryStage>
  );
}
