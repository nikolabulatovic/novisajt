'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import Pill from './ui/Pill';
import StoryStage from './ui/StoryStage';

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

  return (
    <StoryStage
      stage="veganism-principle"
      footer={
        <div className="flex justify-center mt-8 md:mt-12">
          <Pill color="red" onClick={onComplete} show={showButton} />
        </div>
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
