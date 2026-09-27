import type { PostHog } from 'posthog-js';

import { Stage, StageId } from '@/src/contexts/NavigationContext';
import { AnswerId } from '@/src/lib/answerIds';
import { applyDevAccessFromUrl } from '@/src/lib/applyDevAccessFromUrl';
import type { GenderChoiceAnalytics } from '@/src/lib/gender';

export type CommunityType = 'whatsapp' | 'discord' | 'telegram';

/** How the user left a stage: advanced in-flow, or abandoned the page. */
export type StageExitType = 'next' | 'leave';

/**
 * After this much quiet time (no pointer/key/scroll), stage attention pauses.
 * Quiet reading still counts up to this window after the last interaction.
 */
export const STAGE_ATTENTION_IDLE_MS = 60_000;

/** Hard cap so one zombie session can’t dominate daily averages. */
export const STAGE_ATTENTION_MAX_MS = 10 * 60_000;

/** Locale-specific Google Forms for end-of-flow feedback. */
export const FEEDBACK_FORM_URLS = {
  en: 'https://forms.gle/yV3uM7bB9woaFEEx9',
  sr: 'https://forms.gle/sRFYBQ8cBdSu9tMeA',
} as const satisfies Record<'en' | 'sr', string>;

export function feedbackFormUrlForLocale(locale: string): string {
  if (locale in FEEDBACK_FORM_URLS) {
    return FEEDBACK_FORM_URLS[locale as keyof typeof FEEDBACK_FORM_URLS];
  }
  return FEEDBACK_FORM_URLS.sr;
}

/** Blue pill / comfort exit — short dead-end, not worth the recorder. */
export function isRecordingWorthyStage(stage: Stage) {
  return stage !== StageId.Choice && stage !== StageId.StayComfortable;
}

/**
 * Persist `utm_campaign` from the landing URL onto subsequent events.
 * PostHog also auto-captures UTMs; this makes the value an explicit super property
 * for our custom funnel events.
 */
export function registerCampaignFromUrl(posthog: PostHog | undefined) {
  if (!posthog || typeof window === 'undefined') return;

  const campaign = new URLSearchParams(window.location.search).get(
    'utm_campaign',
  );
  if (!campaign) return;

  posthog.register({ utm_campaign: campaign });
  posthog.people.set_once({ initial_utm_campaign: campaign });
}

/** Sticky locale (`sr` / `en`) on all subsequent events for this session. */
export function registerLocale(posthog: PostHog | undefined, locale: string) {
  if (!posthog || !locale) return;

  posthog.register({ locale });
  posthog.people.set({ locale });
}

/**
 * Sticky flag when nav, skip-pacing, or test mode is on for this tab.
 * Always re-registers so a later normal visit clears a prior `true` in persistence.
 * Filter campaign funnels with `is_dev_session = false`.
 */
export function registerDevSession(posthog: PostHog | undefined) {
  if (!posthog || typeof window === 'undefined') return;

  const { showNav, skipPacing } = applyDevAccessFromUrl();
  posthog.register({ is_dev_session: showNav || skipPacing });
}

function genderChoiceFromIntroAnswer(
  introAnswer: string | undefined,
): GenderChoiceAnalytics | undefined {
  switch (introAnswer) {
    case AnswerId.MALE:
      return 'male';
    case AnswerId.FEMALE:
      return 'female';
    case AnswerId.SKIP_GENDER:
      return 'rather_not';
    case AnswerId.NOT_IMPORTANT:
      return 'not_important';
    default:
      return undefined;
  }
}

/** Summary properties for `flow_completed` (reached JoinUs — the intended story end). */
export function buildFlowCompletedProperties(
  answers: Record<string, string>,
  extras: { time_to_complete_ms: number },
) {
  const gender_choice = genderChoiceFromIntroAnswer(answers[StageId.Intro]);

  return {
    time_to_complete_ms: extras.time_to_complete_ms,
    q1_answer: answers.q1,
    q2_answer: answers.q2,
    q3_answer: answers.q3,
    ...(gender_choice ? { gender_choice } : {}),
  };
}

export function buildStageExitedProperties(
  stage: Stage,
  extras: {
    exit_type: StageExitType;
    time_spent_ms: number;
    /** Present when advancing to another stage; omitted on page leave. */
    next_stage?: Stage;
  },
) {
  return {
    stage,
    exit_type: extras.exit_type,
    time_spent_ms: extras.time_spent_ms,
    ...(extras.next_stage != null ? { next_stage: extras.next_stage } : {}),
  };
}
