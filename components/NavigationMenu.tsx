'use client';

import { useEffect, useRef, useState } from 'react';

import { Stage, StageId, useNavigation } from '@/contexts/NavigationContext';

const stageLabels: Record<Stage, string> = {
  [StageId.Choice]: 'Izbor',
  [StageId.Intro]: 'Uvod',
  [StageId.Evaluation]: 'Procena karaktera',
  [StageId.Explanation]: 'Objašnjenje',
  [StageId.Historical]: 'Istorijske nepravde',
  [StageId.PersonalQuestion]: 'Lično pitanje',
  [StageId.WouldYouLikeToBe]: 'Da li bi voleo?',
  [StageId.RecognizingInjustice]: 'Prepoznavanje nepravde',
  [StageId.BreakingQuestion]: 'Prelomno pitanje',
  [StageId.StayComfortable]: 'Ostani komforan',
  [StageId.ApatheticStance]: 'Apatičan stav',
  [StageId.SpasaStory]: 'Spasina priča',
  [StageId.SpasaRevelation]: 'Spasino otkriće',
  [StageId.OtherPigs]: 'Ostali prasići',
  [StageId.RootOfTheProblem]: 'Koren problema',
  [StageId.AnimalsTreatedAsProducts]: 'Gde se koriste',
  [StageId.LetThemLive]: 'Da žive svoj život',
  [StageId.AcceptingSelfOwnership]: 'Sopstveno vlasništvo',
  [StageId.FromTheWild]: 'Resurs i kontrola',
  [StageId.ViciousCycle]: 'Začarani krug',
  [StageId.CowFate]: 'Sudbina krava',
  [StageId.AnimalCostOfLiving]: 'U životu dok donosi prihod',
  [StageId.ReproductionControl]: 'Biološka dominacija',
  [StageId.SolutionUse]: 'Da li koristiš životinje?',
  [StageId.AlreadyVegan]: 'Već veganski',
  [StageId.SolutionKnow]: 'Da li znaš da je moguće?',
  [StageId.VeganDietHealth]: 'Veganska ishrana i zdravlje',
  [StageId.AdditionalResources]: 'Dodatni resursi',
  [StageId.SolutionChoice]: 'Biranje suprotno uverenju',
  [StageId.AddressingContradiction]: 'Kontradiktornost',
  [StageId.NotHonest]: 'Nisi iskren',
  [StageId.AlignBehaviour]: 'Usaglašavanje ponašanja',
  [StageId.BackToAnswers]: 'Vraćanje na odgovore',
  [StageId.BackToAnswersAgain]: 'Ponovo na odgovore',
  [StageId.NotFollowingThrough]: 'Ne držiš se',
  [StageId.VeganismPrinciple]: 'Princip veganstva',
  [StageId.AfterChoice]: 'Nakon izbora',
};

const stageOrder: Stage[] = [
  StageId.Choice,
  StageId.Intro,
  StageId.Evaluation,
  StageId.Explanation,
  StageId.Historical,
  StageId.PersonalQuestion,
  StageId.BreakingQuestion,
  StageId.SpasaStory,
  StageId.SpasaRevelation,
  StageId.OtherPigs,
  StageId.RootOfTheProblem,
  StageId.AnimalsTreatedAsProducts,
  StageId.LetThemLive,
  StageId.AcceptingSelfOwnership,
  StageId.FromTheWild,
  StageId.ReproductionControl,
  StageId.ViciousCycle,
  StageId.CowFate,
  StageId.AnimalCostOfLiving,
  StageId.SolutionUse,
  StageId.SolutionKnow,
  StageId.VeganDietHealth,
  StageId.SolutionChoice,
  StageId.AlignBehaviour,
  StageId.VeganismPrinciple,
  StageId.AfterChoice,
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
    <div ref={menuRef} className="fixed top-4 right-4 z-[100]">
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-md border border-gray-800/50 hover:bg-gray-800/80 transition-all duration-300 flex items-center justify-center group hover:scale-110 shadow-lg"
        aria-label="Toggle navigation menu"
      >
        <svg
          className={`w-6 h-6 text-gray-300 transition-transform duration-300 ${
            isOpen ? 'rotate-90' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
          />
        </svg>
      </button>

      {/* Menu Panel */}
      <div
        className={`absolute top-16 right-0 w-56 sm:w-64 max-w-[calc(100vw-2rem)] bg-gray-900/95 backdrop-blur-lg border border-gray-800/50 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="p-2 max-h-[70vh] overflow-y-auto">
          <div className="px-3 py-2 border-b border-gray-800/50 mb-2">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              Navigacija
            </h3>
          </div>
          {stageOrder.map((stage) => {
            const isActive = currentStage === stage;
            return (
              <button
                key={stage}
                onClick={() => handleStageClick(stage)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
                  isActive
                    ? 'bg-gray-800/60 border border-gray-700/50 text-gray-100'
                    : 'text-gray-300 hover:bg-gray-800/40 hover:text-gray-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-light"
                    style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                  >
                    {stageLabels[stage]}
                  </span>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
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
