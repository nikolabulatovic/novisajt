type Locale = 'sr' | 'en';

type MessageNamespace =
  | 'Metadata'
  | 'QuestionExplanation'
  | 'PersonalQuestion'
  | 'WouldYouLikeToBe'
  | 'ChoiceStage';

const namespaceFiles: Record<MessageNamespace, string> = {
  Metadata: 'metadata',
  QuestionExplanation: 'question-explanation',
  PersonalQuestion: 'personal-question',
  WouldYouLikeToBe: 'would-you-like-to-be',
  ChoiceStage: 'choice-stage',
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
