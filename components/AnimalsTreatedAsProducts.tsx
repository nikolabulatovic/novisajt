'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

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
      overlayOpacity={0.5}>
      <ContentContainer spacing='lg'>
        <div className='relative p-16'>
          <TextBackdrop type='linear' />
          <div className='relative z-10'>
            <AnimatedText
              text={text}
              speed={120}
              delayAfterComplete={1000}
              textSize='md'
              alignment='center'
              onComplete={() => setShowButton(true)}
            />
          </div>
        </div>

        <NextButton onClick={onComplete} label='Nastavi' show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
