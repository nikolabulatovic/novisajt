'use client';

import { useState } from 'react';
import PageContainer from './ui/PageContainer';
import { useLineAnimation } from '@/hooks/useLineAnimation';
import NextButton from './ui/NextButton';
import ContentContainer from './ui/ContentContainer';

interface AnimalsIntroductionProps {
  onComplete: () => void;
}

export default function AnimalsIntroduction({
  onComplete,
}: AnimalsIntroductionProps) {
  const [showButton, setShowButton] = useState(false);

  const lines = [
    { text: 'Ljudi nisu jedina svesna bića.', bold: false },
    { text: 'Životinje imaju svest.', bold: false },
    { text: 'Životinje imaju osećanja.', bold: false },
    { text: 'Ljudi su takođe životinje.', bold: false },
  ];

  const { visibleLines } = useLineAnimation({
    lines,
    delayBetweenLines: 600,
    delayAfterComplete: 1000,
    onComplete: () => setShowButton(true),
  });

  return (
    <PageContainer maxWidth="md">
      <ContentContainer spacing="md" align="center">
        <div className='space-y-6 md:space-y-10'>
          {lines.map((line, index) => {
            const sizeClass =
              index === 0 || index === 3
                ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
                : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl';
            return (
              <p
                key={index}
                className={`${sizeClass} font-light text-gray-200 leading-tight transition-all duration-800 ease-out ${visibleLines.includes(index)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                  }`}>
                {line.text}
              </p>
            );
          })}
        </div>

        <NextButton onClick={onComplete} label='Nastavi' show={showButton} />
      </ContentContainer>
    </PageContainer>
  );
}
