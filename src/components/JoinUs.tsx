'use client';

import { useEffect, useRef, useState } from 'react';

import { useLocale } from 'next-intl';

import { STORY_STAGE_TEXT_TONE_CLASS } from '@/src/constants/storyStageTokens';
import { StageId } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { useGenderedTranslations } from '@/src/hooks/useGenderedTranslations';
import { useResolvedBackgroundImage } from '@/src/hooks/useResolvedBackgroundImage';
import { useScheduledTimeouts } from '@/src/hooks/useScheduledTimeouts';
import { useTracking } from '@/src/hooks/useTracking';
import { AnswerId } from '@/src/lib/answerIds';
import type { GenderedContent } from '@/src/lib/gender';
import { resolveGenderedContent } from '@/src/lib/gender';
import {
  DEFAULT_STAGE_BODY,
  DEFAULT_STAGE_SHELL,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';
import type { CommunityType } from '@/src/lib/tracking';
import {
  ANSWER_IDLE_SHELL_STATE,
  answerChoiceShellFadeOnlyClassName,
} from '@/src/lib/ui/answerChoiceInteraction';

import AnimatedText from './ui/AnimatedText';
import AnswerOptions from './ui/AnswerOptions';
import ContentContainer from './ui/ContentContainer';
import FeedbackFormLink from './ui/FeedbackFormLink';
import PageContainer from './ui/PageContainer';
import ProgressDots from './ui/ProgressDots';
import {
  DiscordBadge,
  TelegramBadge,
  WhatsAppBadge,
} from './ui/SocialBrandBadges';
import StageTextSurface from './ui/StageTextSurface';

const groupButtonClassName =
  'cursor-pointer group text-center transition-transform duration-300';

/** Delay after groups appear before the feedback link fades in. */
const FEEDBACK_REVEAL_AFTER_GROUPS_MS = 900;

/** Fade between Želim/Ne and the action icons (text stays). */
const INTERACTION_FADE_MS = 700;

/** Delay after icons start fading in before Dalje appears. */
const CONTINUE_REVEAL_AFTER_ACTIONS_MS = 800;

/** Delay after community groups appear before the exit Dalje appears. */
const EXIT_CONTINUE_REVEAL_AFTER_GROUPS_MS = 800;

const SAZNAJ_HOME_URL = 'https://saznaj.rs';

const JOIN_GROUP_LINKS = {
  sr: {
    whatsapp: 'https://chat.whatsapp.com/BaCslglrbcQDYTXViNHK7U',
    discord: 'https://discord.gg/PZHy3bBKd3',
    telegram: 'https://t.me/+5iq0YpIQuA03YTM8',
  },
  en: {
    whatsapp: 'https://chat.whatsapp.com/Lfm8M8VOI0k7luS4ngadtr',
    discord: 'https://discord.gg/378mPqEV7',
    telegram: 'https://t.me/+-Kv3m896zp42ZDBk',
  },
} as const satisfies Record<'sr' | 'en', Record<CommunityType, string>>;

type JoinUsActionStep = {
  id: 'follow' | 'share';
  text: GenderedContent<string[]>;
  options: { yes: string; no: string };
  actions: Record<string, string>;
};

type JoinUsCommunityStep = {
  id: 'community';
  intro: GenderedContent<string[]>;
  groupsHeading: string;
};

type JoinUsStep = JoinUsActionStep | JoinUsCommunityStep;

function isCommunityStep(step: JoinUsStep): step is JoinUsCommunityStep {
  return step.id === 'community';
}

function ActionPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-gray-600/50 bg-gray-800/70 text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500"
        aria-hidden
      >
        icon
      </div>
      <span className="text-sm sm:text-base font-medium tracking-wide text-gray-200">
        {label}
      </span>
    </div>
  );
}

