'use client';

import { useEffect } from 'react';

import NavigationMenu from '@/src/components/NavigationMenu';
import PillTransitionLayer from '@/src/components/ui/PillTransitionLayer';
import { NavigationProvider, StageId } from '@/src/contexts/NavigationContext';
import { StoryFlowProvider } from '@/src/contexts/StoryFlowContext';
import { useDevNavAccess } from '@/src/hooks/useDevNavAccess';
import { usePreloadNextStageImages } from '@/src/hooks/usePreloadNextStageImages';
import { useStorySession } from '@/src/hooks/useStorySession';
import { useStoryTransitions } from '@/src/hooks/useStoryTransitions';
import { useTracking } from '@/src/hooks/useTracking';
import { STAGE_REGISTRY } from '@/src/lib/story/stageRegistry';

/** Locale story route: session state, transition chrome, and story flow context. */
export default function Home() {
  const showDevNav = useDevNavAccess();
  const {
    stage,
    currentStepId,
    navigateToStage,
    transitionToStage,
    transitionViaBlackOverlayTo,
    pill,
    blackOverlay,
    shell,
  } = useStoryTransitions();
  const { trackStageViewed, trackAnswerSelected, trackFlowCompleted } =
    useTracking();

  const { answers, gender, flowContextValue } = useStorySession({
    currentStepId,
    navigateToStage,
    transitionToStage,
    transitionViaBlackOverlayTo,
    trackAnswerSelected,
  });

  usePreloadNextStageImages(stage, gender);

  useEffect(() => {
    trackStageViewed(stage);
    if (stage === StageId.JoinUs) {
      trackFlowCompleted(answers);
    }
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  const StageComponent = STAGE_REGISTRY[stage];

  return (
    <NavigationProvider
      currentStage={stage}
      currentStepId={currentStepId}
      navigateToStage={navigateToStage}
    >
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
        <main className="h-dvh bg-black text-white overflow-hidden relative">
          <div
            className={`h-full w-full transition-opacity ease-out motion-reduce:!duration-0 ${
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
