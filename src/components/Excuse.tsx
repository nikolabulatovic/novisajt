'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function Excuse() {
  return <StoryStage stage={StageId.Excuse} />;
}
