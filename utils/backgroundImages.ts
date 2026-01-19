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

export function getBackgroundOpacityForStage(stage: Stage): number {
  const opacityMap: Record<Stage, number> = {
    choice: 0.2, // opacity-20
    intro: 0.2, // PageContainer default for RedPillIntro
    evaluation: 0.5, // opacity-50
    explanation: 0.8, // default
    historical: 0.75, // opacity-75 for intro stage
    'personal-question': 0.8,
    'breaking-question': 0.8,
    'spasa-story': 0.8, // PageContainer default
    'spasa-revelation': 0.8, // PageContainer default
    'spasa-revelation-part1': 0.8, // PageContainer default
    facts: 0.8,
    'spasa-revelation-part2': 0.8, // PageContainer default
    'animal-exploitation': 0.8, // PageContainer default
    domestication: 0.8,
    'moral-consistency': 0.8,
    'final-choice': 0.8,
    mirror: 0.8,
    'call-to-action': 0.8,
    'after-choice': 0.8,
  };

  return opacityMap[stage] || 0.8;
}
