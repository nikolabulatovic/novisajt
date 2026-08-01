'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function InjusticePersists() {
  return <StoryStage stage={StageId.InjusticePersists} />;
}