export default function JoinUs() {
  const locale = useLocale();
  const { t, raw, gender } = useGenderedTranslations(StageId.JoinUs);
  const { trackAnswerSelected, trackCommunityCtaClicked } = useTracking();
  const { trackAnswerSelected: trackFlowAnswer } = useStoryFlow();
  const schedule = useScheduledTimeouts();
  const answeringRef = useRef(false);

  const steps = raw('steps') as JoinUsStep[];
  const [currentStep, setCurrentStep] = useState(0);
  const [showGroups, setShowGroups] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [answersReady, setAnswersReady] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [actionsVisible, setActionsVisible] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [showExitContinue, setShowExitContinue] = useState(false);
  const [shellState, setShellState] = useState(() => ({
    ...ANSWER_IDLE_SHELL_STATE,
  }));

  const step = steps[currentStep];
  const cfg = stageConfig[StageId.JoinUs];
  const {
    backgroundImage: backgroundImageConfig,
    opacity = 0.8,
    backgroundWash,
  } = cfg;
  const backgroundImage = useResolvedBackgroundImage(backgroundImageConfig);
  const ui = cfg.additionalUiConfig;
  const textToneClass =
    STORY_STAGE_TEXT_TONE_CLASS[
      cfg.body?.textTone ?? DEFAULT_STAGE_BODY.textTone
    ] || 'text-gray-200';
  const joinLinks =
    locale in JOIN_GROUP_LINKS
      ? JOIN_GROUP_LINKS[locale as keyof typeof JOIN_GROUP_LINKS]
      : JOIN_GROUP_LINKS.sr;

  useEffect(() => {
    setShowAnswers(false);
    setAnswersReady(false);
    setShowActions(false);
    setActionsVisible(false);
    setShowContinue(false);
    setShowExitContinue(false);
    setShowGroups(false);
    setShowFeedback(false);
  }, [currentStep]);

  useEffect(() => {
    if (!showGroups) {
      setShowFeedback(false);
      setShowExitContinue(false);
      return;
    }
    const feedbackId = window.setTimeout(() => {
      setShowFeedback(true);
    }, FEEDBACK_REVEAL_AFTER_GROUPS_MS);
    const exitContinueId = window.setTimeout(() => {
      setShowExitContinue(true);
    }, EXIT_CONTINUE_REVEAL_AFTER_GROUPS_MS);
    return () => {
      window.clearTimeout(feedbackId);
      window.clearTimeout(exitContinueId);
    };
  }, [showGroups]);

  useEffect(() => {
    if (!showActions) {
      setActionsVisible(false);
      setShowContinue(false);
      return;
    }
    const fadeInId = window.setTimeout(() => {
      setActionsVisible(true);
    }, 50);
    const continueId = window.setTimeout(() => {
      setShowContinue(true);
    }, 50 + CONTINUE_REVEAL_AFTER_ACTIONS_MS);
    return () => {
      window.clearTimeout(fadeInId);
      window.clearTimeout(continueId);
    };
  }, [showActions]);

  const goToNextStep = (answerKey: string) => {
    if (answeringRef.current) return;
    answeringRef.current = true;

    const stepId = step.id;
    trackAnswerSelected(StageId.JoinUs, `${stepId}:${answerKey}`);
    trackFlowAnswer(StageId.JoinUs, `${stepId}:${answerKey}`);

    // AnswerOptions already faded the shell.
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setShellState({ isTransitioning: false, showContent: false });
      schedule(() => {
        setShellState({ ...ANSWER_IDLE_SHELL_STATE });
        answeringRef.current = false;
      }, 50);
      return;
    }

    answeringRef.current = false;
  };

  const goToSaznajHome = (answerKey: string) => {
    if (answeringRef.current) return;
    answeringRef.current = true;

    trackAnswerSelected(StageId.JoinUs, `community:${answerKey}`);
    trackFlowAnswer(StageId.JoinUs, `community:${answerKey}`);
    window.location.assign(SAZNAJ_HOME_URL);
  };

  const handleActionAnswer = (answerId: string) => {
    if (answerId === AnswerId.NO) {
      goToNextStep(answerId);
      return;
    }

    // Želim — text stays; answers fade out, then icons fade in, then Dalje.
    trackAnswerSelected(StageId.JoinUs, `${step.id}:${answerId}`);
    trackFlowAnswer(StageId.JoinUs, `${step.id}:${answerId}`);
    setShowAnswers(false);
    schedule(() => {
      setShowActions(true);
    }, INTERACTION_FADE_MS);
  };

  const communityText = isCommunityStep(step)
    ? [...resolveGenderedContent(step.intro, gender), step.groupsHeading]
    : [];

  const actionText = !isCommunityStep(step)
    ? resolveGenderedContent(step.text, gender)
    : [];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      backgroundWash={backgroundWash}
      maxWidth={ui?.maxWidth ?? '3xl'}
      scrollMode={cfg.scrollMode ?? DEFAULT_STAGE_SHELL.scrollMode}
    >
      <div className="pointer-events-none fixed inset-x-0 top-5 md:top-8 z-20 flex justify-center px-4 md:px-8">
        <div className="pointer-events-auto w-full max-w-3xl">
          <StageTextSurface
            surface="backdrop"
            backdropOpacity={0.4}
            backdropFade={0.35}
            contentClassName="relative py-2"
          >
            <ProgressDots
              current={currentStep}
              total={steps.length}
              variant="emphasized"
            />
          </StageTextSurface>
        </div>
      </div>

      <ContentContainer spacing="lg" className="pt-14 md:pt-16">
        <div
          className={`space-y-8 md:space-y-10 ${answerChoiceShellFadeOnlyClassName(
            shellState.isTransitioning,
            shellState.showContent,
          )}`}
        >
          <StageTextSurface
            stage={StageId.JoinUs}
            contentClassName="relative"
            backdropType={ui?.backdropType}
            backdropOpacity={ui?.backdropOpacity}
            backdropFade={ui?.backdropFade}
            backdropColor={ui?.backdropColor}
          >
            <AnimatedText
              key={step.id}
              text={isCommunityStep(step) ? communityText : actionText}
              speed={cfg.body?.speed ?? DEFAULT_STAGE_BODY.speed}
              delayAfterComplete={
                cfg.body?.delayAfterComplete ??
                DEFAULT_STAGE_BODY.delayAfterComplete
              }
              textSize={cfg.body?.textSize ?? DEFAULT_STAGE_BODY.textSize}
              alignment={cfg.body?.alignment ?? DEFAULT_STAGE_BODY.alignment}
              wordTransitionDuration={
                cfg.body?.wordTransitionDuration ??
                DEFAULT_STAGE_BODY.wordTransitionDuration
              }
              className={textToneClass}
              onComplete={() => {
                if (isCommunityStep(step)) {
                  setShowGroups(true);
                } else {
                  setAnswersReady(true);
                  setShowAnswers(true);
                }
              }}
            />
          </StageTextSurface>

          {!isCommunityStep(step) ? (
            <div className="relative">
              {/* Always reserve icons + Dalje height so the copy does not jump. */}
              <div
                className={`space-y-8 md:space-y-10 transition-opacity ease-out ${
                  showActions && actionsVisible
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                }`}
                style={{ transitionDuration: `${INTERACTION_FADE_MS}ms` }}
                aria-hidden={!showActions}
              >
                <div className="grid grid-cols-3 gap-3 sm:gap-5 px-2">
                  {Object.entries(step.actions).map(([actionId, label]) => (
                    <button
                      key={actionId}
                      type="button"
                      tabIndex={showActions ? 0 : -1}
                      className={`${groupButtonClassName} hover:scale-[1.03]`}
                      onClick={() => {
                        // Placeholder until real links/icons are wired.
                      }}
                    >
                      <ActionPlaceholder label={label} />
                    </button>
                  ))}
                </div>

                <div
                  className={`transition-opacity ease-out ${
                    showContinue
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                  style={{ transitionDuration: `${INTERACTION_FADE_MS}ms` }}
                >
                  <AnswerOptions
                    key={`${step.id}-continue`}
                    options={[{ id: 'CONTINUE', label: t('next') }]}
                    onSelect={goToNextStep}
                    onAnswerChoiceShellChange={setShellState}
                  />
                </div>
              </div>

              {answersReady && !showActions ? (
                <div
                  className={`absolute inset-0 flex items-start justify-center transition-opacity ease-out ${
                    showAnswers
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                  style={{ transitionDuration: `${INTERACTION_FADE_MS}ms` }}
                >
                  <AnswerOptions
                    key={step.id}
                    options={[
                      { id: AnswerId.YES, label: step.options.yes },
                      { id: AnswerId.NO, label: step.options.no },
                    ]}
                    onSelect={handleActionAnswer}
                    onAnswerChoiceShellChange={setShellState}
                    resolveSelectBehavior={(id) =>
                      id === AnswerId.YES ? 'defer' : 'standard'
                    }
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-8 md:space-y-10">
              <div
                className={`grid grid-cols-3 gap-3 sm:gap-6 transition-opacity duration-1500 ease-out ${
                  showGroups ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <a
                  href={joinLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={groupButtonClassName}
                  onClick={() => trackCommunityCtaClicked('whatsapp')}
                >
                  <WhatsAppBadge />
                  <p
                    className={`mt-1 text-base md:text-lg lg:text-xl font-medium tracking-wide ${textToneClass}`}
                  >
                    WhatsApp
                  </p>
                </a>

                <a
                  href={joinLinks.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={groupButtonClassName}
                  onClick={() => trackCommunityCtaClicked('discord')}
                >
                  <DiscordBadge />
                  <p
                    className={`mt-1 text-base md:text-lg lg:text-xl font-medium tracking-wide ${textToneClass}`}
                  >
                    Discord
                  </p>
                </a>

                <a
                  href={joinLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={groupButtonClassName}
                  onClick={() => trackCommunityCtaClicked('telegram')}
                >
                  <TelegramBadge />
                  <p
                    className={`mt-1 text-base md:text-lg lg:text-xl font-medium tracking-wide ${textToneClass}`}
                  >
                    Telegram
                  </p>
                </a>
              </div>

              <div
                className={`transition-opacity ease-out ${
                  showExitContinue
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'
                }`}
                style={{ transitionDuration: `${INTERACTION_FADE_MS}ms` }}
              >
                <AnswerOptions
                  key={`${step.id}-exit`}
                  options={[{ id: 'CONTINUE', label: t('next') }]}
                  onSelect={goToSaznajHome}
                  onAnswerChoiceShellChange={setShellState}
                />
              </div>
            </div>
          )}
        </div>
      </ContentContainer>
      <FeedbackFormLink
        stage={StageId.JoinUs}
        visible={showFeedback}
        className="mt-6"
      />
    </PageContainer>
  );
}
