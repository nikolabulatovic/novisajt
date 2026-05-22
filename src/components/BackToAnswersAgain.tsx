'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function BackToAnswersAgain() {
  return <StoryStage stage={StageId.BackToAnswersAgain} />;
}
