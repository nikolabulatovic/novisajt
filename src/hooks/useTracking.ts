import { useEffect, useRef } from 'react';

import { Stage, StageId } from '@/src/contexts/NavigationContext';
import { useStageAttentionClock } from '@/src/hooks/useStageAttentionClock';
import { type AnalyticsClient, useAnalytics } from '@/src/lib/analytics';
import type { GenderChoiceAnalytics } from '@/src/lib/gender';
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
  analytics: undefined as AnalyticsClient | undefined,
  takeElapsedMs: (() => 0) as () => number,
  /** Prevents duplicate leave beacons for the same stage stay. */
  leaveSentForStage: null as Stage | null,
};

let pageHideListenerAttached = false;

function captureStageLeave() {
  const stage = stageAbandon.stage;
  const analytics = stageAbandon.analytics;
  if (!stage || !analytics) return;
  if (stageAbandon.leaveSentForStage === stage) return;
  stageAbandon.leaveSentForStage = stage;

  analytics.capture(
    'stage_exited',
    buildStageExitedProperties(stage, {
      exit_type: 'leave',
      time_spent_ms: stageAbandon.takeElapsedMs(),
    }),
    { transport: 'sendBeacon', sendInstantly: true },
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
  const analytics = useAnalytics();
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
        analytics.capture(
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

    // Sticky stage for pageleave + unload `stage_exited` (leave).
    analytics.register({ stage });
    stageAbandon.stage = stage;
    stageAbandon.analytics = analytics;
    stageAbandon.takeElapsedMs = () => attention.takeElapsedMs();

    if (isRecordingWorthyStage(stage)) {
      analytics.ensureSessionRecording();
    }
    analytics.capture('stage_viewed', { stage });
  };

  const trackAnswerSelected = (stage: Stage, answer: string) => {
    if (stage === StageId.Choice && answer === 'red') {
      analytics.ensureSessionRecording();
    }
    analytics.capture('answer_selected', { stage, answer });
  };

  /** Intended story end: user reached JoinUs. Fires at most once per session. */
  const trackFlowCompleted = (answers: Record<string, string>) => {
    if (flowCompletedRef.current) return;
    flowCompletedRef.current = true;

    const startedAt = flowStartedAtRef.current;
    const time_to_complete_ms =
      startedAt === null ? 0 : Math.max(0, Date.now() - startedAt);

    analytics.capture(
      'flow_completed',
      buildFlowCompletedProperties(answers, { time_to_complete_ms }),
    );
  };

  const trackCommunityCtaClicked = (community_type: CommunityType) => {
    analytics.capture('community_cta_clicked', { community_type });
  };

  const trackFeedbackFormClicked = (stage: Stage) => {
    analytics.capture('feedback_form_clicked', { stage });
  };

  const trackNarrativeAdvanceClicked = (stage: Stage) => {
    analytics.ensureSessionRecording();
    analytics.capture('narrative_advance_clicked', { stage });
  };

  /** Sticky from Intro gender pick onward (super property + person property). */
  const trackGenderChoice = (genderChoice: GenderChoiceAnalytics) => {
    analytics.register({ gender_choice: genderChoice });
    analytics.setPersonProperties({ gender_choice: genderChoice });
    analytics.capture('gender_chosen', { gender_choice: genderChoice });
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
