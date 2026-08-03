'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function ActResponsibly() {
  return <StoryStage stage={StageId.ActResponsibly} />;
}
