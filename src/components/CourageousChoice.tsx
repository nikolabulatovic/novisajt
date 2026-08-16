'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function CourageousChoice() {
  return <StoryStage stage={StageId.CourageousChoice} />;
}
