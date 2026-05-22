'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function HistoricalSlavery() {
  return <StoryStage stage={StageId.HistoricalSlavery} />;
}
