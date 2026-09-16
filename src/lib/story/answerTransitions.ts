import {
  PersonalAccountabilityStepId,
  type Stage,
  StageId,
  type StepId,
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
    ? StageId.Excuse
    : StageId.VeganismPrinciple;
}

export function nextAfterExcuse(answer: string): Stage {
  return isAny(answer, [AnswerId.NO])
    ? StageId.DoubleStandard
    : StageId.NotThreatened;
}

export function nextAfterDoubleStandard(answer: string): Stage {
  if (isAny(answer, [AnswerId.WILL_STOP])) {
    return StageId.VeganismPrinciple;
  }
  if (isAny(answer, [AnswerId.NOT_RESPONSIBLE])) {
    return StageId.YouAreResponsible;
  }
  if (isAny(answer, [AnswerId.NOT_IN_THEIR_PLACE])) {
    return StageId.OkWithInjustice;
  }
  return StageId.NotThreatened;
}

export function nextAfterYouAreResponsible(answer: string): Stage {
  return isAny(answer, [AnswerId.ACCEPT])
    ? StageId.ActResponsibly
    : StageId.AvoidingResponsibility;
}

export function nextAfterActResponsibly(answer: string): Stage {
  return isAny(answer, [AnswerId.YES])
    ? StageId.VeganismPrinciple
    : StageId.NotWhoYouThink;
}
