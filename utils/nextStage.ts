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
    'breaking-question': 'spasa-story', // Assuming "Želim da znam" answer
    'spasa-story': 'spasa-revelation',
    'spasa-revelation': 'spasa-revelation-part1',
    'spasa-revelation-part1': 'facts',
    facts: 'spasa-revelation-part2',
    'spasa-revelation-part2': 'animal-exploitation',
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



