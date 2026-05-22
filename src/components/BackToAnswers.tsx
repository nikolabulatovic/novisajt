'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function BackToAnswers() {
  return <StoryStage stage={StageId.BackToAnswers} />;
}
