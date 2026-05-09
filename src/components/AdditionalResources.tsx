'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function AdditionalResources() {
  return <StoryStage stage={StageId.AdditionalResources} />;
}
