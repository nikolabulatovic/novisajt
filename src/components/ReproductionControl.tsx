'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function ReproductionControl() {
  return <StoryStage stage={StageId.ReproductionControl} />;
}
