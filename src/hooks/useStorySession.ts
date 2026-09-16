'use client';

import { useMemo, useState } from 'react';

import type { Stage, StepId } from '@/src/contexts/NavigationContext';
import type {
  StoryFlowContextValue,
  StoryTransitionStyle,
} from '@/src/contexts/StoryFlowContext';
import { useStoryFlowHandlers } from '@/src/hooks/useStoryFlowHandlers';
import type { UserGender } from '@/src/lib/gender';
import type { PillOrigin } from '@/src/lib/pillOrigin';

export interface StorySessionDeps {
  currentStepId: StepId | null;
  navigateToStage: (stage: Stage, stepId?: StepId | null) => void;
  transitionToStage: (
    stage: Stage,
    style?: StoryTransitionStyle,
    pillOrigin?: PillOrigin,
  ) => void;
  transitionViaBlackOverlayTo: (targetStage: Stage) => void;
  trackAnswerSelected: (stage: Stage, answer: string) => void;
}

/**
 * Owns story session state (answers + gender) and completion/merge actions.
 * Navigation / transition chrome stays outside (see {@link useStoryTransitions}).
 */
export function useStorySession({
  currentStepId,
  navigateToStage,
  transitionToStage,
  transitionViaBlackOverlayTo,
  trackAnswerSelected,
}: StorySessionDeps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [gender, setGender] = useState<UserGender | null>(null);

  const { completeStage, mergeAnswers } = useStoryFlowHandlers({
    transitionToStage,
    navigateToStage,
    currentStepId,
    answers,
    setAnswers,
    trackAnswerSelected,
  });

  const flowContextValue = useMemo<StoryFlowContextValue>(
    () => ({
      answers,
      gender,
      setGender,
      mergeAnswers,
      completeStage,
      transitionToStage,
      transitionViaBlackOverlayTo,
      trackAnswerSelected,
    }),
    [
      answers,
      gender,
      mergeAnswers,
      completeStage,
      transitionToStage,
      transitionViaBlackOverlayTo,
      trackAnswerSelected,
    ],
  );

  return { answers, gender, flowContextValue };
}
