'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function SolutionKnow() {
  return <StoryStage stage={StageId.SolutionKnow} />;
}
