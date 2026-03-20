'use client';

import { useState } from 'react';
import Pill from './ui/Pill';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';
import PageContainer from './ui/PageContainer';

interface ChoiceStageProps {
  onPillChoice: (pill: 'red' | 'blue') => void;
}

export default function ChoiceStage({ onPillChoice }: ChoiceStageProps) {
  const [selectedPill, setSelectedPill] = useState<'red' | 'blue' | null>(null);

  const handlePillClick = (pill: 'red' | 'blue') => {
    if (selectedPill !== null) return;
    setSelectedPill(pill);
    onPillChoice(pill);
  };

  const { backgroundImage, opacity } = sectionBackgrounds.choice;

  return (
    <PageContainer backgroundImage={backgroundImage} backgroundImageOpacity={opacity} overlayOpacity={0} showBackgroundEffects={false}>
      {/* Animated background - minimal */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto text-center space-y-12 animate-fade-in'>
        <div className='space-y-6 mt-48'>
          <h1 className='text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-300 via-purple-400 to-gray-300 bg-clip-text text-transparent animate-gradient'>
            Izaberi
          </h1>
        </div>

        {/* Dva dugmeta - pilule */}
        <div className='flex flex-row items-center justify-around gap-8 sm:gap-12 md:gap-16 mt-16 sm:mt-24 md:mt-32'>
          {/* Plava pilula */}
          <div className='flex flex-col items-center space-y-6'>
            <Pill
              color='blue'
              onClick={() => handlePillClick('blue')}
              isSelected={selectedPill === 'blue'}
            />
            <div className='text-center space-y-2'>
              <p className='text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300'>
                Ostani
              </p>
              <p className='text-sm md:text-base lg:text-lg text-gray-400 max-w-xs'>
                Ostani udoban u poznatom.
              </p>
            </div>
          </div>

          {/* Crvena pilula */}
          <div className='flex flex-col items-center space-y-6'>
            <Pill
              color='red'
              onClick={() => handlePillClick('red')}
              isSelected={selectedPill === 'red'}
            />
            <div className='text-center space-y-2'>
              <p className='text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300'>
                Vidi
              </p>
              <p className='text-sm md:text-base lg:text-lg text-gray-400 max-w-xs'>
                Otkrij istinu o sebi i svetu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
