'use client';

import { ReactNode, createContext, useContext } from 'react';

export const StageId = {
  Choice: 'choice-stage',
  Intro: 'red-pill-intro',
  Evaluation: 'character-evaluation',
  CharacterIncompatible: 'character-incompatible',
  Explanation: 'question-explanation',
  HistoricalIntro: 'historical-intro',
  HistoricalSlavery: 'historical-slavery',
  HistoricalAuthoritarianism: 'historical-authoritarianism',
  PersonalAccountability: 'personal-accountability',
  InjusticePersists: 'injustice-persists',
  PersonalQuestion: 'personal-question',
  WouldYouLikeToBe: 'would-you-like-to-be',
  RecognizingInjustice: 'recognizing-injustice',
  BreakingQuestion: 'breaking-question',
  StayComfortable: 'stay-comfortable',
  ApatheticStance: 'apathetic-stance',
  SpasaStory: 'spasa-story',
  SpasaRevelation: 'spasa-revelation',
  OtherPigs: 'other-pigs',
  RootOfTheProblem: 'root-of-the-problem',
  AnimalsTreatedAsProducts: 'animals-treated-as-products',
  LetThemLive: 'let-them-live',
  AcceptingSelfOwnership: 'accepting-self-ownership',
  DishonestSelfOwnership: 'dishonest-self-ownership',
  FromTheWild: 'from-the-wild',
  ViciousCycle: 'vicious-cycle',
  CowFate: 'cow-fate',
  AnimalCostOfLiving: 'animal-cost-of-living',
  ReproductionControl: 'reproduction-control',
  SolutionUse: 'solution-use',
  AlreadyVegan: 'already-vegan',
  SolutionKnow: 'solution-know',
  VeganDietHealth: 'vegan-diet-health',
  AdditionalResources: 'additional-resources',
  NotAcceptingHealth: 'not-accepting-health',
  SolutionChoice: 'solution-choice',
  AddressingContradiction: 'addressing-contradiction',
  NotHonest: 'not-honest',
  AlignBehaviour: 'align-behaviour',
  Excuse: 'excuse',
  DoubleStandard: 'double-standard',
  NotThreatened: 'not-threatened',
  YouAreResponsible: 'you-are-responsible',
  ActResponsibly: 'act-responsibly',
  NotWhoYouThink: 'not-who-you-think',
  ReturnWhenReady: 'return-when-ready',
  OkWithInjustice: 'ok-with-injustice',
  VeganismPrinciple: 'veganism-principle',
  AfterChoice: 'after-choice',
} as const;

export type Stage = (typeof StageId)[keyof typeof StageId];

interface NavigationContextType {
  currentStage: Stage;
  navigateToStage: (stage: Stage) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export function NavigationProvider({
  children,
  currentStage,
  navigateToStage,
}: {
  children: ReactNode;
  currentStage: Stage;
  navigateToStage: (stage: Stage) => void;
}) {
  return (
    <NavigationContext.Provider value={{ currentStage, navigateToStage }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
