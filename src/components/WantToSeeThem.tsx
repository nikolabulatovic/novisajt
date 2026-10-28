'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function WantToSeeThem() {
  return <StoryStage stage={StageId.WantToSeeThem} />;
}
