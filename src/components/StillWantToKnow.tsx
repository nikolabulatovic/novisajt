'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function StillWantToKnow() {
  return <StoryStage stage={StageId.StillWantToKnow} />;
}
