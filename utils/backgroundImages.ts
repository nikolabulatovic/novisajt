import { stageConfig } from '@/config/stageConfig';
import { Stage } from '@/contexts/NavigationContext';

export function getBackgroundImageForStage(stage: Stage): string | null {
  return stageConfig[stage]?.backgroundImage || null;
}

export function getBackgroundOpacityForStage(stage: Stage): number {
  return stageConfig[stage]?.opacity ?? 0.8;
}
