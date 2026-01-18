'use client';

import { useState, useEffect } from 'react';
import NextButton from './ui/NextButton';

interface SpasaRevelationPart1Props {
  onComplete: () => void;
}

export default function SpasaRevelationPart1({
  onComplete,
}: SpasaRevelationPart1Props) {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const text =
    'Ostali prasići nisu imali tu sreću. Njima je neko predodredio dan smrti, pre njihovog rođenja. Ne zato što je taj neko sadista - nego zato što ispunjava potražnju. Radi to što drugi ljudi traže od njega da radi.';

  const allWords = text.split(' ');
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
      {/* Background image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out opacity-80'
        style={{
          backgroundImage: "url('/images/spasa-revelation-bg.jpg')",
        }}
      />
      {/* Dark overlay for text visibility */}
      <div className='absolute inset-0 bg-black/50 pointer-events-none' />

      {/* Background effects */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='text-center space-y-12'>
          <div className='relative p-16'>
            {/* Smooth linear gradient backdrop - transparent at edges, more opaque in center - only for text */}
            <div
              className='absolute inset-0 -mx-8 -my-6 pointer-events-none'
              style={{
                background: `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.15) 20%, rgba(0, 0, 0, 0.4) 35%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.15) 80%, transparent 100%)`,
              }}
            />
            <div className='space-y-6 text-left md:text-center relative z-10'>
              <p className='text-xl md:text-2xl lg:text-3xl leading-relaxed font-light text-gray-200'>
                {allWords.map((word, wordIndex) => {
                  const isVisible = wordIndex < visibleWordCount;

                  return (
                    <span
                      key={wordIndex}
                      className={`transition-all duration-700 ease-out ${isVisible
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-4'
                        }`}
                      style={{
                        transitionDelay: isVisible
                          ? `${wordIndex * 20}ms`
                          : '0ms',
                      }}>
                      {word}
                      {wordIndex < allWords.length - 1 ? ' ' : ''}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>

          <div className='mt-12'>
            <NextButton
              onClick={onComplete}
              label='Nastavi'
              show={showButton}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

