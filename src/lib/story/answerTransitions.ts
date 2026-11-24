import {
  CognitiveDissonanceStepId,
  PersonalAccountabilityStepId,
  type Stage,
  StageId,
  type StepId,
  WantToSeeThemStepId,
} from '@/src/contexts/NavigationContext';
import { AnswerId } from '@/src/lib/answerIds';

export type AnswerDestination =
  | { type: 'stage'; stage: Stage }
  | { type: 'step'; stepId: StepId };

const isAny = (answer: string, aliases: readonly string[]) =>
  aliases.includes(answer);

export function nextAfterPersonalAccountabilityStep(
  stepId: StepId,
  answer: string,
): AnswerDestination {
  if (stepId === PersonalAccountabilityStepId.Initial) {
    return isAny(answer, [AnswerId.YES])
      ? { type: 'stage', stage: StageId.PersonalQuestion }
      : {
          type: 'step',
          stepId: PersonalAccountabilityStepId.OnlyBecauseOthers,
        };
  }

  if (stepId === PersonalAccountabilityStepId.OnlyBecauseOthers) {
    return isAny(answer, [AnswerId.YES])
      ? { type: 'stage', stage: StageId.PersonalQuestion }
      : { type: 'stage', stage: StageId.InjusticePersists };
  }

  return { type: 'stage', stage: StageId.InjusticePersists };
}

export function nextAfterWantToSeeThemStep(
  stepId: StepId,
  answer: string,
): AnswerDestination {
  if (stepId === WantToSeeThemStepId.Prompt) {
    return {
      type: 'step',
      stepId: isAny(answer, [AnswerId.YES])
        ? WantToSeeThemStepId.Watch
        : WantToSeeThemStepId.Decline,
    };
  }

  return { type: 'stage', stage: StageId.RootOfTheProblem };
}

export function nextAfterPersonalQuestion(answer: string): Stage {
  return isAny(answer, [AnswerId.NO])
    ? StageId.WouldYouLikeToBe
    : StageId.BreakingQuestion;
}

export function nextAfterWouldYouLikeToBe(answer: string): Stage {
  return isAny(answer, [AnswerId.DISAGREE])
    ? StageId.RecognizingInjustice
    : StageId.BreakingQuestion;
}

export function nextAfterBreakingQuestion(
  answer: string,
  answers: Record<string, string> = {},
): Stage {
  if (!isAny(answer, [AnswerId.REJECT])) {
    return StageId.SpasaStory;
  }
  if (
    answers.q1 === 'act' ||
    answers.q1 === 'admit' ||
    answers.q2 === 'act' ||
    answers.q3 === 'act'
  ) {
    return StageId.StillWantToKnow;
  }
  return StageId.ApatheticStance;
}

export function nextAfterStillWantToKnow(answer: string): Stage {
  return isAny(answer, [AnswerId.REJECT])
    ? StageId.ApatheticStance
    : StageId.SpasaStory;
}

export function nextAfterLetThemLive(answer: string): Stage {
  return isAny(answer, [AnswerId.REJECT])
    ? StageId.AcceptingSelfOwnership
    : StageId.FromTheWild;
}

export function nextAfterAcceptingSelfOwnership(answer: string): Stage {
  return isAny(answer, [AnswerId.REJECT])
    ? StageId.DishonestSelfOwnership
    : StageId.FromTheWild;
}

export function nextAfterSolutionUse(answer: string): Stage {
  return isAny(answer, [AnswerId.NO])
    ? StageId.RighteousChoice
    : StageId.SolutionKnow;
}

export function nextAfterSolutionKnow(answer: string): Stage {
  if (isAny(answer, [AnswerId.DONT_KNOW, AnswerId.NO])) {
    return StageId.VeganDietHealth;
  }
  return StageId.SolutionChoice;
}

export function nextAfterVeganDietHealth(answer: string): Stage {
  return isAny(answer, [AnswerId.REJECT])
    ? StageId.AdditionalResources
    : StageId.SolutionChoice;
}

export function nextAfterAdditionalResources(answer: string): Stage {
  return isAny(answer, [AnswerId.REJECT])
    ? StageId.NotAcceptingHealth
    : StageId.SolutionChoice;
}

export function nextAfterSolutionChoice(answer: string): Stage {
  return isAny(answer, [AnswerId.DISAGREE])
    ? StageId.AddressingContradiction
    : StageId.AlignBehaviour;
}

export function nextAfterAddressingContradiction(answer: string): Stage {
  return isAny(answer, [AnswerId.DISAGREE])
    ? StageId.NotHonest
    : StageId.AlignBehaviour;
}

