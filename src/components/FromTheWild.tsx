'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function FromTheWild() {
  return <StoryStage stage={StageId.FromTheWild} />;
}
