'use client';

import { useState } from 'react';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

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

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['animals-treated-as-products'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="animals-treated-as-products"
          contentClassName="relative p-6 md:p-16"
        >
          <AnimatedText
            text={text}
            speed={120}
            delayAfterComplete={1000}
            textSize="md"
            alignment="center"
            onComplete={() => setShowButton(true)}
          />
        </StageTextSurface>

        <NextButton onClick={onComplete} label="Nastavi" show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
