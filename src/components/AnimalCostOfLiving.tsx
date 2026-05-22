'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function AnimalCostOfLiving() {
  return <StoryStage stage={StageId.AnimalCostOfLiving} />;
}
