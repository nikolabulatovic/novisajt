'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function VeganDietHealth() {
  return <StoryStage stage={StageId.VeganDietHealth} />;
}
