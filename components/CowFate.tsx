'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface CowFateProps {
  onComplete: () => void;
}

export default function CowFate({ onComplete }: CowFateProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Telad se oduzimaju majkama kravama.',
    'Većina muških teladi se ubija ubrzo nakon rođenja. Prodaju se i zatim zakolju za meso, da se od njih zaradi.',
    'Ženke su prisiljene da postanu mašine za mleko, kao njihove majke.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['cow-fate'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      overlayOpacity={0.5}>
      <ContentContainer spacing='lg'>
        <div className='relative p-6 md:p-16'>
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
