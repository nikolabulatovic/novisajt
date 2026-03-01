'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface SpasaRevelationPart4Props {
  onComplete: () => void;
}

export default function SpasaRevelationPart4({
  onComplete,
}: SpasaRevelationPart4Props) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    { line: [{ text: 'Druga svesna bića ne postoje da bi služila nama.' }] },
    { line: [{ text: 'Ne postoje da bi bila iskorišćena. Ne postoje da bi bila potrošena.' }] },
    { line: [{ text: 'Postoje iz istog razloga kao i mi:' }] },
    { line: [{ text: 'Da žive svoj život.', bold: true }] },
  ];

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['spasa-revelation-part4'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      overlayOpacity={0.5}>
      <ContentContainer spacing="lg">
        <div className='relative p-16'>
          <TextBackdrop type="linear" />
          <div className='relative z-10'>
            <AnimatedText
              text={text}
              speed={120}
              delayAfterComplete={1000}
              textSize="md"
              alignment="center"
              onComplete={() => setShowButton(true)}
            />
          </div>
        </div>

        <NextButton onClick={onComplete} label='Nastavi' show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
