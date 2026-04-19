'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface SpasaRevelationProps {
  onComplete: () => void;
}

export default function SpasaRevelation({ onComplete }: SpasaRevelationProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    { line: [{ text: 'Spasa je prase.', bold: true }] },
    {
      line: [
        {
          text: 'Baš kao i mi, ona je svesna. Oseća strah, radoznalost, vezanost. Želi da živi.',
        },
      ],
    },
    {
      line: [
        {
          text: 'Spašena je jer je bila slatka. Jer se nekome učinila posebnom. Jer je pogled na nju probudio empatiju.',
        },
      ],
    },
    {
      line: [
        {
          text: 'Završila je u azilu. Danas se igra. Uči. Povezuje se sa ljudima i drugim životinjama.',
        },
      ],
    },
  ];

  return (
    <StoryStage
      stage="spasa-revelation"
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
