'use client';

import { useTranslations } from 'next-intl';

import type { Stage } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { NEXT_LABEL, stageConfig } from '@/src/lib/story/stageUiConfig';

import NextButton from './NextButton';

interface StoryStageNextPillProps {
  stage: Stage;
  visible: boolean;
}

export default function StoryStageNextPill({
  stage,
  visible,
}: StoryStageNextPillProps) {
  const stageCfg = stageConfig[stage];
  const translationNamespace = stageCfg.translationNamespace ?? stage;
  const t = useTranslations(translationNamespace);
  const { completeStage } = useStoryFlow();

  return (
    <NextButton
      onClick={() => completeStage(stage)}
      label={t(NEXT_LABEL)}
      show={visible}
    />
  );
}
