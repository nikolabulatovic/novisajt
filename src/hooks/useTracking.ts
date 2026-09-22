import type { PostHog } from 'posthog-js';
import { usePostHog } from 'posthog-js/react';

import { useEffect, useRef } from 'react';

import { Stage, StageId } from '@/src/contexts/NavigationContext';
import { useStageAttentionClock } from '@/src/hooks/useStageAttentionClock';
import type { GenderChoiceAnalytics } from '@/src/lib/gender';
import { ensureSessionRecording } from '@/src/lib/posthogSessionRecording';
import {
  type CommunityType,
  buildFlowCompletedProperties,
  buildStageExitedProperties,
  isRecordingWorthyStage,
} from '@/src/lib/tracking';

/**
 * Shared across `useTracking()` call sites (page, JoinUs, feedback, …) so page
 * leave fires once with the stage last updated by `trackStageViewed`.
 */
const stageAbandon = {
  stage: null as Stage | null,
  posthog: undefined as PostHog | undefined,
  takeElapsedMs: (() => 0) as () => number,
  /** Prevents duplicate leave beacons for the same stage stay. */
  leaveSentForStage: null as Stage | null,
};

let pageHideListenerAttached = false;

function captureStageLeave() {
  const stage = stageAbandon.stage;
  const posthog = stageAbandon.posthog;
  if (!stage || !posthog) return;
  if (stageAbandon.leaveSentForStage === stage) return;
  stageAbandon.leaveSentForStage = stage;

  posthog.capture(
    'stage_exited',
    buildStageExitedProperties(stage, {
      exit_type: 'leave',
      time_spent_ms: stageAbandon.takeElapsedMs(),
    }),
    { transport: 'sendBeacon', send_instantly: true },
  );
}

function ensurePageHideListener() {
  if (pageHideListenerAttached || typeof window === 'undefined') return;
  pageHideListenerAttached = true;
  window.addEventListener('pagehide', (event) => {
    // bfcache: page may come back — not a real abandon.
    if (event.persisted) return;
    captureStageLeave();
  });
}

export function useTracking() {
  const posthog = usePostHog();
  const flowStartedAtRef = useRef<number | null>(null);
  const flowCompletedRef = useRef(false);
  const previousStageRef = useRef<Stage | null>(null);
  const attention = useStageAttentionClock();

  useEffect(() => {
    ensurePageHideListener();
  }, []);

  const trackStageViewed = (stage: Stage) => {
    if (flowStartedAtRef.current === null) {
      flowStartedAtRef.current = Date.now();
    }

    const previousStage = previousStageRef.current;
    if (previousStage !== stage) {
      if (previousStage !== null) {
        posthog?.capture(
          'stage_exited',
          buildStageExitedProperties(previousStage, {
            next_stage: stage,
            exit_type: 'next',
            time_spent_ms: attention.takeElapsedMs(),
          }),
        );
      }
      previousStageRef.current = stage;
      attention.resetForStage();
      stageAbandon.leaveSentForStage = null;
    }

    // Sticky stage for `$pageleave` + unload `stage_exited` (leave).
    posthog?.register({ stage });
    stageAbandon.stage = stage;
    stageAbandon.posthog = posthog;
    stageAbandon.takeElapsedMs = () => attention.takeElapsedMs();

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

  const trackFeedbackFormClicked = (stage: Stage) => {
    posthog?.capture('feedback_form_clicked', { stage });
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
    trackFeedbackFormClicked,
    trackNarrativeAdvanceClicked,
    trackGenderChoice,
  };
}
