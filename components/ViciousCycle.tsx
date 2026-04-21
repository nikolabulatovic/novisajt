'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface ViciousCycleProps {
  onComplete: () => void;
}

export default function ViciousCycle({ onComplete }: ViciousCycleProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Prisilnom veštačkom oplodnjom stvaramo milijarde novih životinja godišnje.',
    'To je neprestani ciklus.',
    'Pilići se razdvajaju po polu čim se ispile i muški se ubijaju ubrzo nakon rođenja jer nisu isplativi.',
    'Ženke postaju koke nosilje.',
  ];

  return (
    <StoryStage
      stage="vicious-cycle"
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
