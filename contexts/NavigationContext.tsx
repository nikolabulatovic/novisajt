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
  | 'spasa-revelation-part1'
  | 'facts'
  | 'spasa-revelation-part2'
  | 'spasa-revelation-part3'
  | 'spasa-revelation-part4'
  | 'animal-exploitation'
  | 'domestication'
  | 'moral-consistency'
  | 'final-choice'
  | 'mirror'
  | 'call-to-action'
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

