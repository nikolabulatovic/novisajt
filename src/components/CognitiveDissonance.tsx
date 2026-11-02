'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function CognitiveDissonance() {
  return <StoryStage stage={StageId.CognitiveDissonance} />;
}
