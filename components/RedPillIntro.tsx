'use client';

import { useState, useEffect } from 'react';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface RedPillIntroProps {
  onComplete: () => void;
}

export default function RedPillIntro({ onComplete }: RedPillIntroProps) {
  const [showButton, setShowButton] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

  const text = [
    'Tvoj izbor je da vidiš istinu i to zahteva hrabrost.',
    'Neće biti prijatno. Ali će biti iskreno.',
    'Prvo ćemo ti postaviti tri pitanja.',
  ];

  useEffect(() => {
    setTimeout(() => {
      setImageVisible(true);
    }, 300);
  }, []);

  const { backgroundImage, opacity } = sectionBackgrounds.intro;

  return (
    <PageContainer
      className="overflow-hidden"
      backgroundImage={imageVisible ? backgroundImage : undefined}
      backgroundImageOpacity={opacity}
      overlayOpacity={0}
      showBackgroundEffects={false}>
      {/* Custom animated background effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none z-0'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <ContentContainer spacing="sm">
        <div className='bg-gray-900/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/20 shadow-2xl'>
          <AnimatedText
            text={text}
            delayAfterComplete={1000}
            textSize="md"
            alignment="center"
            wordTransitionDuration={3000}
            onComplete={() => setShowButton(true)}
          />
        </div>

        <NextButton
          onClick={onComplete}
          label='Nastavi'
          show={showButton}
        />
      </ContentContainer>
    </PageContainer>
  );
}
