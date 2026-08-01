'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function DoubleStandard() {
  return <StoryStage stage={StageId.DoubleStandard} />;
}
