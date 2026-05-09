'use client';

import { ReactNode, createContext, useContext } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';

export type StageCompletionAnswer = string | Record<string, string>;

/** How {@link StoryFlowContextValue.transitionToStage} picks pill vs instant navigation. */
export type StoryTransitionStyle = 'auto' | 'pill' | 'none';

export interface StoryFlowContextValue {
  answers: Record<string, string>;
  /** Advances / completes the flow for `stage`, optionally with a branching answer. */
  completeStage: (stage: Stage, answer?: StageCompletionAnswer) => void;
  /** Advances to the next internal step inside a stage (e.g. beat 1 -> beat 2). */
  goToNextStep: () => void;
  /**
   * Navigate to another stage; respects pill mask, answer-stage fade, or immediate
   * swap based on `style` and the current stage’s interaction type.
   */
  transitionToStage: (newStage: Stage, style?: StoryTransitionStyle) => void;
  /** Fade to black, then swap to `targetStage` (used by the choice branch UI). */
  transitionViaBlackOverlayTo: (targetStage: Stage) => void;
  trackAnswerSelected: (stage: Stage, answer: string) => void;
}

const StoryFlowContext = createContext<StoryFlowContextValue | undefined>(
  undefined,
);

export function StoryFlowProvider({
  value,
  children,
}: {
  value: StoryFlowContextValue;
  children: ReactNode;
}) {
  return (
    <StoryFlowContext.Provider value={value}>
      {children}
    </StoryFlowContext.Provider>
  );
}

export function useStoryFlow(): StoryFlowContextValue {
  const ctx = useContext(StoryFlowContext);
  if (!ctx) {
    throw new Error('useStoryFlow must be used within a StoryFlowProvider');
  }
  return ctx;
}
