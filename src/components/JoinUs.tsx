'use client';

import { useEffect, useState } from 'react';

import { useLocale } from 'next-intl';

import { STORY_STAGE_TEXT_TONE_CLASS } from '@/src/constants/storyStageTokens';
import { StageId } from '@/src/contexts/NavigationContext';
import { useGenderedTranslations } from '@/src/hooks/useGenderedTranslations';
import { useResolvedBackgroundImage } from '@/src/hooks/useResolvedBackgroundImage';
import { useTracking } from '@/src/hooks/useTracking';
import {
  DEFAULT_STAGE_BODY,
  DEFAULT_STAGE_SHELL,
  stageConfig,
} from '@/src/lib/story/stageUiConfig';
import type { CommunityType } from '@/src/lib/tracking';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import FeedbackFormLink from './ui/FeedbackFormLink';
import PageContainer from './ui/PageContainer';
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

export default function JoinUs() {
  const locale = useLocale();
  const { t, raw } = useGenderedTranslations(StageId.JoinUs);
  const { trackCommunityCtaClicked } = useTracking();
  const [showGroups, setShowGroups] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const intro = raw('intro') as string[];
  const text = [...intro, t('groupsHeading')];
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
    if (!showGroups) {
      setShowFeedback(false);
      return;
    }
    const id = window.setTimeout(() => {
      setShowFeedback(true);
    }, FEEDBACK_REVEAL_AFTER_GROUPS_MS);
    return () => window.clearTimeout(id);
  }, [showGroups]);

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      backgroundWash={backgroundWash}
      maxWidth={ui?.maxWidth ?? '3xl'}
      scrollMode={cfg.scrollMode ?? DEFAULT_STAGE_SHELL.scrollMode}
    >
      <ContentContainer spacing="lg">
        <StageTextSurface
          stage={StageId.JoinUs}
          contentClassName="relative"
          backdropType={ui?.backdropType}
          backdropOpacity={ui?.backdropOpacity}
          backdropFade={ui?.backdropFade}
          backdropColor={ui?.backdropColor}
        >
          <AnimatedText
            text={text}
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
            onComplete={() => setShowGroups(true)}
          />
        </StageTextSurface>

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
      </ContentContainer>
      <FeedbackFormLink
        stage={StageId.JoinUs}
        visible={showFeedback}
        className="mt-6"
      />
    </PageContainer>
  );
}
