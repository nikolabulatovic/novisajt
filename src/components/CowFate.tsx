'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function CowFate() {
  return <StoryStage stage={StageId.CowFate} />;
}
