'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function ViciousCycle() {
  return <StoryStage stage={StageId.ViciousCycle} />;
}
