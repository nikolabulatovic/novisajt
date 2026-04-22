'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import NextButton from './ui/NextButton';
import StageTextSurface from './ui/StageTextSurface';

interface HistoricalSlaveryProps {
  onComplete: () => void;
}

export default function HistoricalSlavery({
  onComplete,
}: HistoricalSlaveryProps) {
  const t = useTranslations('HistoricalSlavery');
  const content = t.raw('lines') as string[];
  const words = content.flatMap((sentence) =>
    sentence.trim() === '' ? [] : sentence.split(' '),
  );
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setVisibleWordCount(0);
    setShowButton(false);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setVisibleWordCount(currentIndex + 1);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 1000);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative w-full min-h-screen">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/robovi.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60 pointer-events-none blur-xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/50 to-black/100 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black/100 pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start gap-6 md:gap-12 h-full min-h-screen p-4 md:p-8">
        <div className="hidden md:block md:w-2/5 flex-shrink-0" />
        <div className="flex-1 space-y-6 pt-4">
          <StageTextSurface surface="panel" contentClassName="p-4 md:p-6">
            <div className="space-y-4 text-right">
              {content.map((sentence, sentenceIndex) => {
                if (sentence.trim() === '') {
                  return <div key={sentenceIndex} className="h-6" />;
                }

                const sentenceWords = sentence.split(' ');
                let wordStartIndex = 0;
                for (let i = 0; i < sentenceIndex; i++) {
                  if (content[i].trim() !== '') {
                    wordStartIndex += content[i].split(' ').length;
                  }
                }

                return (
                  <p
                    key={sentenceIndex}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed font-light text-gray-300"
                  >
                    {sentenceWords.map((word, wordIndex) => {
                      const currentWordIndex = wordStartIndex + wordIndex;
                      const isVisible = currentWordIndex < visibleWordCount;

                      return (
                        <span
                          key={wordIndex}
                          className={`transition-all duration-700 ease-out ${
                            isVisible
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4'
                          }`}
                          style={{
                            transitionDelay: isVisible
                              ? `${currentWordIndex * 20}ms`
                              : '0ms',
                          }}
                        >
                          {word}
                          {wordIndex < sentenceWords.length - 1 ? ' ' : ''}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>
          </StageTextSurface>
        </div>
      </div>

      <div
        className={`absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 transition-opacity duration-500 ${
          showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <NextButton
          onClick={onComplete}
          label={t('next')}
          show={showButton}
          marginTop="none"
        />
      </div>
    </div>
  );
}
