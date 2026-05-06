'use client';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';

import NextButton from './ui/NextButton';
import StoryStage from './ui/StoryStage';

interface AcceptingSelfOwnershipProps {
  onComplete: () => void;
}

export default function AcceptingSelfOwnership({
  onComplete,
}: AcceptingSelfOwnershipProps) {
  const t = useTranslations('AcceptingSelfOwnership');

  return (
    <StoryStage
      stage={StageId.AcceptingSelfOwnership}
      footer={<NextButton onClick={onComplete} label={t('next')} show />}
    />
  );
}
