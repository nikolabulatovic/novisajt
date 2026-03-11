'use client';

import { useState, useEffect, useRef } from 'react';
import { useNavigation, Stage } from '@/contexts/NavigationContext';

const stageLabels: Record<Stage, string> = {
  choice: 'Izbor',
  intro: 'Uvod',
  evaluation: 'Procena karaktera',
  explanation: 'Objašnjenje',
  historical: 'Istorijske nepravde',
  'personal-question': 'Lično pitanje',
  'breaking-question': 'Prelomno pitanje',
  'spasa-story': 'Spasina priča',
  'spasa-revelation': 'Spasino otkriće',
  'other-pigs': 'Ostali prasići',
  'root-of-the-problem': 'Koren problema',
  'animals-treated-as-products': 'Gde se koriste',
  'let-them-live': 'Da žive svoj život',
  'from-the-wild': 'Resurs i kontrola',
  'vicious-cycle': 'Začarani krug',
  'cow-fate': 'Sudbina krava',
  'animal-cost-of-living': 'U životu dok donosi prihod',
  'reproduction-control': 'Biološka dominacija',
  'solution-use': 'Da li koristiš životinje?',
  'solution-know': 'Da li znaš da je moguće?',
  'vegan-diet-health': 'Veganska ishrana i zdravlje',
  'solution-choice': 'Biranje suprotno uverenju',
  'align-behaviour': 'Usaglašavanje ponašanja',
  'veganism-principle': 'Princip veganstva',
  facts: 'Činjenice',
  'animal-exploitation': 'Eksploatacija',
  domestication: 'Pitomstvo',
  'moral-consistency': 'Moralna doslednost',
  'final-choice': 'Konačni izbor',
  mirror: 'Ogledalo',
  'call-to-action': 'Poziv na akciju',
  'after-choice': 'Nakon izbora',
};

const stageOrder: Stage[] = [
  'choice',
  'intro',
  'evaluation',
  'explanation',
  'historical',
  'personal-question',
  'breaking-question',
  'spasa-story',
  'spasa-revelation',
  'other-pigs',
  'root-of-the-problem',
  'animals-treated-as-products',
  'let-them-live',
  'from-the-wild',
  'reproduction-control',
  'vicious-cycle',
  'cow-fate',
  'animal-cost-of-living',
  'solution-use',
  'solution-know',
  'vegan-diet-health',
  'solution-choice',
  'align-behaviour',
  'veganism-principle',
  'facts',
  'animal-exploitation',
  'domestication',
  'moral-consistency',
  'final-choice',
  'mirror',
  'call-to-action',
  'after-choice',
];

export default function NavigationMenu() {
  const { currentStage, navigateToStage } = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleStageClick = (stage: Stage) => {
    navigateToStage(stage);
    setIsOpen(false);
  };

  return (
    <div ref={menuRef} className='fixed top-4 right-4 z-[100]'>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-800/50 hover:bg-gray-800/80 transition-all duration-300 flex items-center justify-center group hover:scale-110 shadow-lg'
        aria-label='Toggle navigation menu'>
        <svg
          className={`w-6 h-6 text-gray-300 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''
            }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Menu Panel */}
      <div
        className={`absolute top-16 right-0 w-64 bg-gray-900/95 backdrop-blur-lg border border-gray-800/50 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}>
        <div className='p-2 max-h-[70vh] overflow-y-auto'>
          <div className='px-3 py-2 border-b border-gray-800/50 mb-2'>
            <h3 className='text-sm font-medium text-gray-400 uppercase tracking-wide'>
              Navigacija
            </h3>
          </div>
          {stageOrder.map((stage) => {
            const isActive = currentStage === stage;
            return (
              <button
                key={stage}
                onClick={() => handleStageClick(stage)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${isActive
                    ? 'bg-gray-800/60 border border-gray-700/50 text-gray-100'
                    : 'text-gray-300 hover:bg-gray-800/40 hover:text-gray-100'
                  }`}>
                <div className='flex items-center justify-between'>
                  <span
                    className='text-sm font-light'
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                    {stageLabels[stage]}
                  </span>
                  {isActive && (
                    <div className='w-2 h-2 rounded-full bg-red-500/80'></div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
