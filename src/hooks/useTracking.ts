import { usePostHog } from 'posthog-js/react';

import { useRef } from 'react';

import { Stage, StageId } from '@/src/contexts/NavigationContext';
import type { GenderChoiceAnalytics } from '@/src/lib/gender';
import { ensureSessionRecording } from '@/src/lib/posthogSessionRecording';
import {
  type CommunityType,
  buildFlowCompletedProperties,
  isRecordingWorthyStage,
} from '@/src/lib/tracking';

export function useTracking() {
  const posthog = usePostHog();
  const flowStartedAtRef = useRef<number | null>(null);
  const flowCompletedRef = useRef(false);

  const trackStageViewed = (stage: Stage) => {
    if (flowStartedAtRef.current === null) {
      flowStartedAtRef.current = Date.now();
    }
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

  /** Intended story end: user reached JoinUs. Fires at most once per session. */
  const trackFlowCompleted = (answers: Record<string, string>) => {
    if (flowCompletedRef.current) return;
    flowCompletedRef.current = true;

    const startedAt = flowStartedAtRef.current;
    const time_to_complete_ms =
      startedAt === null ? 0 : Math.max(0, Date.now() - startedAt);

    posthog?.capture(
      'flow_completed',
      buildFlowCompletedProperties(answers, { time_to_complete_ms }),
    );
  };

  const trackCommunityCtaClicked = (community_type: CommunityType) => {
    posthog?.capture('community_cta_clicked', { community_type });
  };

  const trackNarrativeAdvanceClicked = (stage: Stage) => {
    ensureSessionRecording(posthog);
    posthog?.capture('narrative_advance_clicked', { stage });
  };

  /** Sticky from Intro gender pick onward (super property + person property). */
  const trackGenderChoice = (genderChoice: GenderChoiceAnalytics) => {
    posthog?.register({ gender_choice: genderChoice });
    posthog?.people.set({ gender_choice: genderChoice });
    posthog?.capture('gender_chosen', { gender_choice: genderChoice });
  };

  return {
    trackStageViewed,
    trackAnswerSelected,
    trackFlowCompleted,
    trackCommunityCtaClicked,
    trackNarrativeAdvanceClicked,
    trackGenderChoice,
  };
}
