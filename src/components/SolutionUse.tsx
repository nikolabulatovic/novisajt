'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function SolutionUse() {
  return <StoryStage stage={StageId.SolutionUse} />;
}
