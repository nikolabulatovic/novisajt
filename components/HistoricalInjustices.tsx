'use client';

import { useState, useEffect } from 'react';

interface HistoricalInjusticesProps {
  onComplete: () => void;
}

const injustices = [
  {
    title: 'Robovlasništvo',
    content: [
      'Bilo je normalno.',
      'Bilo je prihvaćeno.',
      'Trajalo je vekovima.',
      'Većina ljudi nije imala loše namere.',
    ],
  },
  {
    title: 'Nacizam',
    content: [
      'Bilo je normalno.',
      'Bilo je prihvaćeno.',
      'Trajalo je godinama.',
      'Većina ljudi nije imala loše namere.',
    ],
  },
  {
    title: 'Staljinizam / Maoizam',
    content: [
      'Bilo je normalno.',
      'Bilo je prihvaćeno.',
      'Trajalo je decenijama.',
      'Većina ljudi nije imala loše namere.',
    ],
  },
];

export default function HistoricalInjustices({
  onComplete,
}: HistoricalInjusticesProps) {
  const [currentInjustice, setCurrentInjustice] = useState(0);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const current = injustices[currentInjustice];
  const allWords = current.content.flatMap((sentence) => sentence.split(' '));
  const totalWords = allWords.length;

  useEffect(() => {
    setVisibleWordCount(0);
    setShowButton(false);
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < totalWords) {
        setVisibleWordCount(currentIndex + 1);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowButton(true);
        }, 1000);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [currentInjustice, totalWords]);

  const handleNext = () => {
    if (currentInjustice < injustices.length - 1) {
      setCurrentInjustice(currentInjustice + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, tamna - možda apstraktna forma koja sugerira težinu istorije */}
      {/* Opciono: Dark, abstract background - subtle historical weight */}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='text-center space-y-12'>
          {/* Title */}
          <h1 className='text-4xl md:text-6xl font-light text-gray-300 mb-12'>
            {current.title}
          </h1>

          {/* Content */}
          <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl'>
            <div className='space-y-6 text-left md:text-center'>
              {current.content.map((sentence, sentenceIndex) => {
                const sentenceWords = sentence.split(' ');
                let wordStartIndex = 0;
                for (let i = 0; i < sentenceIndex; i++) {
                  wordStartIndex += current.content[i].split(' ').length;
                }

                return (
                  <p
                    key={sentenceIndex}
                    className='text-xl md:text-2xl lg:text-3xl leading-relaxed font-light text-gray-300'>
                    {sentenceWords.map((word, wordIndex) => {
                      const currentWordIndex = wordStartIndex + wordIndex;
                      const isVisible = currentWordIndex < visibleWordCount;

                      return (
                        <span
                          key={wordIndex}
                          className={`inline-block transition-all duration-700 ease-out ${
                            isVisible
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-4'
                          }`}
                          style={{
                            transitionDelay: isVisible
                              ? `${currentWordIndex * 20}ms`
                              : '0ms',
                          }}>
                          {word}
                          {wordIndex < sentenceWords.length - 1 ? ' ' : ''}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>
          </div>

          {/* Progress indicators */}
          <div className='flex justify-center space-x-2 mt-8'>
            {injustices.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index <= currentInjustice
                    ? 'bg-gray-600 w-8'
                    : 'bg-gray-800/50 w-2'
                }`}
              />
            ))}
          </div>

          {/* Button */}
          {showButton && (
            <div className='mt-12 animate-fade-in'>
              <button
                onClick={handleNext}
                className='px-10 py-5 bg-gray-800/50 hover:bg-gray-700/50 rounded-full text-white font-light text-xl transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50'>
                {currentInjustice < injustices.length - 1 ? 'Dalje' : 'Nastavi'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
