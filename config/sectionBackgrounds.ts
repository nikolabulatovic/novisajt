import { Stage } from '@/contexts/NavigationContext';

export interface SectionBackgroundConfig {
  backgroundImage?: string;
  opacity?: number;
}

export const sectionBackgrounds: Record<Stage, SectionBackgroundConfig> = {
  choice: {
    backgroundImage: '/images/red-pill-blue-pill-cover-ai.png',
    opacity: 0.2,
  },
  intro: {
    backgroundImage: '/images/intro-reflection.jpeg',
    opacity: 0.2,
  },
  evaluation: {
    backgroundImage: '/images/character-introspection.jpeg',
    opacity: 0.5,
  },
  explanation: {
    backgroundImage: '/images/ogledalo.png',
    opacity: 0.35,
  },
  historical: {
    backgroundImage: '/images/historical-weight.png',
    opacity: 0.75,
  },
  'personal-question': {
    backgroundImage: '/images/covek-u-grupi.jpeg',
    opacity: 0.3,
  },
  'breaking-question': {
    backgroundImage: '/images/odluka-put.jpg',
    opacity: 0.5,
  },
  'spasa-story': {
    backgroundImage: '/images/spasa-rescue-hope.png',
    opacity: 0.8,
  },
  'spasa-revelation': {
    backgroundImage: '/images/spasa-prasa.jpg',
    opacity: 0.8,
  },
  'other-pigs': {
    backgroundImage: '/images/enslaved-pigs.jpg',
    opacity: 0.8,
  },
  facts: {
    opacity: 0.8,
  },
  'root-of-the-problem': {
    backgroundImage: '/images/horse-stable-gray.jpg',
    opacity: 0.8,
  },
  'animals-treated-as-products': {
    backgroundImage: '/images/industrija-koze.png',
    opacity: 0.8,
  },
  'let-them-live': {
    backgroundImage: '/images/farm-animals.jpg',
    opacity: 0.8,
  },
  'from-the-wild': {
    backgroundImage: '/images/farm-animals.jpg',
    opacity: 0.8,
  },
  'animal-cost-of-living': {
    backgroundImage: '/images/farm-animals.jpg',
    opacity: 0.8,
  },
  'reproduction-control': {
    backgroundImage: '/images/farm-animals.jpg',
    opacity: 0.8,
  },
  'animal-exploitation': {
    backgroundImage: '/images/animal-exploitation-bg.jpg',
    opacity: 0.25,
  },
  domestication: {
    opacity: 0.8,
  },
  'moral-consistency': {
    opacity: 0.8,
  },
  'final-choice': {
    opacity: 0.8,
  },
  mirror: {
    opacity: 0.8,
  },
  'call-to-action': {
    opacity: 0.8,
  },
  'after-choice': {
    opacity: 0.8,
  },
};

