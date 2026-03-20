'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface SpasaRevelationProps {
  onComplete: () => void;
}

export default function SpasaRevelation({ onComplete }: SpasaRevelationProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    { line: [{ text: 'Spasa je prase.', bold: true }] },
    { line: [{ text: 'Baš kao i mi, ona je svesna. Oseća strah, radoznalost, vezanost. Želi da živi.' }] },
    { line: [{ text: 'Spašena je jer je bila slatka. Jer se nekome učinila posebnom. Jer je pogled na nju probudio empatiju.' }] },
    { line: [{ text: 'Završila je u azilu. Danas se igra. Uči. Povezuje se sa ljudima i drugim životinjama.' }] },
  ];

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['spasa-revelation'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}>
      <ContentContainer spacing="lg">
        <div className='relative p-6 md:p-16'>
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

