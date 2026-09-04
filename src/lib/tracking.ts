import { Stage, StageId } from '@/src/contexts/NavigationContext';
import { AnswerId } from '@/src/lib/answerIds';
import type { GenderChoiceAnalytics } from '@/src/lib/gender';

export type CommunityType = 'whatsapp' | 'discord' | 'telegram';

/** Blue pill / comfort exit — short dead-end, not worth the recorder. */
export function isRecordingWorthyStage(stage: Stage) {
  return stage !== StageId.Choice && stage !== StageId.StayComfortable;
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
