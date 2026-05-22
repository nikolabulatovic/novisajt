'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function NotHonest() {
  return <StoryStage stage={StageId.NotHonest} />;
}
