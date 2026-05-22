'use client';

import { StageId } from '@/src/contexts/NavigationContext';

import StoryStage from './ui/StoryStage';

export default function CharacterIncompatible() {
  return <StoryStage stage={StageId.CharacterIncompatible} />;
}
