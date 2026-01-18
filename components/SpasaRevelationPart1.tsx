'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';

interface SpasaRevelationPart1Props {
  onComplete: () => void;
}

export default function SpasaRevelationPart1({
  onComplete,
}: SpasaRevelationPart1Props) {
  const [showButton, setShowButton] = useState(false);

  const text =
    'Ostali prasići nisu imali tu sreću. Njima je neko predodredio dan smrti, pre njihovog rođenja. Ne zato što je taj neko sadista - nego zato što ispunjava potražnju. Radi to što drugi ljudi traže od njega da radi.';

  return (
    <PageContainer
      backgroundImage="/images/spasa-revelation-bg.jpg"
      backgroundImageOpacity={0.8}
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

