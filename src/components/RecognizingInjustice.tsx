'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function RecognizingInjustice() {
  return <StoryStage stage={StageId.RecognizingInjustice} />;
}
