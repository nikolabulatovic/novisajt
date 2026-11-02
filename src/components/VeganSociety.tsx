'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function VeganSociety() {
  return <StoryStage stage={StageId.VeganSociety} />;
}
