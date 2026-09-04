import { usePostHog } from 'posthog-js/react';

import { Stage, StageId } from '@/src/contexts/NavigationContext';
import type { GenderChoiceAnalytics } from '@/src/lib/gender';
import { ensureSessionRecording } from '@/src/lib/posthogSessionRecording';

export type CommunityType = 'whatsapp' | 'discord' | 'telegram';

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
