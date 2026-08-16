'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function RighteousChoice() {
  return <StoryStage stage={StageId.RighteousChoice} />;
}
