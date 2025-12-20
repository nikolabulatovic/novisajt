'use client';

import { useState, useEffect } from 'react';

interface FactsNumbersProps {
  onComplete: () => void;
}

const facts = [
  'Svake godine ubijemo preko 90 milijardi kopnenih životinja – nepotrebno.',
  // Može se dodati više činjenica ako je potrebno
];

export default function FactsNumbers({ onComplete }: FactsNumbersProps) {
  const [currentFact, setCurrentFact] = useState(0);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const current = facts[currentFact];
  const allWords = current.split(' ');
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
        }, 2000); // Pauza. Tišina.
      }
    }, 150);

    return () => clearInterval(interval);
  }, [currentFact, totalWords]);

  const handleNext = () => {
    if (currentFact < facts.length - 1) {
      setCurrentFact(currentFact + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, tamna - možda apstraktna forma koja sugerira težinu brojeva */}
      {/* Opciono: Dark, abstract background - weight of numbers/statistics */}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        <div className='text-center space-y-12'>
          {/* Fact */}
          <div className='bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl'>
            <p className='text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light text-gray-200'>
              {allWords.map((word, wordIndex) => {
                const isVisible = wordIndex < visibleWordCount;

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

          {/* Progress indicators */}
          <div className='flex justify-center space-x-2 mt-8'>
            {facts.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index <= currentFact
                    ? 'bg-gray-600 w-8'
                    : 'bg-gray-800/50 w-2'
                }`}
              />
            ))}
          </div>

          {/* Button */}
          <div
            className={`mt-12 transition-opacity duration-500 ${
              showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
            <button
              onClick={handleNext}
              className='button-next cursor-pointer px-12 py-6 rounded-full font-light text-xl group relative overflow-hidden'>
              <span className='relative z-10 flex items-center justify-center'>
                {currentFact < facts.length - 1 ? 'Dalje' : 'Nastavi'}
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
