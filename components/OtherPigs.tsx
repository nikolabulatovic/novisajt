'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface OtherPigsProps {
  onComplete: () => void;
}

export default function OtherPigs({ onComplete }: OtherPigsProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Ostali prasići nisu imali tu sreću.',
    'Njima je dan smrti određen pre nego što su se rodili. Ne zato što je neko sadista — nego zato što postoji potražnja za njihovim telima.',
    'Neko im oduzima život jer mi to naručujemo. Kao proizvod. Kao robu.',
    'Industrija ne mrzi životinje. Industrija ih ne vidi.',
  ];

  return (
    <StoryStage
      stage="other-pigs"
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
