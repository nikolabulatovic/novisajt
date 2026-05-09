'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function SolutionChoice() {
  return <StoryStage stage={StageId.SolutionChoice} />;
}
