'use client';

import { useEffect, useMemo, useState } from 'react';

import NavigationMenu from '@/src/components/NavigationMenu';
import PillTransitionLayer from '@/src/components/ui/PillTransitionLayer';
import { NavigationProvider } from '@/src/contexts/NavigationContext';
import {
  type StoryFlowContextValue,
  StoryFlowProvider,
} from '@/src/contexts/StoryFlowContext';
import { useDevNavAccess } from '@/src/hooks/useDevNavAccess';
import { useStoryFlowHandlers } from '@/src/hooks/useStoryFlowHandlers';
import { useStoryTransitions } from '@/src/hooks/useStoryTransitions';
import { useTracking } from '@/src/hooks/useTracking';
import type { UserGender } from '@/src/lib/gender';
import { STAGE_REGISTRY } from '@/src/lib/story/stageRegistry';

/** Locale story route: session state, transition chrome, and {@link StoryFlowContextValue}. */
export default function Home() {
  const showDevNav = useDevNavAccess();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [gender, setGender] = useState<UserGender | null>(null);
  const {
    stage,
    navigateToStage,
    transitionToStage,
    transitionViaBlackOverlayTo,
    pill,
    blackOverlay,
    shell,
  } = useStoryTransitions();
  const { trackStageViewed, trackAnswerSelected, trackFlowCompleted } =
    useTracking();

  useEffect(() => {
    trackStageViewed(stage);
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  const { completeStage } = useStoryFlowHandlers({
    transitionToStage,
    setAnswers,
    trackAnswerSelected,
    trackFlowCompleted,
  });

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
      <StoryFlowProvider value={flowContextValue}>
        <PillTransitionLayer
          pendingNextStage={pill.pendingNextStage}
          origin={pill.origin}
          onComplete={pill.onComplete}
        />
        <div
          className="fixed inset-0 bg-black z-50 pointer-events-none transition-opacity duration-[2000ms]"
          style={{ opacity: blackOverlay.active ? 1 : 0 }}
          onTransitionEnd={blackOverlay.onTransitionEnd}
        />
        {showDevNav ? <NavigationMenu /> : null}
        <main className="min-h-screen bg-black text-white overflow-hidden relative">
          <div
            className={`min-h-screen w-full transition-opacity ease-out motion-reduce:!duration-0 ${
              shell.isFadingOut
                ? 'opacity-0 duration-[950ms]'
                : 'opacity-100 duration-[1450ms]'
            }`}
            onTransitionEnd={shell.onTransitionEnd}
          >
            <StageComponent />
          </div>
        </main>
      </StoryFlowProvider>
    </NavigationProvider>
  );
}
