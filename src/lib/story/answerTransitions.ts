import { type Stage, StageId } from '@/src/contexts/NavigationContext';
import { AnswerId } from '@/src/lib/answerIds';

const isAny = (answer: string, aliases: readonly string[]) =>
  aliases.includes(answer);

/** Branching after the “personal question” screen. */
export function nextAfterPersonalQuestion(answer: string): Stage {
  return isAny(answer, [AnswerId.DONT_KNOW])
    ? StageId.WouldYouLikeToBe
    : StageId.BreakingQuestion;
}

export function nextAfterDaLiBiVoleo(answer: string): Stage {
  return isAny(answer, [AnswerId.DISAGREE])
    ? StageId.RecognizingInjustice
    : StageId.BreakingQuestion;
}

export function nextAfterBreakingQuestion(answer: string): Stage {
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
    ? StageId.AlreadyVegan
    : StageId.SolutionKnow;
}

/** `YES` ends the flow early; otherwise continue to solution-know. */
export function nextAfterVecVeganski(answer: string): Stage {
  return isAny(answer, [AnswerId.YES])
    ? StageId.AfterChoice
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

export function nextAfterKontradiktornostJe(answer: string): Stage {
  return isAny(answer, [AnswerId.DISAGREE])
    ? StageId.NotHonest
    : StageId.AlignBehaviour;
}

export function nextAfterAlignBehaviour(answer: string): Stage {
  return isAny(answer, [AnswerId.NO])
    ? StageId.BackToAnswers
    : StageId.VeganismPrinciple;
}

export function nextAfterVracanjeNaOdgovore(answer: string): Stage {
  return isAny(answer, [AnswerId.NO])
    ? StageId.BackToAnswersAgain
    : StageId.VeganismPrinciple;
}

export function nextAfterPonovoNaOdgovore(answer: string): Stage {
  return isAny(answer, [AnswerId.NO])
    ? StageId.NotFollowingThrough
    : StageId.VeganismPrinciple;
}
