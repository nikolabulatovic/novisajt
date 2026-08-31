'use client';

import { useEffect } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';
import { useViewportDevice } from '@/src/hooks/useViewportDevice';
import { DEFAULT_USER_GENDER, type UserGender } from '@/src/lib/gender';
import { warmStageImage } from '@/src/lib/preloadStageImage';
import { getNextStageCandidates } from '@/src/lib/story/nextStageCandidates';
import {
  resolveBackgroundImage,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';

/**
 * While `stage` is visible, warm the static background(s) for the next hop
 * (direct next, or every distinct answer-fork destination).
 */
export function usePreloadNextStageImages(
  stage: Stage,
  gender: UserGender | null,
): void {
  const device = useViewportDevice();
  const resolvedGender = gender ?? DEFAULT_USER_GENDER;

  useEffect(() => {
    const candidates = getNextStageCandidates(stage);
    for (const next of candidates) {
      const src = resolveBackgroundImage(
        stageConfig[next]?.backgroundImage,
        resolvedGender,
        device,
      );
      warmStageImage(src);
    }
  }, [stage, resolvedGender, device]);
}
