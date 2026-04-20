type Locale = 'sr' | 'en';

type MessageNamespace =
  | 'Metadata'
  | 'NavigationMenu'
  | 'QuestionExplanation'
  | 'PersonalQuestion'
  | 'WouldYouLikeToBe'
  | 'ChoiceStage'
  | 'RedPillIntro'
  | 'CharacterEvaluation'
  | 'HistoricalInjustices'
  | 'BreakingQuestion'
  | 'StayComfortable'
  | 'ApatheticStance'
  | 'AlreadyVegan'
  | 'LetThemLive'
  | 'AlignBehaviour'
  | 'SolutionChoice'
  | 'VeganDietHealth'
  | 'SolutionUse'
  | 'SolutionKnow'
  | 'AddressingContradiction'
  | 'BackToAnswers'
  | 'BackToAnswersAgain';

const namespaceFiles: Record<MessageNamespace, string> = {
  Metadata: 'metadata',
  NavigationMenu: 'navigation-menu',
  QuestionExplanation: 'question-explanation',
  PersonalQuestion: 'personal-question',
  WouldYouLikeToBe: 'would-you-like-to-be',
  ChoiceStage: 'choice-stage',
  RedPillIntro: 'red-pill-intro',
  CharacterEvaluation: 'character-evaluation',
  HistoricalInjustices: 'historical-injustices',
  BreakingQuestion: 'breaking-question',
  StayComfortable: 'stay-comfortable',
  ApatheticStance: 'apathetic-stance',
  AlreadyVegan: 'already-vegan',
  LetThemLive: 'let-them-live',
  AlignBehaviour: 'align-behaviour',
  SolutionChoice: 'solution-choice',
  VeganDietHealth: 'vegan-diet-health',
  SolutionUse: 'solution-use',
  SolutionKnow: 'solution-know',
  AddressingContradiction: 'addressing-contradiction',
  BackToAnswers: 'back-to-answers',
  BackToAnswersAgain: 'back-to-answers-again',
};

async function loadNamespace(locale: Locale, fileName: string) {
  return (await import(`../messages/${locale}/${fileName}.json`)).default;
}

export async function loadMessages(locale: Locale) {
  const entries = await Promise.all(
    (Object.keys(namespaceFiles) as MessageNamespace[]).map(
      async (namespace) => {
        const fileName = namespaceFiles[namespace];
        const messages = await loadNamespace(locale, fileName);
        return [namespace, messages] as const;
      },
    ),
  );

  return Object.fromEntries(entries);
}
