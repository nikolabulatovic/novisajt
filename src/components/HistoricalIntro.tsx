'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function HistoricalIntro() {
  return <StoryStage stage={StageId.HistoricalIntro} />;
}
