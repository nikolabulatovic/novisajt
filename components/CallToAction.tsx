'use client';

import { useState, useEffect } from 'react';

interface CallToActionProps {
  onComplete: () => void;
}

export default function CallToAction({ onComplete }: CallToActionProps) {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Sada znaš.',
    'Sada vidiš.',
    'Sada možeš da biraš.',
    'Izaberi DOBRO.',
  ];

  const allWords = text.flatMap((sentence) => sentence.split(' '));
  const totalWords = allWords.length;

  useEffect(() => {
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
    }, 120);

    return () => clearInterval(interval);
  }, [totalWords]);

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, tamna - možda apstraktna forma koja sugerira akciju ili promenu */}
      {/* Opciono: Dark, abstract background suggesting action/change/transformation */}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='text-center space-y-12'>
          <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl'>
            <div className='space-y-6 text-left md:text-center'>
              {text.map((sentence, sentenceIndex) => {
                const sentenceWords = sentence.split(' ');
                let wordStartIndex = 0;
                for (let i = 0; i < sentenceIndex; i++) {
                  wordStartIndex += text[i].split(' ').length;
                }

                return (
                  <p
                    key={sentenceIndex}
                    className={`text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light ${
                      sentenceIndex === text.length - 1
                        ? 'text-gray-100 font-medium'
                        : 'text-gray-200'
                    }`}>
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

          {showButton && (
            <div className='mt-12 animate-fade-in'>
              <button
                onClick={onComplete}
                className='px-12 py-6 bg-gray-700/70 hover:bg-gray-600/70 rounded-full text-white font-medium text-2xl transition-all duration-300 border-2 border-gray-600/50 hover:border-gray-500/50 transform hover:scale-105'>
                Izaberi DOBRO
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
