'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/contexts/NavigationContext';

import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface HistoricalIntroProps {
  onComplete: () => void;
}

export default function HistoricalIntro({ onComplete }: HistoricalIntroProps) {
  const t = useTranslations('HistoricalIntro');
  const intro = t.raw('lines') as string[];
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setVisibleLines([]);
    setShowButton(false);

    intro.forEach((_, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
        if (index === intro.length - 1) {
          setTimeout(() => setShowButton(true), 1000);
        }
      }, index * 600);
    });
  }, [intro]);

  return (
    <StoryStage
      stage={StageId.HistoricalIntro}
      footer={
        <NextButton onClick={onComplete} label={t('next')} show={showButton} />
      }
    >
      <div className="space-y-8 md:space-y-12">
        {intro.map((line, index) => {
          if (line === '') {
            return <div key={index} className="h-8" />;
          }
          return (
            <p
              key={index}
              className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 text-center leading-relaxed transition-all duration-1000 ease-out px-4 ${
                visibleLines.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {line}
            </p>
          );
        })}
      </div>
    </StoryStage>
  );
}
