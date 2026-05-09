'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function AddressingContradiction() {
  return <StoryStage stage={StageId.AddressingContradiction} />;
}
