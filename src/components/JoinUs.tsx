'use client';

import { useState } from 'react';

import { STORY_STAGE_TEXT_TONE_CLASS } from '@/src/constants/storyStageTokens';
import { StageId } from '@/src/contexts/NavigationContext';
import { useGenderedTranslations } from '@/src/hooks/useGenderedTranslations';
import { useResolvedBackgroundImage } from '@/src/hooks/useResolvedBackgroundImage';
import { DEFAULT_STAGE_BODY, stageConfig } from '@/src/lib/story/stageUiConfig';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import {
  DiscordBadge,
  TelegramBadge,
  WhatsAppBadge,
} from './ui/SocialBrandBadges';
import StageTextSurface from './ui/StageTextSurface';

const groupButtonClassName =
  'cursor-pointer group text-center transition-transform duration-300';

export default function JoinUs() {
  const { t, raw } = useGenderedTranslations(StageId.JoinUs);
  const [showGroups, setShowGroups] = useState(false);
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

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      backgroundWash={backgroundWash}
      maxWidth={ui?.maxWidth ?? '3xl'}
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
          <button type="button" className={groupButtonClassName}>
            <WhatsAppBadge />
            <p
              className={`mt-1 text-base md:text-lg lg:text-xl font-medium tracking-wide ${textToneClass}`}
            >
              WhatsApp
            </p>
          </button>

          <button type="button" className={groupButtonClassName}>
            <DiscordBadge />
            <p
              className={`mt-1 text-base md:text-lg lg:text-xl font-medium tracking-wide ${textToneClass}`}
            >
              Discord
            </p>
          </button>

          <button type="button" className={groupButtonClassName}>
            <TelegramBadge />
            <p
              className={`mt-1 text-base md:text-lg lg:text-xl font-medium tracking-wide ${textToneClass}`}
            >
              Telegram
            </p>
          </button>
        </div>
      </ContentContainer>
    </PageContainer>
  );
}
