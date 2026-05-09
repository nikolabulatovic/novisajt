'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function QuestionExplanation() {
  return <StoryStage stage={StageId.Explanation} />;
}
