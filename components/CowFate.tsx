'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface CowFateProps {
  onComplete: () => void;
}

export default function CowFate({ onComplete }: CowFateProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Telad se oduzimaju majkama kravama.',
    'Većina muških teladi se ubija ubrzo nakon rođenja. Prodaju se i zatim zakolju za meso, da se od njih zaradi.',
    'Ženke su prisiljene da postanu mašine za mleko, kao njihove majke.',
  ];

  return (
    <StoryStage
      stage="cow-fate"
      textContentClassName="relative p-6 md:p-16"
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
