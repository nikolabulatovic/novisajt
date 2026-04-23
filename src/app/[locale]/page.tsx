'use client';

import { useCallback, useEffect, useState } from 'react';

import NavigationMenu from '@/src/components/NavigationMenu';
import PillTransitionLayer from '@/src/components/ui/PillTransitionLayer';
import {
  NavigationProvider,
  Stage,
  StageId,
} from '@/src/contexts/NavigationContext';
import { PillProvider } from '@/src/contexts/PillContext';
import { useStoryFlowHandlers } from '@/src/hooks/useStoryFlowHandlers';
import { useTracking } from '@/src/hooks/useTracking';
import { stageInteractionType } from '@/src/lib/story/stageInteraction';
import { STAGE_REGISTRY } from '@/src/lib/story/stageRegistry';

type TransitionStyle = 'auto' | 'pill' | 'none';

function shouldUsePillTransitionForStage(
  stage: Stage,
  style: TransitionStyle,
): boolean {
  if (style === 'pill') {
    return true;
  }

  return stageInteractionType[stage] === 'next-pill';
}

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
    (newStage: Stage, style: TransitionStyle = 'auto') => {
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

  const handlePillChoice = (pill: 'red' | 'blue') => {
    trackAnswerSelected(StageId.Choice, pill);
    if (pill === 'red') {
      transitionToStage(StageId.Intro, 'pill');
    } else {
      setStageAfterFade(StageId.StayComfortable);
      setBlackOverlay(true);
    }
  };

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
  const stageDefinition = STAGE_REGISTRY[stage];
  const StageComponent = stageDefinition.Component;

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
          <StageComponent
            {...stageDefinition.getProps({
              answers,
              onStageComplete: completeStage,
              onPillChoice: handlePillChoice,
            })}
          />
        </main>
      </PillProvider>
    </NavigationProvider>
  );
}
