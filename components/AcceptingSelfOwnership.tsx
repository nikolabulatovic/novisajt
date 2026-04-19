'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface AcceptingSelfOwnershipProps {
  onComplete: () => void;
}

export default function AcceptingSelfOwnership({
  onComplete,
}: AcceptingSelfOwnershipProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Tvoje uverenje je rezultat mentalita koji si prihvatio kao dete dok još nisi imao razvijeno razmišljanje. Ako izbaciš to uverenje iz glave i samo posmatraš, videćeš sledeće:',
    'Svako biće prirodno upravlja sobom. Mi možemo, zato što smo moćniji, fizički da upravljamo životinjama i da se ponašamo kao da njihova tela pripadaju nama.',
    'Međutim, jasno je kome čije telo pripada. Ta granica postoji bez obzira na to da li je poštujemo.',
  ];

  return (
    <StoryStage
      stage="accepting-self-ownership"
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
