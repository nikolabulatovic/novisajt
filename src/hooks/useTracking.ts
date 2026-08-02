import { usePostHog } from 'posthog-js/react';

import { Stage, StageId } from '@/src/contexts/NavigationContext';
import { ensureSessionRecording } from '@/src/lib/posthogSessionRecording';

/** Blue pill / comfort exit — short dead-end, not worth the recorder. */
function isRecordingWorthyStage(stage: Stage) {
  return stage !== StageId.Choice && stage !== StageId.StayComfortable;
}

export function useTracking() {
  const posthog = usePostHog();

  const trackStageViewed = (stage: Stage) => {
    if (isRecordingWorthyStage(stage)) {
      ensureSessionRecording(posthog);
    }
    posthog?.capture('stage_viewed', { stage });
  };

  const trackAnswerSelected = (stage: Stage, answer: string) => {
    if (stage === StageId.Choice && answer === 'red') {
      ensureSessionRecording(posthog);
    }
    posthog?.capture('answer_selected', { stage, answer });
  };

  const trackFlowCompleted = () => {
    posthog?.capture('flow_completed');
  };

  const trackNarrativeAdvanceClicked = (stage: Stage) => {
    ensureSessionRecording(posthog);
    posthog?.capture('narrative_advance_clicked', { stage });
  };

  return {
    trackStageViewed,
    trackAnswerSelected,
    trackFlowCompleted,
    trackNarrativeAdvanceClicked,
  };
}
