'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface FromTheWildProps {
  onComplete: () => void;
}

export default function FromTheWild({ onComplete }: FromTheWildProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Sve domaće vrste potiču od divljih vrsta - nekada su to bile slobodne životinje.',
    'Ljudi su im ukrali slobodu i preuzeli potpunu kontrolu nad njihovim životima, uključujući kontrolu reprodukcije.',
    'Životinje nemaju nikakav izbor.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['from-the-wild'];

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
