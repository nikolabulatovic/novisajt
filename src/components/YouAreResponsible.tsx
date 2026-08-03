'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function YouAreResponsible() {
  return <StoryStage stage={StageId.YouAreResponsible} />;
}
