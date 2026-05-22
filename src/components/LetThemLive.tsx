'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function LetThemLive() {
  return <StoryStage stage={StageId.LetThemLive} />;
}
