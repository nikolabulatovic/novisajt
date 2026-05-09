'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function ApatheticStance() {
  return <StoryStage stage={StageId.ApatheticStance} />;
}
