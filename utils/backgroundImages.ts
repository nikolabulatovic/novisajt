import { Stage } from '@/contexts/NavigationContext';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';

export function getBackgroundImageForStage(stage: Stage): string | null {
  return sectionBackgrounds[stage]?.backgroundImage || null;
}

export function getBackgroundOpacityForStage(stage: Stage): number {
  return sectionBackgrounds[stage]?.opacity ?? 0.8;
}
