'use client';

import type { TransitionEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  type Stage,
  StageId,
  type StepId,
} from '@/src/contexts/NavigationContext';
import type { StoryTransitionStyle } from '@/src/contexts/StoryFlowContext';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import { stageInteractionType } from '@/src/lib/story/stageInteraction';

/** Overlay CSS is `duration-[2000ms]`; slack for browsers that skip `transitionend`. */
const BLACK_OVERLAY_FALLBACK_MS = 2200;
/** Shell fade-out is `duration-[950ms]`; slack for browsers that skip `transitionend`. */
const CROSSFADE_FALLBACK_MS = 1100;

/**
 * Pill expand is intentionally not gated by {@link useGpuEffects} /
 * `allowsHeavyEffects`. That tier is for crashy blur stacks; the clip-window
 * (and svg-mask) reveals are a different cost profile and were being skipped
 * on capable phones misclassified as `reduced`.
 */
function shouldUsePillTransitionForStage(
  stage: Stage,
  style: StoryTransitionStyle,
): boolean {
  if (style === 'pill') {
    return true;
  }
  if (style === 'none') {
    return false;
  }
  return stageInteractionType[stage] === 'next-pill';
}

function isOwnOpacityTransition(event: TransitionEvent<HTMLDivElement>) {
  return (
    event.target === event.currentTarget && event.propertyName === 'opacity'
  );
}

/**
 * Owns current stage and the three leave animations: pill mask, shell crossfade,
 * and fade-to-black. Only one leave can run at a time; later starts are ignored.
 * `Home` still owns session state (answers, gender, tracking).
 */
