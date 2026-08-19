'use client';

import { useCallback, useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { useScheduledTimeouts } from '@/src/hooks/useScheduledTimeouts';
import { AnswerId } from '@/src/lib/answerIds';
import { AnimatedTextBlock } from '@/src/lib/i18n/animatedText';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';
import {
  DEFAULT_STAGE_BODY,
  DEFAULT_STAGE_SHELL,
  DEFAULT_STORY_UI,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';
import {
  ANSWER_CHOICE_COMMIT_AFTER_BULK_MS,
  ANSWER_IDLE_SHELL_STATE,
  answerChoiceShellFadeOnlyClassName,
} from '@/src/lib/ui/answerChoiceInteraction';

import {
  STORY_STAGE_SURFACE_FRAME_CLASS,
  STORY_STAGE_TEXT_PADDING_CLASS,
} from '../constants/storyStageTokens';
import GenderModal from './GenderModal';
import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

export default function RedPillIntro() {
  const cfg = stageConfig[StageId.Intro];
  const ui = cfg.additionalUiConfig;
  const body = cfg.body;
  const t = useTranslations(StageId.Intro);
  const { completeStage } = useStoryFlow();
  const schedule = useScheduledTimeouts();

  const [answersVisible, setAnswersVisible] = useState(false);
  const [genderModalOpen, setGenderModalOpen] = useState(false);
  const [answerShellState, setAnswerShellState] = useState(() => ({
    ...ANSWER_IDLE_SHELL_STATE,
  }));

  const revealAnswers = useCallback(() => setAnswersVisible(true), []);

  const handleAnswerSelect = (answerId: string) => {
    if (answerId === AnswerId.CHOOSE_GENDER) {
      setGenderModalOpen(true);
      return;
    }

    completeStage(StageId.Intro, AnswerId.MALE);
  };

  const handleGenderSelect = (
    gender: typeof AnswerId.MALE | typeof AnswerId.FEMALE,
  ) => {
    setGenderModalOpen(false);
    setAnswerShellState({ isTransitioning: true, showContent: false });
    schedule(() => {
      completeStage(StageId.Intro, gender);
    }, ANSWER_CHOICE_COMMIT_AFTER_BULK_MS);
  };

  const resolveSelectBehavior = (answerId: string) =>
    answerId === AnswerId.CHOOSE_GENDER ? 'defer' : 'standard';

  const options = cfg.answerOptions
    ? mapLocalizedAnswerOptions(cfg.answerOptions, t)
    : [];

  return (
    <div key={StageId.Intro} className="min-h-screen w-full">
      <PageContainer
        backgroundImage={cfg.backgroundImage}
        backgroundImageOpacity={cfg.opacity ?? DEFAULT_STAGE_SHELL.opacity}
        backgroundWash={
          cfg.backgroundWash ?? DEFAULT_STAGE_SHELL.backgroundWash
        }
        maxWidth={ui?.maxWidth ?? DEFAULT_STORY_UI.maxWidth}
        showBackgroundEffects={
          cfg.showBackgroundEffects ?? DEFAULT_STAGE_SHELL.showBackgroundEffects
        }
      >
        <ContentContainer
          spacing={ui?.contentSpacing ?? DEFAULT_STORY_UI.contentSpacing}
        >
          <div
            className={`space-y-8 ${answerChoiceShellFadeOnlyClassName(
              answerShellState.isTransitioning,
              answerShellState.showContent,
            )}`}
          >
            <StageTextSurface
              stage={StageId.Intro}
              surface={cfg.textSurface}
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
            >
              <AnimatedText
                text={t.raw('text') as AnimatedTextBlock}
                speed={body?.speed ?? DEFAULT_STAGE_BODY.speed}
                delayAfterComplete={
                  body?.delayAfterComplete ??
                  DEFAULT_STAGE_BODY.delayAfterComplete
                }
                textSize={body?.textSize ?? DEFAULT_STAGE_BODY.textSize}
                alignment={body?.alignment ?? DEFAULT_STAGE_BODY.alignment}
                onComplete={revealAnswers}
              />
            </StageTextSurface>
            <div
              className={`transition-opacity duration-300 ${
                answersVisible
                  ? 'visible opacity-100'
                  : 'invisible opacity-0 pointer-events-none'
              }`}
            >
              <AnswerOptions
                options={options}
                onSelect={handleAnswerSelect}
                onAnswerChoiceShellChange={setAnswerShellState}
                resolveSelectBehavior={resolveSelectBehavior}
              />
            </div>
          </div>
        </ContentContainer>
      </PageContainer>
      <GenderModal open={genderModalOpen} onSelect={handleGenderSelect} />
    </div>
  );
}
