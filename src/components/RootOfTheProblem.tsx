'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function RootOfTheProblem() {
  return <StoryStage stage={StageId.RootOfTheProblem} />;
}