export function nextAfterAlignBehaviour(answer: string): Stage {
  return isAny(answer, [AnswerId.NO])
    ? StageId.VeganSociety
    : StageId.VeganismPrinciple;
}

export function nextAfterVeganSociety(answer: string): Stage {
  return isAny(answer, [AnswerId.YES])
    ? StageId.Excuse
    : StageId.FittingInSociety;
}

export function nextAfterFittingInSociety(answer: string): Stage {
  return isAny(answer, [AnswerId.YES])
    ? StageId.VeganismPrinciple
    : StageId.Excuse;
}

export function nextAfterExcuse(answer: string): Stage {
  return isAny(answer, [AnswerId.NO])
    ? StageId.DoubleStandard
    : StageId.CognitiveDissonance;
}

export function nextAfterDoubleStandard(answer: string): Stage {
  if (isAny(answer, [AnswerId.WILL_STOP])) {
    return StageId.VeganismPrinciple;
  }
  if (isAny(answer, [AnswerId.NOT_RESPONSIBLE])) {
    return StageId.YouAreResponsible;
  }
  // NOT_IN_THEIR_PLACE: the branch-specific ending is chosen after
  // Cognitive Dissonance — see resolveCognitiveDissonanceExit.
  return StageId.CognitiveDissonance;
}

export function nextAfterYouAreResponsible(answer: string): Stage {
  return isAny(answer, [AnswerId.ACCEPT])
    ? StageId.ActResponsibly
    : StageId.CognitiveDissonance;
}

/**
 * Session-answer key holding the stage that led into Cognitive Dissonance.
 * Written on every answer transition into the stage; the dev nav menu clears
 * it on each jump, so an older branch can't leak into the exit.
 */
export const COGNITIVE_DISSONANCE_ORIGIN_KEY = `${StageId.CognitiveDissonance}:origin`;

/** Ending for a declined Vegan Challenge, by the stage that led into Cognitive Dissonance. */
const cognitiveDissonanceExits: Partial<Record<Stage, Stage>> = {
  [StageId.Excuse]: StageId.NotThreatened,
  [StageId.DoubleStandard]: StageId.OkWithInjustice,
  [StageId.YouAreResponsible]: StageId.AvoidingResponsibility,
  [StageId.ActResponsibly]: StageId.NotWhoYouThink,
};

export const COGNITIVE_DISSONANCE_ORIGINS = Object.keys(
  cognitiveDissonanceExits,
) as Stage[];

/** Stage whose Cognitive Dissonance branch ends on `exit`, if any. */
export function cognitiveDissonanceOriginOf(exit: Stage): Stage | undefined {
  return COGNITIVE_DISSONANCE_ORIGINS.find(
    (origin) => cognitiveDissonanceExits[origin] === exit,
  );
}

/**
 * Terminal exit for the branch that entered Cognitive Dissonance.
 * Falls back to AvoidingResponsibility when the origin is missing or not a
 * known branch (e.g. after a dev nav menu jump straight into the stage).
 */
export function resolveCognitiveDissonanceExit(
  answers: Record<string, string>,
): Stage {
  const origin = answers[COGNITIVE_DISSONANCE_ORIGIN_KEY];
  return origin && Object.hasOwn(cognitiveDissonanceExits, origin)
    ? cognitiveDissonanceExits[origin as Stage]!
    : StageId.AvoidingResponsibility;
}

export function nextAfterCognitiveDissonanceStep(
  stepId: StepId,
  answer: string,
  answers: Record<string, string> = {},
): AnswerDestination {
  if (stepId === CognitiveDissonanceStepId.Explanation) {
    return {
      type: 'step',
      stepId: CognitiveDissonanceStepId.SevenDays,
    };
  }

  if (stepId === CognitiveDissonanceStepId.SevenDays) {
    return {
      type: 'step',
      stepId: CognitiveDissonanceStepId.VeganChallenge,
    };
  }

  if (stepId === CognitiveDissonanceStepId.VeganChallenge) {
    return isAny(answer, [AnswerId.YES])
      ? { type: 'stage', stage: StageId.VeganChallenge }
      : { type: 'stage', stage: resolveCognitiveDissonanceExit(answers) };
  }

  return {
    type: 'stage',
    stage: resolveCognitiveDissonanceExit(answers),
  };
}

export function nextAfterActResponsibly(answer: string): Stage {
  return isAny(answer, [AnswerId.YES])
    ? StageId.VeganismPrinciple
    : StageId.CognitiveDissonance;
}
