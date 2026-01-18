import { Stage } from '@/contexts/NavigationContext';

export function getBackgroundImageForStage(stage: Stage): string | null {
  const backgroundMap: Record<Stage, string | null> = {
    choice: '/images/red-pill-blue-pill-cover-ai.png',
    intro: '/images/intro-reflection.jpeg',
    evaluation: '/images/character-introspection.jpeg',
    explanation: null, // QuestionExplanation might not have a background
    historical: '/images/historical-weight.png',
    'personal-question': null,
    'breaking-question': null,
    'spasa-story': '/images/spasa-rescue-hope.png',
    'spasa-revelation': '/images/spasa-revelation-bg.jpg',
    'spasa-revelation-part1': '/images/spasa-revelation-part1-bg.jpg',
    facts: null,
    'spasa-revelation-part2': '/images/spasa-revelation-part2-bg.jpg',
    'animal-exploitation': '/images/animal-exploitation-bg.jpg',
    domestication: null,
    'moral-consistency': null,
    'final-choice': null,
    mirror: null,
    'call-to-action': null,
    'after-choice': null,
  };

  return backgroundMap[stage] || null;
}

