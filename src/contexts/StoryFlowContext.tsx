'use client';

import { ReactNode, createContext, useContext } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';
import type { UserGender } from '@/src/lib/gender';
import type { PillOrigin } from '@/src/lib/pillOrigin';

export type StageCompletionAnswer = string | Record<string, string>;

/** How {@link StoryFlowContextValue.transitionToStage} picks pill vs instant navigation. */
export type StoryTransitionStyle = 'auto' | 'pill' | 'none';

export interface StoryFlowContextValue {
  answers: Record<string, string>;
  /**
   * Grammatical address gender for inflected locales (e.g. Serbian).
   * `null` means not chosen yet — UI treats it as male by default.
   */
  gender: UserGender | null;
  setGender: (gender: UserGender) => void;
  /**
   * Advances / completes the flow for `stage`.
   * Pass `pillOrigin` when leaving via a red next-pill so the mask expands from that rect.
   */
  completeStage: (
    stage: Stage,
    answer?: StageCompletionAnswer,
    pillOrigin?: PillOrigin,
  ) => void;
  /** Advances to the next internal step inside a stage (e.g. beat 1 -> beat 2). */
  goToNextStep: () => void;
  /**
   * Navigate to another stage; uses pill mask when configured, otherwise fades the main shell
   * out, swaps the stage, then fades back in (see Home `pendingCrossfadeStage`).
   */
  transitionToStage: (
    newStage: Stage,
    style?: StoryTransitionStyle,
    pillOrigin?: PillOrigin,
  ) => void;
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
