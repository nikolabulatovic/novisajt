'use client';

import type { TransitionEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import NavigationMenu from '@/src/components/NavigationMenu';
import PillTransitionLayer from '@/src/components/ui/PillTransitionLayer';
import { useGpuEffects } from '@/src/contexts/GpuEffectsContext';
import {
  NavigationProvider,
  Stage,
  StageId,
} from '@/src/contexts/NavigationContext';
import {
  type StoryFlowContextValue,
  StoryFlowProvider,
  type StoryTransitionStyle,
} from '@/src/contexts/StoryFlowContext';
import { useDevNavAccess } from '@/src/hooks/useDevNavAccess';
import { useStoryFlowHandlers } from '@/src/hooks/useStoryFlowHandlers';
import { useTracking } from '@/src/hooks/useTracking';
import type { UserGender } from '@/src/lib/gender';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import { stageInteractionType } from '@/src/lib/story/stageInteraction';
import { STAGE_REGISTRY } from '@/src/lib/story/stageRegistry';

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

/** Locale story route: owns stage state, transitions, overlays, and {@link StoryFlowContextValue}. */
export default function Home() {
  const showDevNav = useDevNavAccess();
  const { allowsHeavyEffects } = useGpuEffects();
  const [stage, setStage] = useState<Stage>(StageId.Choice);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [gender, setGender] = useState<UserGender | null>(null);
  const [pendingNextStage, setPendingNextStage] = useState<Stage | null>(null);
  const [pendingPillOrigin, setPendingPillOrigin] = useState<PillOrigin | null>(
    null,
  );
  /** Target stage after main shell fades out (non-pill transitions + menu jumps). */
  const [pendingCrossfadeStage, setPendingCrossfadeStage] =
    useState<Stage | null>(null);
  const [blackOverlay, setBlackOverlay] = useState(false);
  const [stageAfterFade, setStageAfterFade] = useState<Stage | null>(null);
  const { trackStageViewed, trackAnswerSelected, trackFlowCompleted } =
    useTracking();

  useEffect(() => {
    trackStageViewed(stage);
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  const pendingNextStageRef = useRef(pendingNextStage);
  useEffect(() => {
    pendingNextStageRef.current = pendingNextStage;
  }, [pendingNextStage]);

  const handleTransitionComplete = useCallback(() => {
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

  const { completeStage } = useStoryFlowHandlers({
    transitionToStage,
    setAnswers,
    trackAnswerSelected,
    trackFlowCompleted,
  });

  const transitionViaBlackOverlayTo = useCallback((targetStage: Stage) => {
    setStageAfterFade(targetStage);
    setBlackOverlay(true);
  }, []);

  const handleBlackOverlayTransitionEnd = () => {
    if (stageAfterFade) {
      setStage(stageAfterFade);
      setStageAfterFade(null);
      setBlackOverlay(false);
    }
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
    const timeoutId = window.setTimeout(commitCrossfadeStage, 1100);
    return () => window.clearTimeout(timeoutId);
  }, [pendingCrossfadeStage, commitCrossfadeStage]);

  const handleStageShellOpacityTransitionEnd = (
    event: TransitionEvent<HTMLDivElement>,
  ) => {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== 'opacity'
    ) {
      return;
    }
    commitCrossfadeStage();
  };

  const flowContextValue = useMemo<StoryFlowContextValue>(
    () => ({
      answers,
      gender,
      setGender,
      completeStage,
      goToNextStep: () => {},
      transitionToStage,
      transitionViaBlackOverlayTo,
      trackAnswerSelected,
    }),
    [
      answers,
      gender,
      completeStage,
      transitionToStage,
      transitionViaBlackOverlayTo,
      trackAnswerSelected,
    ],
  );

  const StageComponent = STAGE_REGISTRY[stage];

  return (
    <NavigationProvider currentStage={stage} navigateToStage={navigateToStage}>
      <PillTransitionLayer
        pendingNextStage={pendingNextStage}
        origin={pendingPillOrigin}
        onComplete={handleTransitionComplete}
      />
      <div
        className="fixed inset-0 bg-black z-50 pointer-events-none transition-opacity duration-[2000ms]"
        style={{ opacity: blackOverlay ? 1 : 0 }}
        onTransitionEnd={handleBlackOverlayTransitionEnd}
      />
      {showDevNav ? <NavigationMenu /> : null}
      <main className="min-h-screen bg-black text-white overflow-hidden relative">
        <StoryFlowProvider value={flowContextValue}>
          <div
            className={`min-h-screen w-full transition-opacity ease-out motion-reduce:!duration-0 ${
              pendingCrossfadeStage !== null
                ? 'opacity-0 duration-[950ms]'
                : 'opacity-100 duration-[1450ms]'
            }`}
            onTransitionEnd={handleStageShellOpacityTransitionEnd}
          >
            <StageComponent />
          </div>
        </StoryFlowProvider>
      </main>
    </NavigationProvider>
  );
}
