'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function OkWithInjustice() {
  return <StoryStage stage={StageId.OkWithInjustice} />;
}
