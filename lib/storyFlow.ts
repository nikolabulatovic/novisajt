import { type Stage, StageId } from '@/contexts/NavigationContext';

const isAny = (answer: string, aliases: readonly string[]) =>
  aliases.includes(answer);

/** Branching after the “personal question” screen. */
export function nextAfterPersonalQuestion(answer: string): Stage {
  return isAny(answer, ['Ne znam', "I don't know"])
    ? StageId.WouldYouLikeToBe
    : StageId.BreakingQuestion;
}

export function nextAfterDaLiBiVoleo(answer: string): Stage {
  return isAny(answer, ['Nije bitno', 'Nije mi bitno', "It doesn't matter"])
    ? StageId.RecognizingInjustice
    : StageId.BreakingQuestion;
}

export function nextAfterBreakingQuestion(answer: string): Stage {
  return isAny(answer, ['Radije bih da ne znam', "I'd rather not know"])
    ? StageId.ApatheticStance
    : StageId.SpasaStory;
}

export function nextAfterLetThemLive(answer: string): Stage {
  return isAny(answer, ['Ne prihvatam', 'I do not accept'])
    ? StageId.AcceptingSelfOwnership
    : StageId.FromTheWild;
}

export function nextAfterSolutionUse(answer: string): Stage {
  return isAny(answer, ['Ne', 'No'])
    ? StageId.AlreadyVegan
    : StageId.SolutionKnow;
}

/** `Spreman sam` ends the flow early; otherwise continue to solution-know. */
export function nextAfterVecVeganski(answer: string): Stage {
  return isAny(answer, ['Spreman sam', 'I am ready'])
    ? StageId.AfterChoice
    : StageId.SolutionKnow;
}

export function nextAfterSolutionKnow(answer: string): Stage {
  if (isAny(answer, ['Nisam siguran', 'Not sure', 'Ne možemo', "We can't"])) {
    return StageId.VeganDietHealth;
  }
  return StageId.SolutionChoice;
}

export function nextAfterVeganDietHealth(answer: string): Stage {
  return isAny(answer, ['Nije me ubedilo', "I'm not convinced"])
    ? StageId.AdditionalResources
    : StageId.SolutionChoice;
}

export function nextAfterSolutionChoice(answer: string): Stage {
  return isAny(answer, ['Ne slažem se', 'I disagree'])
    ? StageId.AddressingContradiction
    : StageId.AlignBehaviour;
}

export function nextAfterKontradiktornostJe(answer: string): Stage {
  return isAny(answer, ['Nije tačno', "That's not true"])
    ? StageId.NotHonest
    : StageId.AlignBehaviour;
}

export function nextAfterAlignBehaviour(answer: string): Stage {
  return isAny(answer, ['Ne', 'No'])
    ? StageId.BackToAnswers
    : StageId.VeganismPrinciple;
}

export function nextAfterVracanjeNaOdgovore(answer: string): Stage {
  return isAny(answer, ['Ne', 'No'])
    ? StageId.BackToAnswersAgain
    : StageId.VeganismPrinciple;
}

export function nextAfterPonovoNaOdgovore(answer: string): Stage {
  return isAny(answer, ['Ne', 'No'])
    ? StageId.NotFollowingThrough
    : StageId.VeganismPrinciple;
}
