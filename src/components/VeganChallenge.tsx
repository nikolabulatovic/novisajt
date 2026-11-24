'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function VeganChallenge() {
  return <StoryStage stage={StageId.VeganChallenge} />;
}
