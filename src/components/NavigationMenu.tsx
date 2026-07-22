'use client';

import { useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import {
  Stage,
  StageId,
  useNavigation,
} from '@/src/contexts/NavigationContext';

const stageLabelKeys: Record<Stage, string> = {
  [StageId.Choice]: 'stages.choice',
  [StageId.Intro]: 'stages.intro',
  [StageId.Evaluation]: 'stages.evaluation',
  [StageId.CharacterIncompatible]: 'stages.characterIncompatible',
  [StageId.Explanation]: 'stages.explanation',
  [StageId.HistoricalIntro]: 'stages.historicalIntro',
  [StageId.HistoricalSlavery]: 'stages.historicalSlavery',
  [StageId.HistoricalAuthoritarianism]: 'stages.historicalAuthoritarianism',
  [StageId.PersonalQuestion]: 'stages.personalQuestion',
  [StageId.WouldYouLikeToBe]: 'stages.wouldYouLikeToBe',
  [StageId.RecognizingInjustice]: 'stages.recognizingInjustice',
  [StageId.BreakingQuestion]: 'stages.breakingQuestion',
  [StageId.StayComfortable]: 'stages.stayComfortable',
  [StageId.ApatheticStance]: 'stages.apatheticStance',
  [StageId.SpasaStory]: 'stages.spasaStory',
  [StageId.SpasaRevelation]: 'stages.spasaRevelation',
  [StageId.OtherPigs]: 'stages.otherPigs',
  [StageId.RootOfTheProblem]: 'stages.rootOfTheProblem',
  [StageId.AnimalsTreatedAsProducts]: 'stages.animalsTreatedAsProducts',
  [StageId.LetThemLive]: 'stages.letThemLive',
  [StageId.AcceptingSelfOwnership]: 'stages.acceptingSelfOwnership',
  [StageId.DishonestSelfOwnership]: 'stages.dishonestSelfOwnership',
  [StageId.FromTheWild]: 'stages.fromTheWild',
  [StageId.ViciousCycle]: 'stages.viciousCycle',
  [StageId.CowFate]: 'stages.cowFate',
  [StageId.AnimalCostOfLiving]: 'stages.animalCostOfLiving',
  [StageId.ReproductionControl]: 'stages.reproductionControl',
  [StageId.SolutionUse]: 'stages.solutionUse',
  [StageId.AlreadyVegan]: 'stages.alreadyVegan',
  [StageId.SolutionKnow]: 'stages.solutionKnow',
  [StageId.VeganDietHealth]: 'stages.veganDietHealth',
  [StageId.AdditionalResources]: 'stages.additionalResources',
  [StageId.NotAcceptingHealth]: 'stages.notAcceptingHealth',
  [StageId.SolutionChoice]: 'stages.solutionChoice',
  [StageId.AddressingContradiction]: 'stages.addressingContradiction',
  [StageId.NotHonest]: 'stages.notHonest',
  [StageId.AlignBehaviour]: 'stages.alignBehaviour',
  [StageId.BackToAnswers]: 'stages.backToAnswers',
  [StageId.BackToAnswersAgain]: 'stages.backToAnswersAgain',
  [StageId.NotFollowingThrough]: 'stages.notFollowingThrough',
  [StageId.VeganismPrinciple]: 'stages.veganismPrinciple',
  [StageId.AfterChoice]: 'stages.afterChoice',
};

interface StageNavItem {
  stage: Stage;
  depth: number;
}

const stageNavItems: StageNavItem[] = [
  { stage: StageId.Choice, depth: 0 },
  { stage: StageId.StayComfortable, depth: 1 },
  { stage: StageId.Intro, depth: 0 },
  { stage: StageId.Evaluation, depth: 0 },
  { stage: StageId.CharacterIncompatible, depth: 1 },
  { stage: StageId.Explanation, depth: 0 },
  { stage: StageId.HistoricalIntro, depth: 0 },
  { stage: StageId.HistoricalSlavery, depth: 0 },
  { stage: StageId.HistoricalAuthoritarianism, depth: 0 },
  { stage: StageId.PersonalQuestion, depth: 0 },
  { stage: StageId.WouldYouLikeToBe, depth: 1 },
  { stage: StageId.RecognizingInjustice, depth: 2 },
  { stage: StageId.BreakingQuestion, depth: 0 },
  { stage: StageId.ApatheticStance, depth: 1 },
  { stage: StageId.SpasaStory, depth: 0 },
  { stage: StageId.SpasaRevelation, depth: 0 },
  { stage: StageId.OtherPigs, depth: 0 },
  { stage: StageId.RootOfTheProblem, depth: 0 },
  { stage: StageId.AnimalsTreatedAsProducts, depth: 0 },
  { stage: StageId.LetThemLive, depth: 0 },
  { stage: StageId.AcceptingSelfOwnership, depth: 1 },
  { stage: StageId.DishonestSelfOwnership, depth: 2 },
  { stage: StageId.FromTheWild, depth: 0 },
  { stage: StageId.ReproductionControl, depth: 0 },
  { stage: StageId.ViciousCycle, depth: 0 },
  { stage: StageId.CowFate, depth: 0 },
  { stage: StageId.AnimalCostOfLiving, depth: 0 },
  { stage: StageId.SolutionUse, depth: 0 },
  { stage: StageId.AlreadyVegan, depth: 1 },
  { stage: StageId.SolutionKnow, depth: 0 },
  { stage: StageId.VeganDietHealth, depth: 1 },
  { stage: StageId.AdditionalResources, depth: 2 },
  { stage: StageId.NotAcceptingHealth, depth: 3 },
  { stage: StageId.SolutionChoice, depth: 0 },
  { stage: StageId.AddressingContradiction, depth: 1 },
  { stage: StageId.NotHonest, depth: 2 },
  { stage: StageId.AlignBehaviour, depth: 0 },
  { stage: StageId.BackToAnswers, depth: 1 },
  { stage: StageId.BackToAnswersAgain, depth: 2 },
  { stage: StageId.NotFollowingThrough, depth: 3 },
  { stage: StageId.VeganismPrinciple, depth: 0 },
  { stage: StageId.AfterChoice, depth: 0 },
];

export default function NavigationMenu() {
  const t = useTranslations('navigation-menu');
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
        aria-label={t('toggleAriaLabel')}
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
              {t('title')}
            </h3>
          </div>
          {stageNavItems.map(({ stage, depth }) => {
            const isActive = currentStage === stage;
            const hasIndent = depth > 0;
            return (
              <button
                key={stage}
                onClick={() => handleStageClick(stage)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 mb-1 ${
                  isActive
                    ? 'bg-gray-800/60 border border-gray-700/50 text-gray-100'
                    : 'text-gray-300 hover:bg-gray-800/40 hover:text-gray-100'
                }`}
                style={{
                  paddingLeft: `${16 + depth * 12}px`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {hasIndent ? (
                      <span className="text-gray-500 text-xs leading-none">
                        └
                      </span>
                    ) : null}
                    <span
                      className="text-sm font-light"
                      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
                    >
                      {t(stageLabelKeys[stage])}
                    </span>
                  </div>
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
