'use client';

import { useState } from 'react';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import TextBackdrop from './ui/TextBackdrop';
import ContentContainer from './ui/ContentContainer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface VeganDietHealthProps {
  onComplete: (answer: string) => void;
}

const OPTIONS = ['Prihvatam', 'Nije me ubedilo'] as const;

export default function VeganDietHealth({ onComplete }: VeganDietHealthProps) {
  const [showOptions, setShowOptions] = useState(false);

  const text = [
    'Zdravlje ljudi koji jedu pretežno ili potpuno biljnu hranu proučavaju se u nauci već decenijama.',
    'Na osnovu velikog broja istraživanja, mnoge velike medicinske i dijetološke organizacije objavile su zvanične stavove o veganskoj ishrani.',
    'Ti stavovi navode da biljna ishrana može biti nutritivno potpuna i pogodna za sve životne faze, uključujući detinjstvo, trudnoću i starije doba, kao i za sportiste.',
  ];

  const { backgroundImage, opacity = 0.8 } =
    sectionBackgrounds['vegan-diet-health'];

  const handleAnswer = (value: string) => {
    onComplete(value);
  };

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      overlayOpacity={0.5}>
      <ContentContainer spacing="lg">
        <div className="relative p-6 md:p-16">
          <TextBackdrop type="linear" />
          <div className="relative z-10">
            <AnimatedText
              text={text}
              speed={120}
              delayAfterComplete={1000}
              textSize="md"
              alignment="center"
              onComplete={() => setShowOptions(true)}
            />
          </div>
        </div>

        {showOptions && (
          <div className="flex flex-row gap-6 justify-center flex-wrap px-4">
            {OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="text-center px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50">
                <span
                  className="text-lg md:text-xl text-gray-300 font-light"
                  style={{ fontFamily: 'var(--font-literata), serif' }}>
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
