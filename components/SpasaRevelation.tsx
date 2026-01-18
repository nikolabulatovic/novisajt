'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';

interface SpasaRevelationProps {
  onComplete: () => void;
}

export default function SpasaRevelation({ onComplete }: SpasaRevelationProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Spasa je prase. I, baš kao ljudi i druge životinje, ona je svesna i osećajna — želi da živi svoj život.',
    'Spašena je zato što je profesorima veterine bila slatka. Porasla je u azilu i tamo se i dalje povezuje i druži sa ljudima i sa drugim životinjama.',
  ];

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

