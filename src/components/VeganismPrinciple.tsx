'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function VeganismPrinciple() {
  return <StoryStage stage={StageId.VeganismPrinciple} />;
}
