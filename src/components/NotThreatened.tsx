'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function NotThreatened() {
  return <StoryStage stage={StageId.NotThreatened} />;
}
