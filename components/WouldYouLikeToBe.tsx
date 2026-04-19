'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';
import AnimatedText from './ui/AnimatedText';
import StoryStage from './ui/StoryStage';

interface WouldYouLikeToBeProps {
  onComplete: (answer: string) => void;
}

export default function WouldYouLikeToBe({
  onComplete,
}: WouldYouLikeToBeProps) {
  const t = useTranslations('WouldYouLikeToBe');
  const [showOptions, setShowOptions] = useState(false);

  const text = t.raw('text') as string[];
  const options = t.raw('options') as string[];

  return (
    <StoryStage
      stage="da-li-bi-voleo"
      textContentClassName="relative p-6 md:p-16"
      footer={
        showOptions ? (
          <div className="flex flex-row gap-6 justify-center flex-wrap px-4">
            {options.map((option) => (
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
        ) : null
      }
    >
      <AnimatedText
        text={text}
        speed={120}
        delayAfterComplete={1000}
        textSize="md"
        alignment="center"
        onComplete={() => setShowOptions(true)}
      />
    </StoryStage>
  );
}
