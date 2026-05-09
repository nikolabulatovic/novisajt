'use client';

import { useCallback, useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import type { Stage } from '@/src/contexts/NavigationContext';
import { AnimatedTextBlock } from '@/src/lib/i18n/animatedText';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

import {
  STORY_STAGE_SURFACE_FRAME_CLASS,
  STORY_STAGE_TEXT_PADDING_CLASS,
} from '../../constants/storyStageTokens';
import AnimatedText from './AnimatedText';
import ContentContainer from './ContentContainer';
import PageContainer from './PageContainer';
import StageTextSurface from './StageTextSurface';
import StoryStageNextInteraction from './StoryStageNextInteraction';

export interface StoryStageChromeProps {
  stage: Stage;
  /** Step inside one stage (default final step = 2). */
  step?: 1 | 2;
}

/** Config-driven default stage renderer (body + next interaction). */
export default function StoryStageChrome({
  stage,
  step = 2,
}: StoryStageChromeProps) {
  const cfg = stageConfig[stage];
  const bodyCfg = cfg.body;
  const bodyTextKey = bodyCfg?.textKey ?? 'text';
  const tBody = useTranslations(cfg.translationNamespace ?? stage);

  const [nextInteraction, setNextInteractionVisible] = useState(false);

  useEffect(() => {
    setNextInteractionVisible(false);
  }, [stage]);

  const revealNextInteraction = useCallback(
    () => setNextInteractionVisible(true),
    [],
  );

  const storyDefaults = cfg.additionalUiConfig ?? {};
  const backgroundImage = cfg.backgroundImage;
  const backgroundImageOpacity = cfg.opacity ?? 0.8;

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={backgroundImageOpacity}
      maxWidth={storyDefaults.maxWidth ?? 'md'}
      showBackgroundEffects={cfg.showBackgroundEffects ?? false}
    >
      <ContentContainer
        spacing={storyDefaults.contentSpacing ?? 'lg'}
        align={storyDefaults.contentAlign ?? 'center'}
      >
        <StageTextSurface
          stage={stage}
          surface={cfg.textSurface}
          glassVariant={cfg.glassVariant}
          className={
            STORY_STAGE_SURFACE_FRAME_CLASS[
              storyDefaults.textSurfaceFrame ?? 'default'
            ]
          }
          contentClassName={
            STORY_STAGE_TEXT_PADDING_CLASS[
              storyDefaults.textPadding ?? 'default'
            ]
          }
          backdropType={storyDefaults.backdropType}
          backdropOpacity={storyDefaults.backdropOpacity}
        >
          <AnimatedText
            text={tBody.raw(bodyTextKey) as AnimatedTextBlock}
            speed={bodyCfg?.speed}
            delayAfterComplete={bodyCfg?.delayAfterComplete}
            textSize={bodyCfg?.textSize}
            alignment={bodyCfg?.alignment}
            wordTransitionDuration={bodyCfg?.wordTransitionDuration}
            onComplete={revealNextInteraction}
          />
        </StageTextSurface>
        <StoryStageNextInteraction
          stage={stage}
          visible={nextInteraction}
          step={step}
        />
      </ContentContainer>
    </PageContainer>
  );
}
