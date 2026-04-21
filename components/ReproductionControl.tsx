'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface ReproductionControlProps {
  onComplete: () => void;
}

export default function ReproductionControl({
  onComplete,
}: ReproductionControlProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Parili smo ih i oblikovali po našim željama, na njihovu štetu.',
    'Krave sa hroničnim upalama vimena.',
    'Kokoške koje nose 250–300 jaja godišnje umesto nekoliko desetina.',
    'Ovce čija je vuna postala teret.',
    'To nije suživot.',
    'To je biološka dominacija.',
  ];

  return (
    <StoryStage
      stage="reproduction-control"
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
