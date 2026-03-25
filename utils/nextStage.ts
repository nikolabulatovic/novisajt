import { Stage } from '@/contexts/NavigationContext';

/**
 * Determines the next stage based on the current stage
 * This is used for transition effects to show the next background image
 */
export function getNextStage(
  currentStage: Stage,
  pillColor?: 'red' | 'blue',
): Stage | null {
  // For choice stage, red pill goes to intro, blue stays on choice
  if (currentStage === 'choice') {
    return pillColor === 'red' ? 'intro' : null;
  }

  // Map of current stage to next stage
  const stageMap: Record<Stage, Stage | null> = {
    choice: 'intro',
    intro: 'evaluation',
    evaluation: 'explanation',
    explanation: 'historical',
    historical: 'personal-question',
    'personal-question': 'breaking-question',
    'da-li-bi-voleo': 'breaking-question',
    'prepoznavanje-nepravde': null,
    'breaking-question': 'spasa-story',
    'ostani-komforan': null,
    'apatican-stav': null,
    'spasa-story': 'spasa-revelation',
    'spasa-revelation': 'other-pigs',
    'other-pigs': 'root-of-the-problem',
    'root-of-the-problem': 'animals-treated-as-products',
    'animals-treated-as-products': 'let-them-live',
    'let-them-live': 'from-the-wild',
    'from-the-wild': 'reproduction-control',
    'reproduction-control': 'vicious-cycle',
    'vicious-cycle': 'cow-fate',
    'cow-fate': 'animal-cost-of-living',
    'animal-cost-of-living': 'solution-use',
    'solution-use': 'solution-know',
    'vec-veganski': 'solution-know',
    'solution-know': 'solution-choice',
    'vegan-diet-health': 'solution-choice',
    'nije-ubedilo-resursi': 'solution-choice',
    'solution-choice': 'align-behaviour',
    'kontradiktornost-je': 'align-behaviour',
    'nisi-iskren': null,
    'align-behaviour': 'veganism-principle',
    'vracanje-na-odgovore': 'veganism-principle',
    'ponovo-na-odgovore': 'veganism-principle',
    'ne-drzis-se': null,
    'veganism-principle': 'after-choice',
    'after-choice': null,
  };

  return stageMap[currentStage] || null;
}
