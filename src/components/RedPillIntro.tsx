'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function RedPillIntro() {
  return <StoryStage stage={StageId.Intro} />;
}
