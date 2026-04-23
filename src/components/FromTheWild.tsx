'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface FromTheWildProps {
  onComplete: () => void;
}

export default function FromTheWild({ onComplete }: FromTheWildProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Sve domaće vrste potiču od divljih vrsta - nekada su to bile slobodne životinje.',
    'Ljudi su im ukrali slobodu i preuzeli potpunu kontrolu nad njihovim životima, uključujući kontrolu reprodukcije.',
    'Životinje nemaju nikakav izbor.',
  ];

  return (
    <StoryStage
      stage="from-the-wild"
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
