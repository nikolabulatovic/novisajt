'use client';

import { useState, useEffect } from 'react';

interface RedPillIntroProps {
  onComplete: () => void;
}

export default function RedPillIntro({ onComplete }: RedPillIntroProps) {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const text = [
    'Čestitamo.',
    'Izabrao/la si da vidiš šta se zaista dešava.',
    'Ali istina nije za sve.',
    'Neki ljudi nisu spremni da čuju ono što mora biti rečeno.',
    'Zato ćemo ti postaviti tri pitanja.',
    'Odgovori iskreno—kako god bilo.',
    'Ako si spreman/na da saznaš istinu, nastavi dalje.',
  ];

  // Flatten all words with their positions
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
        }, 800);
      }
    }, 100); // Adjust speed here (lower = faster)

    return () => clearInterval(interval);
  }, [totalWords]);

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative overflow-hidden'>
      {/* Animated background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000' />
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='text-center space-y-6'>
          {/* Main text with word-by-word animation */}
          <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl'>
            <div className='space-y-4 text-left md:text-center'>
              {text.map((sentence, sentenceIndex) => {
                const sentenceWords = sentence.split(' ');
                let wordStartIndex = 0;
                // Calculate starting index for this sentence
                for (let i = 0; i < sentenceIndex; i++) {
                  wordStartIndex += text[i].split(' ').length;
                }

                return (
                  <p
                    key={sentenceIndex}
                    className='text-xl md:text-2xl lg:text-3xl leading-relaxed'>
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

          {/* Continue button */}
          {showButton && (
            <div className='mt-12 animate-fade-in'>
              <button
                onClick={handleContinue}
                className='px-10 py-5 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-full text-white font-semibold text-xl hover:from-red-500 hover:via-orange-500 hover:to-red-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-red-500/50 relative overflow-hidden group'>
                <span className='relative z-10'>Nastavi</span>
                <div className='absolute inset-0 bg-gradient-to-r from-red-700 via-orange-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
