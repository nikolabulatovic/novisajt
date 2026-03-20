'use client';

import { useState } from 'react';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

interface PersonalQuestionProps {
  onComplete: () => void;
}

export default function PersonalQuestion({
  onComplete,
}: PersonalQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hideQuestion, setHideQuestion] = useState(false);
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleAnswer = (value: string) => {
    setSelected(value);
    // Hide question and options
    setTimeout(() => {
      setHideQuestion(true);
      // Show flash message after fade out
      setTimeout(() => {
        setShowFlashMessage(true);
        // After 3 seconds, fade out and move to next section
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            onComplete();
          }, 500); // Fade out duration
        }, 3000);
      }, 300); // Wait for question to fade out
    }, 500);
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4 md:p-8 relative bg-black'>
      {/* Background image placeholder */}
      {/* IDEJA ZA SLIKU:
          - Istorijska fotografija ljudi u masi/grupi (sugerira konformnost, pripadanje grupi)
          - Silueta osobe koja gleda u daljinu (introspekcija, refleksija)
          - Apstraktna slika koja sugerira unutrašnji konflikt ili moralno pitanje
          - Istorijska scena koja je dvosmislena - može biti bilo koje vreme
          - Osoba koja stoji sama protiv grupe (moralna hrabrost)
          - Ogledalo ili refleksija (samo-refleksija)
      */}
      {(() => {
        const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['personal-question'];
        return backgroundImage ? (
          <div className='absolute inset-0 w-full h-full overflow-hidden'>
            <div
              className='absolute inset-0 bg-cover bg-center bg-no-repeat'
              style={{
                backgroundImage: `url('${backgroundImage}')`,
                opacity: opacity,
              }}
            />
          </div>
        ) : null;
      })()}

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        {!showFlashMessage ? (
          <div
            className={`text-center space-y-12 transition-opacity duration-300 ${
              hideQuestion ? 'opacity-0' : 'opacity-100'
            }`}>
            {/* Question */}
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto'>
              Da li bi bio (ili bila) protiv ovih nepravdi tada kada su se
              zaista dešavale?
            </h1>

            {/* Options */}
            <div className='flex flex-row gap-8'>
              {['Da', 'Nadam se', 'Ne znam'].map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selected !== null}
                  className={`w-full text-center px-2 py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                    selected === option
                      ? 'bg-gray-800/60 border-2 border-gray-600 cursor-pointer'
                      : selected !== null
                      ? 'opacity-50 cursor-not-allowed'
                      : 'bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50 cursor-pointer'
                  }`}>
                  <span
                    className='text-lg md:text-xl lg:text-2xl text-gray-300 font-light'
                    style={{ fontFamily: 'var(--font-literata), serif' }}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            className={`text-center transition-opacity duration-500 ${
              fadeOut ? 'opacity-0' : 'opacity-100'
            }`}>
            <p className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-200 italic'>
              Većina ljudi veruje da bi bila.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
