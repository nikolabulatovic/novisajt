import type { Stage } from '@/contexts/NavigationContext';

const isAny = (answer: string, aliases: readonly string[]) =>
  aliases.includes(answer);

/** Branching after the “personal question” screen. */
export function nextAfterPersonalQuestion(answer: string): Stage {
  return isAny(answer, ['Ne znam', "I don't know"])
    ? 'da-li-bi-voleo'
    : 'breaking-question';
}

export function nextAfterDaLiBiVoleo(answer: string): Stage {
  return isAny(answer, ['Nije bitno', 'Nije mi bitno', "It doesn't matter"])
    ? 'prepoznavanje-nepravde'
    : 'breaking-question';
}

export function nextAfterBreakingQuestion(answer: string): Stage {
  return isAny(answer, ['Radije bih da ne znam', "I'd rather not know"])
    ? 'apatican-stav'
    : 'spasa-story';
}

export function nextAfterLetThemLive(answer: string): Stage {
  return isAny(answer, ['Ne prihvatam', 'I do not accept'])
    ? 'accepting-self-ownership'
    : 'from-the-wild';
}

export function nextAfterSolutionUse(answer: string): Stage {
  return isAny(answer, ['Ne', 'No']) ? 'vec-veganski' : 'solution-know';
}

/** `Spreman sam` ends the flow early; otherwise continue to solution-know. */
export function nextAfterVecVeganski(answer: string): Stage {
  return isAny(answer, ['Spreman sam', 'I am ready'])
    ? 'after-choice'
    : 'solution-know';
}

export function nextAfterSolutionKnow(answer: string): Stage {
  if (isAny(answer, ['Nisam siguran', 'Not sure', 'Ne možemo', "We can't"])) {
    return 'vegan-diet-health';
  }
  return 'solution-choice';
}

export function nextAfterVeganDietHealth(answer: string): Stage {
  return isAny(answer, ['Nije me ubedilo', "I'm not convinced"])
    ? 'nije-ubedilo-resursi'
    : 'solution-choice';
}

export function nextAfterSolutionChoice(answer: string): Stage {
  return isAny(answer, ['Ne slažem se', 'I disagree'])
    ? 'kontradiktornost-je'
    : 'align-behaviour';
}

export function nextAfterKontradiktornostJe(answer: string): Stage {
  return isAny(answer, ['Nije tačno', "That's not true"])
    ? 'nisi-iskren'
    : 'align-behaviour';
}

export function nextAfterAlignBehaviour(answer: string): Stage {
  return isAny(answer, ['Ne', 'No']) ? 'vracanje-na-odgovore' : 'veganism-principle';
}

export function nextAfterVracanjeNaOdgovore(answer: string): Stage {
  return isAny(answer, ['Ne', 'No']) ? 'ponovo-na-odgovore' : 'veganism-principle';
}

export function nextAfterPonovoNaOdgovore(answer: string): Stage {
  return isAny(answer, ['Ne', 'No']) ? 'ne-drzis-se' : 'veganism-principle';
}
