import { Stage } from '@/contexts/NavigationContext';

/**
 * Determines the next stage based on the current stage
 * This is used for transition effects to show the next background image
 */
export function getNextStage(currentStage: Stage, pillColor?: 'red' | 'blue'): Stage | null {
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
    'breaking-question': 'spasa-story',
    'spasa-story': 'spasa-revelation',
    'spasa-revelation': 'other-pigs',
    'other-pigs': 'root-of-the-problem',
    'root-of-the-problem': 'animals-treated-as-products',
    'animals-treated-as-products': 'let-them-live',
    'let-them-live': 'from-the-wild',
    'from-the-wild': 'animal-cost-of-living',
    'animal-cost-of-living': 'reproduction-control',
    'reproduction-control': 'solution-use',
    'solution-use': 'solution-know',
    'solution-know': 'solution-choice',
    'solution-choice': 'after-choice',
    facts: 'animal-exploitation',
    'animal-exploitation': 'moral-consistency',
    domestication: 'moral-consistency',
    'moral-consistency': 'final-choice',
    'final-choice': 'mirror',
    mirror: 'call-to-action',
    'call-to-action': 'after-choice',
    'after-choice': null,
  };

  return stageMap[currentStage] || null;
}



