'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function OtherPigs() {
  return <StoryStage stage={StageId.OtherPigs} />;
}
