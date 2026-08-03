'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function ReturnWhenReady() {
  return <StoryStage stage={StageId.ReturnWhenReady} />;
}