export function useStoryTransitions() {
  const [stage, setStage] = useState<Stage>(StageId.Choice);
  const [currentStepId, setCurrentStepId] = useState<StepId | null>(null);

  const [pendingNextStage, setPendingNextStage] = useState<Stage | null>(null);
  const [pendingPillOrigin, setPendingPillOrigin] = useState<PillOrigin | null>(
    null,
  );
  const [pendingCrossfadeStage, setPendingCrossfadeStage] =
    useState<Stage | null>(null);
  const [blackOverlay, setBlackOverlay] = useState(false);
  const [stageAfterFade, setStageAfterFade] = useState<Stage | null>(null);

  const pendingNextStageRef = useRef(pendingNextStage);
  useEffect(() => {
    pendingNextStageRef.current = pendingNextStage;
  }, [pendingNextStage]);

  const pendingCrossfadeStageRef = useRef<Stage | null>(null);
  const pendingStepIdRef = useRef<StepId | null>(null);
  const stageAfterFadeRef = useRef<Stage | null>(null);

  const leaveInFlightRef = useRef(false);
  const beginLeave = () => {
    if (leaveInFlightRef.current) return false;
    leaveInFlightRef.current = true;
    return true;
  };
  const endLeave = () => {
    leaveInFlightRef.current = false;
  };

  /** Consume pending step once (safe if commit runs twice). */
  const takePendingStepId = () => {
    const stepId = pendingStepIdRef.current;
    pendingStepIdRef.current = null;
    return stepId;
  };

  const handlePillTransitionComplete = useCallback(() => {
    const next = pendingNextStageRef.current;
    if (next) {
      setStage(next);
      setCurrentStepId(takePendingStepId());
    }
    pendingNextStageRef.current = null;
    setPendingNextStage(null);
    setPendingPillOrigin(null);
    endLeave();
  }, []);

  const queueCrossfadeTo = (newStage: Stage, stepId: StepId | null) => {
    pendingStepIdRef.current = stepId;
    pendingCrossfadeStageRef.current = newStage;
    setPendingCrossfadeStage(newStage);
  };

  const transitionToStage = useCallback(
    (
      newStage: Stage,
      style: StoryTransitionStyle = 'auto',
      pillOrigin?: PillOrigin,
    ) => {
      if (newStage === stage) return;
      if (!beginLeave()) return;
      // Entering a new stage via story flow defaults to first step (null).
      pendingStepIdRef.current = null;
      const shouldUsePillTransition = shouldUsePillTransitionForStage(
        stage,
        style,
      );
      if (shouldUsePillTransition) {
        setPendingPillOrigin(pillOrigin ?? null);
        pendingNextStageRef.current = newStage;
        setPendingNextStage(newStage);
      } else {
        queueCrossfadeTo(newStage, null);
      }
    },
    [stage],
  );

  const transitionViaBlackOverlayTo = useCallback((targetStage: Stage) => {
    if (!beginLeave()) return;
    pendingStepIdRef.current = null;
    stageAfterFadeRef.current = targetStage;
    setStageAfterFade(targetStage);
    setBlackOverlay(true);
  }, []);

  const commitBlackOverlayStage = useCallback(() => {
    const pending = stageAfterFadeRef.current;
    if (pending === null) return;
    stageAfterFadeRef.current = null;
    setStageAfterFade(null);
    setStage(pending);
    setCurrentStepId(takePendingStepId());
    setBlackOverlay(false);
    endLeave();
  }, []);

  /** Fallback when `transitionend` never fires (common on low-end Android Chrome). */
  useEffect(() => {
    if (!blackOverlay || stageAfterFade === null) return;
    const timeoutId = window.setTimeout(
      commitBlackOverlayStage,
      BLACK_OVERLAY_FALLBACK_MS,
    );
    return () => window.clearTimeout(timeoutId);
  }, [blackOverlay, stageAfterFade, commitBlackOverlayStage]);

  const handleBlackOverlayTransitionEnd = (
    event: TransitionEvent<HTMLDivElement>,
  ) => {
    if (!isOwnOpacityTransition(event)) return;
    commitBlackOverlayStage();
  };

  const navigateToStage = useCallback(
    (newStage: Stage, stepId?: StepId | null) => {
      const nextStep = stepId === undefined ? null : stepId;
      if (newStage === stage) {
        if (nextStep === currentStepId) return;
        setCurrentStepId(nextStep);
        return;
      }
      if (!beginLeave()) return;
      queueCrossfadeTo(newStage, nextStep);
    },
    [stage, currentStepId],
  );

  const commitCrossfadeStage = useCallback(() => {
    const pending = pendingCrossfadeStageRef.current;
    if (pending === null) return;
    pendingCrossfadeStageRef.current = null;
    setPendingCrossfadeStage(null);
    setStage(pending);
    setCurrentStepId(takePendingStepId());
    endLeave();
  }, []);

  /** Fallback when `transitionend` never fires (common on low-end Android Chrome). */
  useEffect(() => {
    if (pendingCrossfadeStage === null) return;
    const timeoutId = window.setTimeout(
      commitCrossfadeStage,
      CROSSFADE_FALLBACK_MS,
    );
    return () => window.clearTimeout(timeoutId);
  }, [pendingCrossfadeStage, commitCrossfadeStage]);

  const handleStageShellOpacityTransitionEnd = (
    event: TransitionEvent<HTMLDivElement>,
  ) => {
    if (!isOwnOpacityTransition(event)) return;
    // Only commit the leave; ignore the fade-in transitionend.
    if (pendingCrossfadeStageRef.current === null) return;
    commitCrossfadeStage();
  };

  return {
    stage,
    currentStepId,
    navigateToStage,
    transitionToStage,
    transitionViaBlackOverlayTo,
    pill: {
      pendingNextStage,
      origin: pendingPillOrigin,
      onComplete: handlePillTransitionComplete,
    },
    blackOverlay: {
      active: blackOverlay,
      onTransitionEnd: handleBlackOverlayTransitionEnd,
    },
    shell: {
      isFadingOut: pendingCrossfadeStage !== null,
      onTransitionEnd: handleStageShellOpacityTransitionEnd,
    },
  };
}
