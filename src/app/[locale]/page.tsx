'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import NavigationMenu from '@/src/components/NavigationMenu';
import PillTransitionLayer from '@/src/components/ui/PillTransitionLayer';
import {
  NavigationProvider,
  Stage,
  StageId,
} from '@/src/contexts/NavigationContext';
import { PillProvider } from '@/src/contexts/PillContext';
import {
  type StoryFlowContextValue,
  StoryFlowProvider,
  type StoryTransitionStyle,
} from '@/src/contexts/StoryFlowContext';
import { useStoryFlowHandlers } from '@/src/hooks/useStoryFlowHandlers';
import { useTracking } from '@/src/hooks/useTracking';
import { stageInteractionType } from '@/src/lib/story/stageInteraction';
import { STAGE_REGISTRY } from '@/src/lib/story/stageRegistry';

function shouldUsePillTransitionForStage(
  stage: Stage,
  style: StoryTransitionStyle,
): boolean {
  if (style === 'pill') {
    return true;
  }

  return stageInteractionType[stage] === 'next-pill';
}

/** Locale story route: owns stage state, transitions, overlays, and {@link StoryFlowContextValue}. */
export default function Home() {
  const [stage, setStage] = useState<Stage>(StageId.Choice);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [pendingNextStage, setPendingNextStage] = useState<Stage | null>(null);
  const [blackOverlay, setBlackOverlay] = useState(false);
  const [stageAfterFade, setStageAfterFade] = useState<Stage | null>(null);
  const { trackStageViewed, trackAnswerSelected, trackFlowCompleted } =
    useTracking();

  useEffect(() => {
    trackStageViewed(stage);
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTransitionComplete = () => {
    if (pendingNextStage) {
      setStage(pendingNextStage);
    }
    setPendingNextStage(null);
  };

  const transitionToStage = useCallback(
    (newStage: Stage, style: StoryTransitionStyle = 'auto') => {
      const shouldUsePillTransition = shouldUsePillTransitionForStage(
        stage,
        style,
      );
      if (shouldUsePillTransition) {
        setPendingNextStage(newStage);
      } else {
        setStage(newStage);
      }
    },
    [stage],
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

  const navigateToStage = (newStage: Stage) => {
    setStage(newStage);
  };

  const flowContextValue = useMemo<StoryFlowContextValue>(
    () => ({
      answers,
      completeStage,
      goToNextStep: () => {},
      transitionToStage,
      transitionViaBlackOverlayTo,
      trackAnswerSelected,
    }),
    [
      answers,
      completeStage,
      transitionToStage,
      transitionViaBlackOverlayTo,
      trackAnswerSelected,
    ],
  );

  const StageComponent = STAGE_REGISTRY[stage];

  return (
    <NavigationProvider currentStage={stage} navigateToStage={navigateToStage}>
      <PillProvider>
        <PillTransitionLayer
          pendingNextStage={pendingNextStage}
          onComplete={handleTransitionComplete}
        />
        <div
          className="fixed inset-0 bg-black z-50 pointer-events-none transition-opacity duration-[2000ms]"
          style={{ opacity: blackOverlay ? 1 : 0 }}
          onTransitionEnd={handleBlackOverlayTransitionEnd}
        />
        <NavigationMenu />
        <main className="min-h-screen bg-black text-white overflow-hidden relative">
          <StoryFlowProvider value={flowContextValue}>
            <StageComponent />
          </StoryFlowProvider>
        </main>
      </PillProvider>
    </NavigationProvider>
  );
}
