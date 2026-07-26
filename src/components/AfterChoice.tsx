'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function AfterChoice() {
  return <StoryStage stage={StageId.AfterChoice} />;
}
