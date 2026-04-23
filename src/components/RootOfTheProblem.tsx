'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface RootOfTheProblemProps {
  onComplete: () => void;
}

export default function RootOfTheProblem({
  onComplete,
}: RootOfTheProblemProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Ali koren problema nije industrija. Industrija je samo savremeni oblik iste stare ideje.',
    'Problem je stariji od fabrika. Stariji od traka, klanica i korporacija.',
    'To je mentalitet.',
    'Verovanje da druga bića postoje da bi bila korišćena. Da je normalno pretvoriti nekoga u proizvod ili sredstvo.',
  ];

  return (
    <StoryStage
      stage="root-of-the-problem"
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
