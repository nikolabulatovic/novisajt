'use client';

import { useState } from 'react';
import CharacterEvaluation from '@/components/CharacterEvaluation';
import AnimalRevelation from '@/components/AnimalRevelation';

type Stage = 'choice' | 'evaluation' | 'revelation';

export default function Home() {
  const [stage, setStage] = useState<Stage>('choice');
  const [choice, setChoice] = useState<'red' | 'blue' | null>(null);

  const handlePillChoice = (pill: 'red' | 'blue') => {
    setChoice(pill);
    setTimeout(() => {
      setStage('evaluation');
    }, 800);
  };

  const handleEvaluationComplete = () => {
    setStage('revelation');
  };

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden'>
      {stage === 'choice' && <ChoiceStage onPillChoice={handlePillChoice} />}
      {stage === 'evaluation' && (
        <CharacterEvaluation onComplete={handleEvaluationComplete} />
      )}
      {stage === 'revelation' && <AnimalRevelation choice={choice} />}
    </main>
  );
}

function ChoiceStage({
  onPillChoice,
}: {
  onPillChoice: (pill: 'red' | 'blue') => void;
}) {
  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative'>
      {/* Animated background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto text-center space-y-12 animate-fade-in'>
        <div className='space-y-6'>
          <h1 className='text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent animate-gradient'>
            Izbor
          </h1>
          <p className='text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto leading-relaxed'>
            Stojiš na raskrsnici. Svaki izbor koji napraviš određuje ko si.
            <br />
            <span className='text-lg text-purple-300 mt-4 block'>
              Kakva osoba želiš da budeš?
            </span>
          </p>
        </div>

        <div className='flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 mt-16'>
          {/* Blue Pill */}
          {/* To use your own image, replace the div below with: 
              <Image src="/pills-image.png" alt="Blue pill" width={256} height={256} className="..." />
              Or use a single image with both pills and position them with CSS */}
          <button
            onClick={() => onPillChoice('blue')}
            className='group relative flex flex-col items-center space-y-6'>
            <div className='relative w-32 h-16 md:w-40 md:h-20 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3'>
              <div className='absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity' />
              <div className='relative w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-blue-300 group-hover:border-blue-200 transition-all'></div>
            </div>
            <div className='text-center space-y-2'>
              <p className='text-2xl md:text-3xl font-semibold text-blue-200'>
                Ostani
              </p>
              <p className='text-sm md:text-base text-blue-300 max-w-xs'>
                Nastavi kao što jesi - udoban u poznatom.
              </p>
            </div>
          </button>

          {/* Red Pill */}
          <button
            onClick={() => onPillChoice('red')}
            className='group relative flex flex-col items-center space-y-6'>
            <div className='relative w-32 h-16 md:w-40 md:h-20 transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3'>
              <div className='absolute inset-0 bg-red-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity' />
              <div className='relative w-full h-full bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-red-300 group-hover:border-red-200 transition-all'></div>
            </div>
            <div className='text-center space-y-2'>
              <p className='text-2xl md:text-3xl font-semibold text-red-200'>
                Vidi
              </p>
              <p className='text-sm md:text-base text-red-300 max-w-xs'>
                Otvori oči. Otkrij istinu o sebi i svetu.
              </p>
            </div>
          </button>
        </div>

        <p className='text-sm text-purple-400 mt-12 italic'>
          Klikni na pilulu da započneš svoje putovanje
        </p>
      </div>
    </div>
  );
}
