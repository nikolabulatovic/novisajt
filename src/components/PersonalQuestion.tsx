'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function PersonalQuestion() {
  return <StoryStage stage={StageId.PersonalQuestion} />;
}
