'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function AcceptingSelfOwnership() {
  return <StoryStage stage={StageId.AcceptingSelfOwnership} />;
}
