'use client';

import { useState } from 'react';

import AnimatedText from './ui/AnimatedText';
import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface AnimalsTreatedAsProductsProps {
  onComplete: () => void;
}

export default function AnimalsTreatedAsProducts({
  onComplete,
}: AnimalsTreatedAsProductsProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Životinje se ne eksploatišu samo zarad tanjira.',
    'Koriste se gde god postoji korist. Njihova tela postaju materijal.',
    'Za garderobu — koža, krzno, vuna, svila.',
    'Za testiranje — kozmetika, lekovi, hemikalije.',
    'Za zabavu — zoološki vrtovi, cirkusi, trke.',
    'I u svakoj od tih uloga, one su posmatrane kao stvari, a ne kao bića.',
  ];

  return (
    <StoryStage
      stage="animals-treated-as-products"
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
