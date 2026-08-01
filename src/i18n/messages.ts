type Locale = 'sr' | 'en';

const MESSAGE_FILES = [
  'metadata',
  'navigation-menu',
  'question-explanation',
  'personal-question',
  'would-you-like-to-be',
  'choice-stage',
  'red-pill-intro',
  'character-evaluation',
  'character-incompatible',
  'historical-intro',
  'historical-slavery',
  'historical-authoritarianism',
  'personal-accountability',
  'injustice-persists',
  'spasa-revelation',
  'other-pigs',
  'root-of-the-problem',
  'animals-treated-as-products',
  'breaking-question',
  'stay-comfortable',
  'apathetic-stance',
  'already-vegan',
  'let-them-live',
  'align-behaviour',
  'veganism-principle',
  'solution-choice',
  'vegan-diet-health',
  'additional-resources',
  'not-accepting-health',
  'solution-use',
  'solution-know',
  'addressing-contradiction',
  'not-honest',
  'excuse',
  'double-standard',
  'not-threatened',
  'recognizing-injustice',
  'accepting-self-ownership',
  'dishonest-self-ownership',
  'from-the-wild',
  'reproduction-control',
  'vicious-cycle',
  'cow-fate',
  'animal-cost-of-living',
  'after-choice',
] as const;

async function loadNamespace(locale: Locale, fileName: string) {
  return (await import(`../../messages/${locale}/${fileName}.json`)).default;
}

export async function loadMessages(locale: Locale) {
  const fileEntries = await Promise.all(
    MESSAGE_FILES.map(async (fileName) => {
      const messages = await loadNamespace(locale, fileName);
      return [fileName, messages] as const;
    }),
  );
  return Object.fromEntries(fileEntries);
}
