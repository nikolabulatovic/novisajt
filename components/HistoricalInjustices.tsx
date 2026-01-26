'use client';

import { useState, useEffect } from 'react';
import NextButton from './ui/NextButton';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface HistoricalInjusticesProps {
  onComplete: () => void;
}

const intro = [
  'Kroz istoriju, ogromne nepravde nisu činili monstrumi.',
  'Činili su ih obični ljudi.',
  'Ljudi koji su voleli svoje porodice.',
  'Ljudi koji su se smatrali dobrima.',
];

const injustices = {
  left: {
    content: [
      'Robovlasništvo je bilo normalno.',
      'Zakonito.',
      'Trajalo je milenijumima.',
      'Većina ljudi je to podržavalo ili barem prihvatalo.',
      'Samo su „živeli normalno“.',
    ],
  },
  right: {
    content: [
      'Hitler. Staljin. Mao.',
      'Vojnici i policajci su izvršavali naredbe.',
      'Milioni su stradali ne zato što su svi bili zli - već zato što su slušali, ćutali i prilagođavali se.',
      'Nepravda je bila prihvaćena.',
    ],
  },
};

export default function HistoricalInjustices({
  onComplete,
}: HistoricalInjusticesProps) {
  const [stage, setStage] = useState<'intro' | 'slavery' | 'nazism'>('intro');
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showIntroButton, setShowIntroButton] = useState(false);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const [showButton, setShowButton] = useState(false);

  const slaveryWords = injustices.left.content.flatMap((sentence) =>
    sentence.trim() === '' ? [] : sentence.split(' '),
  );
  const nazismWords = injustices.right.content.flatMap((sentence) =>
    sentence.trim() === '' ? [] : sentence.split(' '),
  );
  const slaveryTotalWords = slaveryWords.length;
  const nazismTotalWords = nazismWords.length;

  const currentTotalWords =
    stage === 'slavery'
      ? slaveryTotalWords
      : stage === 'nazism'
        ? nazismTotalWords
        : 0;

  // Intro stage
  useEffect(() => {
    if (stage === 'intro') {
      setVisibleLines([]);
      setShowIntroButton(false);
      intro.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, index]);
          if (index === intro.length - 1) {
            setTimeout(() => {
              setShowIntroButton(true);
            }, 1000);
          }
        }, index * 600);
      });
    }
  }, [stage]);

  // Slavery and Nazism stages - animate words
  useEffect(() => {
    if (stage === 'slavery' || stage === 'nazism') {
      setVisibleWordCount(0);
      setShowButton(false);

      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < currentTotalWords) {
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
    }
  }, [stage, currentTotalWords]);

  const handleIntroContinue = () => {
    setStage('slavery');
  };

  const handleContinue = () => {
    if (stage === 'slavery') {
      setStage('nazism');
    } else if (stage === 'nazism') {
      onComplete();
    }
  };

  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds.historical;

  return (
    <div className='min-h-screen flex items-center justify-center relative bg-black'>
      {/* Background image for intro stage */}
      {stage === 'intro' && backgroundImage && (
        <div
          className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out'
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            opacity: opacity,
          }}
        />
      )}
      {/* Dark overlay for text visibility */}
      {stage === 'intro' && (
        <div className='absolute inset-0 bg-black/50 pointer-events-none' />
      )}

      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/2 left-1/2 w-96 h-96 bg-gray-800/5 rounded-full blur-3xl animate-pulse' />
      </div>

      <div className='relative z-10 mx-auto w-full'>
        {stage === 'intro' ? (
          // Intro stage - unique layout
          <div className='space-y-8 md:space-y-12'>
            {intro.map((line, index) => {
              if (line === '') {
                return <div key={index} className='h-8' />;
              }
              return (
                <p
                  key={index}
                  className={`text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 text-center leading-relaxed transition-all duration-1000 ease-out ${visibleLines.includes(index)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                    }`}>
                  {line}
                </p>
              );
            })}

            {/* Intro button */}
            <NextButton
              onClick={handleIntroContinue}
              label='Nastavi'
              show={showIntroButton}
              className={`transition-opacity duration-500 ${showIntroButton
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
                }`}
            />
          </div>
        ) : stage === 'slavery' ? (
          // Slavery stage - Image left, text right, blending
          <div className=''>
            <div className='relative w-full min-h-screen'>
              {/* Wide background image */}
              <div className='absolute inset-0 w-full h-full overflow-hidden'>
                <div
                  className='absolute inset-0 bg-cover bg-center bg-no-repeat'
                  style={{
                    backgroundImage: "url('/images/robovi.jpg')",
                  }}
                />
                {/* Blur effect on edges */}
                <div className='absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/60 pointer-events-none blur-xl' />
                {/* Gradient overlays - square fade in top right corner */}
                <div className='absolute inset-0 bg-gradient-to-t from-transparent via-black/50 to-black/100 pointer-events-none' />
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black/100 pointer-events-none' />
              </div>

              {/* Content overlay */}
              <div className='relative z-10 flex flex-col md:flex-row items-start gap-8 md:gap-12 h-full min-h-screen p-8'>
                {/* Spacer for image area */}
                <div className='w-full md:w-2/5 flex-shrink-0' />

                {/* Text - right side */}
                <div className='flex-1 space-y-6 pt-4'>
                  <div className='space-y-4 text-right'>
                    {injustices.left.content.map((sentence, sentenceIndex) => {
                      // Handle empty lines
                      if (sentence.trim() === '') {
                        return <div key={sentenceIndex} className='h-6' />;
                      }

                      const sentenceWords = sentence.split(' ');
                      let wordStartIndex = 0;
                      for (let i = 0; i < sentenceIndex; i++) {
                        if (injustices.left.content[i].trim() !== '') {
                          wordStartIndex +=
                            injustices.left.content[i].split(' ').length;
                        }
                      }

                      return (
                        <p
                          key={sentenceIndex}
                          className='text-xl md:text2xl lg:text-3xl leading-relaxed font-light text-gray-300'>
                          {sentenceWords.map((word, wordIndex) => {
                            const currentWordIndex = wordStartIndex + wordIndex;
                            const isVisible =
                              currentWordIndex < visibleWordCount;

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
                                {wordIndex < sentenceWords.length - 1
                                  ? ' '
                                  : ''}
                              </span>
                            );
                          })}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Button - absolutely positioned within image */}
              <div
                className={`absolute bottom-8 right-8 z-20 transition-opacity duration-500 ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                <NextButton onClick={handleContinue} label='Dalje' show={showButton} marginTop="none" />
              </div>
            </div>
          </div>
        ) : (
          // Nazism stage - Image right, text left, blending
          <div className=''>
            <div className='relative w-full min-h-screen'>
              {/* Wide background image */}
              <div className='absolute inset-0 w-full h-full overflow-hidden'>
                <div
                  className='absolute inset-0 bg-cover bg-center bg-no-repeat'
                  style={{
                    backgroundImage: "url('/images/nacizam.jpg')",
                  }}
                />
                {/* Blur effect on edges */}
                <div className='absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-black/60 pointer-events-none blur-xl' />
                {/* Gradient overlays - square fade in top left corner */}
                <div className='absolute inset-0 bg-gradient-to-t from-transparent via-black/50 to-black/100 pointer-events-none' />
                <div className='absolute inset-0 bg-gradient-to-l from-transparent via-black/50 to-black/100 pointer-events-none' />
              </div>

              {/* Content overlay */}
              <div className='relative z-10 flex flex-col md:flex-row-reverse items-start gap-8 md:gap-12 h-full min-h-screen p-8'>
                {/* Spacer for image area */}
                <div className='w-full md:w-2/5 flex-shrink-0' />

                {/* Text - left side */}
                <div className='flex-1 space-y-6 pt-4'>
                  <div className='space-y-4 text-left'>
                    {injustices.right.content.map((sentence, sentenceIndex) => {
                      // Handle empty lines
                      if (sentence.trim() === '') {
                        return <div key={sentenceIndex} className='h-6' />;
                      }

                      const sentenceWords = sentence.split(' ');
                      let wordStartIndex = 0;
                      for (let i = 0; i < sentenceIndex; i++) {
                        if (injustices.right.content[i].trim() !== '') {
                          wordStartIndex +=
                            injustices.right.content[i].split(' ').length;
                        }
                      }

                      return (
                        <p
                          key={sentenceIndex}
                          className='text-xl md:text-2xl lg:text-3xl leading-relaxed font-light text-gray-300'>
                          {sentenceWords.map((word, wordIndex) => {
                            const currentWordIndex = wordStartIndex + wordIndex;
                            const isVisible =
                              currentWordIndex < visibleWordCount;

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
                                {wordIndex < sentenceWords.length - 1
                                  ? ' '
                                  : ''}
                              </span>
                            );
                          })}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Button - absolutely positioned within image */}
              <div
                className={`absolute bottom-8 left-8 z-20 transition-opacity duration-500 ${showButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}>
                <NextButton onClick={handleContinue} label='Nastavi' show={showButton} marginTop="none" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
