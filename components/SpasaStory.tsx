'use client';

import { useState, useEffect } from 'react';
import NextButton from './ui/NextButton';

interface SpasaStoryProps {
  onComplete: () => void;
}

export default function SpasaStory({ onComplete }: SpasaStoryProps) {
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalMessageVisible, setFinalMessageVisible] = useState(false);

  const text = [
    'Upoznaćemo te sa Spasinom pričom.',
    'Spasa je dobila ime po tome što je spašena. Njena sudbina pre nego što su je ljudi udomili bila je gotovo sigurna smrt. Ljudi su odlučili da joj pruže šansu za život — život koji bi inače izgubila.',
    'Svaki čin spašavanja nosi težinu. Čak i kada niko nije dužan da reaguje, izbor da poštuješ i saosećaš sa bićem koje oseća, razume i želi da živi, pokazuje koliko možemo biti odgovorni i dobri.',
  ];

  const allWords = text.flatMap((sentence) => sentence.split(' '));
  const totalWords = allWords.length;

  useEffect(() => {
    if (!showFinalMessage) {
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
    }
  }, [totalWords, showFinalMessage]);

  const handleContinue = () => {
    if (!showFinalMessage) {
      setShowFinalMessage(true);
      setShowButton(false);
      setTimeout(() => {
        setFinalMessageVisible(true);
        setTimeout(() => {
          onComplete();
        }, 3000); // Show final message for 3 seconds before moving on
      }, 500);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* Background image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out opacity-80'
        style={{
          backgroundImage: "url('/images/spasa-rescue-hope.png')",
        }}
      />
      {/* Dark overlay for text visibility */}
      <div className='absolute inset-0 bg-black/50 pointer-events-none' />

      {/* Background effects */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        {!showFinalMessage ? (
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
                {text.map((sentence, sentenceIndex) => {
                  const sentenceWords = sentence.split(' ');
                  let wordStartIndex = 0;
                  for (let i = 0; i < sentenceIndex; i++) {
                    wordStartIndex += text[i].split(' ').length;
                  }

                  return (
                    <p
                      key={sentenceIndex}
                      className='text-xl md:text-2xl lg:text-3xl leading-relaxed font-light text-gray-200'>
                      {sentenceWords.map((word, wordIndex) => {
                        const currentWordIndex = wordStartIndex + wordIndex;
                        const isVisible = currentWordIndex < visibleWordCount;

                        return (
                          <span
                            key={wordIndex}
                            className={`transition-all duration-700 ease-out ${isVisible
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

            <div className='mt-12'>
              <NextButton
                onClick={handleContinue}
                label='Nastavi'
                show={showButton}
              />
            </div>
          </div>
        ) : (
          <div
            className={`text-center transition-opacity duration-1000 relative ${finalMessageVisible ? 'opacity-100' : 'opacity-0'
              }`}>
            {/* Smooth linear gradient backdrop for final message */}
            <div
              className='absolute inset-0 -mx-8 -my-12 pointer-events-none'
              style={{
                background: `linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.15) 20%, rgba(0, 0, 0, 0.4) 35%, rgba(0, 0, 0, 0.65) 50%, rgba(0, 0, 0, 0.4) 65%, rgba(0, 0, 0, 0.15) 80%, transparent 100%)`,
              }}
            />
            <p className='text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed relative z-10'>
              Ali postoji nešto što jesmo dužni: da sve životinje ostavimo na
              miru.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

