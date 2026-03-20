'use client';

import { useState } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface RootOfTheProblemProps {
  onComplete: () => void;
}

export default function RootOfTheProblem({
  onComplete,
}: RootOfTheProblemProps) {
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Ali koren problema nije industrija. Industrija je samo savremeni oblik iste stare ideje.',
    'Problem je stariji od fabrika. Stariji od traka, klanica i korporacija.',
    'To je mentalitet.',
    'Verovanje da druga bića postoje da bi bila korišćena. Da je normalno pretvoriti nekoga u proizvod.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['root-of-the-problem'];

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
