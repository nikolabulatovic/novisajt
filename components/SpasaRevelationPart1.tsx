'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface SpasaRevelationPart1Props {
  onComplete: () => void;
}

export default function SpasaRevelationPart1({
  onComplete,
}: SpasaRevelationPart1Props) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Ostali prasići nisu imali tu sreću.',
    'Njima je dan smrti određen pre nego što su se rodili. Ne zato što je neko monstrum — nego zato što to neko traži.',
    'Neko proizvodi smrt jer je mi naručujemo. Kao proizvod. Kao robu.',
    'Industrija ne mrzi životinje. Industrija ih ne vidi.',
  ];

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['spasa-revelation-part1'];

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

