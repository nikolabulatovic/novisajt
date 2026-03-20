'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface ViciousCycleProps {
  onComplete: () => void;
}

export default function ViciousCycle({ onComplete }: ViciousCycleProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Prisilnom veštačkom oplodnjom stvaramo milijarde novih životinja godišnje.',
    'To je neprestani ciklus.',
    'Pilići se razdvajaju po polu čim se ispile i muški se ubijaju ubrzo nakon rođenja jer nisu isplativi.',
    'Ženke postaju koke nosilje.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['vicious-cycle'];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}>
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
