'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function AlignBehaviour() {
  return <StoryStage stage={StageId.AlignBehaviour} />;
}
