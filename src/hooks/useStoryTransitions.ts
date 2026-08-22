'use client';

import type { TransitionEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useGpuEffects } from '@/src/contexts/GpuEffectsContext';
import { type Stage, StageId } from '@/src/contexts/NavigationContext';
import type { StoryTransitionStyle } from '@/src/contexts/StoryFlowContext';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import { stageInteractionType } from '@/src/lib/story/stageInteraction';

/** Overlay CSS is `duration-[2000ms]`; slack for browsers that skip `transitionend`. */
const BLACK_OVERLAY_FALLBACK_MS = 2200;
/** Shell fade-out is `duration-[950ms]`; slack for browsers that skip `transitionend`. */
const CROSSFADE_FALLBACK_MS = 1100;

function shouldUsePillTransitionForStage(
  stage: Stage,
  style: StoryTransitionStyle,
  allowsHeavyEffects: boolean,
): boolean {
  // SVG mask expansion + full-bleed image composite stutters on weak GPUs (e.g. Adreno 506).
  if (!allowsHeavyEffects) {
    return false;
  }
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
 * and fade-to-black. `Home` still owns session state (answers, gender, tracking).
 */
export function useStoryTransitions() {
  const { allowsHeavyEffects } = useGpuEffects();
  const [stage, setStage] = useState<Stage>(StageId.Choice);

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

  const handlePillTransitionComplete = useCallback(() => {
    const next = pendingNextStageRef.current;
    if (next) {
      setStage(next);
    }
    setPendingNextStage(null);
    setPendingPillOrigin(null);
  }, []);

  const transitionToStage = useCallback(
    (
      newStage: Stage,
      style: StoryTransitionStyle = 'auto',
      pillOrigin?: PillOrigin,
    ) => {
      if (newStage === stage) return;
      const shouldUsePillTransition = shouldUsePillTransitionForStage(
        stage,
        style,
        allowsHeavyEffects,
      );
      if (shouldUsePillTransition) {
        setPendingPillOrigin(pillOrigin ?? null);
        setPendingNextStage(newStage);
      } else {
        setPendingCrossfadeStage(newStage);
      }
    },
    [stage, allowsHeavyEffects],
  );

  const transitionViaBlackOverlayTo = useCallback((targetStage: Stage) => {
    setStageAfterFade(targetStage);
    setBlackOverlay(true);
  }, []);

  const commitBlackOverlayStage = useCallback(() => {
    setStageAfterFade((pending) => {
      if (pending === null) return null;
      setStage(pending);
      setBlackOverlay(false);
      return null;
    });
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
    (newStage: Stage) => {
      if (newStage === stage) return;
      setPendingCrossfadeStage(newStage);
    },
    [stage],
  );

  const commitCrossfadeStage = useCallback(() => {
    setPendingCrossfadeStage((pending) => {
      if (pending === null) return null;
      setStage(pending);
      return null;
    });
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
    commitCrossfadeStage();
  };

  return {
    stage,
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
