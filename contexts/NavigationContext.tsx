'use client';

import { createContext, useContext, ReactNode } from 'react';

export type Stage =
  | 'choice'
  | 'intro'
  | 'evaluation'
  | 'explanation'
  | 'historical'
  | 'personal-question'
  | 'breaking-question'
  | 'spasa-story'
  | 'spasa-revelation'
  | 'other-pigs'
  | 'root-of-the-problem'
  | 'animals-treated-as-products'
  | 'let-them-live'
  | 'from-the-wild'
  | 'vicious-cycle'
  | 'cow-fate'
  | 'animal-cost-of-living'
  | 'reproduction-control'
  | 'solution-use'
  | 'solution-know'
  | 'vegan-diet-health'
  | 'solution-choice'
  | 'align-behaviour'
  | 'veganism-principle'
  | 'after-choice';

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

