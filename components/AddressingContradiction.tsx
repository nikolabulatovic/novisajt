'use client';

import { useState } from 'react';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

interface AddressingContradictionProps {
  onComplete: (answer: string) => void;
}

const OPTIONS = ['Tačno', 'Nije tačno'] as const;

export default function AddressingContradiction({
  onComplete,
}: AddressingContradictionProps) {
  const [showOptions, setShowOptions] = useState(false);
  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['kontradiktornost-je'];

  const text = [
    '[placeholder] Postoji kontradiktornost između tvojih uverenja i ponašanja.',
    'Ovaj ekran treba da bude popunjen sadržajem.',
  ];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage="kontradiktornost-je"
          contentClassName="relative p-6 md:p-16"
        >
          <AnimatedText
            text={text}
            speed={120}
            delayAfterComplete={1000}
            textSize="md"
            alignment="center"
            onComplete={() => setShowOptions(true)}
          />
        </StageTextSurface>

        {showOptions && (
          <div className="flex flex-row gap-6 justify-center flex-wrap px-4">
            {OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => onComplete(option)}
                className="text-center px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50"
              >
                <span
                  className="text-lg md:text-xl text-gray-300 font-light"
                  style={{ fontFamily: 'var(--font-literata), serif' }}
                >
                  {option}
                </span>
              </button>
            ))}
          </div>
        )}
      </ContentContainer>
    </PageContainer>
  );
}
