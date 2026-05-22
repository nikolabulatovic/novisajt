'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function WouldYouLikeToBe() {
  return <StoryStage stage={StageId.WouldYouLikeToBe} />;
}
