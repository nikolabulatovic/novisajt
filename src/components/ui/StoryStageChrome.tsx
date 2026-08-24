'use client';

import { useCallback, useEffect, useState } from 'react';

import type { Stage } from '@/src/contexts/NavigationContext';
import { useGenderedTranslations } from '@/src/hooks/useGenderedTranslations';
import { useResolvedBackgroundImage } from '@/src/hooks/useResolvedBackgroundImage';
import { AnimatedTextBlock } from '@/src/lib/i18n/animatedText';
import {
  DEFAULT_STAGE_BODY,
  DEFAULT_STAGE_SHELL,
  DEFAULT_STORY_UI,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';
import {
  ANSWER_IDLE_SHELL_STATE,
  answerChoiceShellFadeOnlyClassName,
} from '@/src/lib/ui/answerChoiceInteraction';

import {
  STORY_STAGE_SURFACE_FRAME_CLASS,
  STORY_STAGE_TEXT_PADDING_CLASS,
  STORY_STAGE_TEXT_TONE_CLASS,
} from '../../constants/storyStageTokens';
import AnimatedText from './AnimatedText';
import ContentContainer from './ContentContainer';
import PageContainer from './PageContainer';
import StageTextSurface from './StageTextSurface';
import StoryStageNextInteraction from './StoryStageNextInteraction';

const ANSWER_SHELL_STACK_GAP: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'space-y-4',
  md: 'space-y-8',
  lg: 'space-y-10',
};

export interface StoryStageChromeProps {
  stage: Stage;
}

/** Config-driven default stage renderer (body + next interaction). */
export default function StoryStageChrome({ stage }: StoryStageChromeProps) {
  const cfg = stageConfig[stage];
  const body = cfg.body;
  const ui = cfg.additionalUiConfig;
  const bodyTextKey = body?.textKey ?? DEFAULT_STAGE_BODY.textKey;
  const { raw: rawBody } = useGenderedTranslations(
    cfg.translationNamespace ?? stage,
  );

  const [nextInteraction, setNextInteractionVisible] = useState(false);
  const [answerShellState, setAnswerShellState] = useState(() => ({
    ...ANSWER_IDLE_SHELL_STATE,
  }));

  const wrapsAnswerShell = cfg.nextInteraction === 'answer';
  const contentSpacing = ui?.contentSpacing ?? DEFAULT_STORY_UI.contentSpacing;

  useEffect(() => {
    setNextInteractionVisible(false);
  }, [stage]);

  useEffect(() => {
    setAnswerShellState({ ...ANSWER_IDLE_SHELL_STATE });
  }, [stage]);

  const revealNextInteraction = useCallback(
    () => setNextInteractionVisible(true),
    [],
  );

  const backgroundImage = useResolvedBackgroundImage(cfg.backgroundImage);
  const backgroundImageOpacity = cfg.opacity ?? DEFAULT_STAGE_SHELL.opacity;
  const backgroundImagePosition =
    cfg.backgroundPosition ?? DEFAULT_STAGE_SHELL.backgroundPosition;
  const backgroundImagePositionMd = cfg.backgroundPositionMd;
  const backgroundImagePositionSm = cfg.backgroundPositionSm;

  const stackGapClass = ANSWER_SHELL_STACK_GAP[contentSpacing];

  const storyBody = (
    <>
      <StageTextSurface
        stage={stage}
        surface={cfg.textSurface}
        glassVariant={cfg.glassVariant}
        className={
          STORY_STAGE_SURFACE_FRAME_CLASS[
            ui?.textSurfaceFrame ?? DEFAULT_STORY_UI.textSurfaceFrame
          ]
        }
        contentClassName={
          STORY_STAGE_TEXT_PADDING_CLASS[
            ui?.textPadding ?? DEFAULT_STORY_UI.textPadding
          ]
        }
        backdropType={ui?.backdropType}
        backdropOpacity={ui?.backdropOpacity}
        backdropFade={ui?.backdropFade}
        backdropColor={ui?.backdropColor}
      >
        <AnimatedText
          text={rawBody(bodyTextKey) as AnimatedTextBlock}
          speed={body?.speed ?? DEFAULT_STAGE_BODY.speed}
          delayAfterComplete={
            body?.delayAfterComplete ?? DEFAULT_STAGE_BODY.delayAfterComplete
          }
          textSize={body?.textSize ?? DEFAULT_STAGE_BODY.textSize}
          alignment={body?.alignment ?? DEFAULT_STAGE_BODY.alignment}
          wordTransitionDuration={
            body?.wordTransitionDuration ??
            DEFAULT_STAGE_BODY.wordTransitionDuration
          }
          className={
            STORY_STAGE_TEXT_TONE_CLASS[
              body?.textTone ?? DEFAULT_STAGE_BODY.textTone
            ]
          }
          onComplete={revealNextInteraction}
        />
      </StageTextSurface>
      <StoryStageNextInteraction
        stage={stage}
        visible={nextInteraction}
        onAnswerChoiceShellChange={
          wrapsAnswerShell ? setAnswerShellState : undefined
        }
      />
    </>
  );

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={backgroundImageOpacity}
      backgroundImagePosition={backgroundImagePosition}
      backgroundImagePositionMd={backgroundImagePositionMd}
      backgroundImagePositionSm={backgroundImagePositionSm}
      backgroundWash={cfg.backgroundWash ?? DEFAULT_STAGE_SHELL.backgroundWash}
      maxWidth={ui?.maxWidth ?? DEFAULT_STORY_UI.maxWidth}
      showBackgroundEffects={
        cfg.showBackgroundEffects ?? DEFAULT_STAGE_SHELL.showBackgroundEffects
      }
    >
      <ContentContainer
        spacing={contentSpacing}
        align={ui?.contentAlign ?? DEFAULT_STORY_UI.contentAlign}
      >
        {wrapsAnswerShell ? (
          <div
            className={`${stackGapClass} ${answerChoiceShellFadeOnlyClassName(
              answerShellState.isTransitioning,
              answerShellState.showContent,
            )}`}
          >
            {storyBody}
          </div>
        ) : (
          storyBody
        )}
      </ContentContainer>
    </PageContainer>
  );
}
