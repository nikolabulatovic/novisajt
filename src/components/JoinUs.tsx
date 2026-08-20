'use client';

import {
  STORY_STAGE_TEXT_SIZE_CLASS,
  STORY_STAGE_TEXT_TONE_CLASS,
} from '@/src/constants/storyStageTokens';
import { StageId } from '@/src/contexts/NavigationContext';
import { useGenderedTranslations } from '@/src/hooks/useGenderedTranslations';
import { DEFAULT_STAGE_BODY, stageConfig } from '@/src/lib/story/stageUiConfig';

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
  const intro = raw('intro') as string[];
  const cfg = stageConfig[StageId.JoinUs];
  const { backgroundImage, opacity = 0.8, backgroundWash } = cfg;
  const ui = cfg.additionalUiConfig;
  const textToneClass =
    STORY_STAGE_TEXT_TONE_CLASS[
      cfg.body?.textTone ?? DEFAULT_STAGE_BODY.textTone
    ] || 'text-gray-200';
  const textSizeClass =
    STORY_STAGE_TEXT_SIZE_CLASS[
      cfg.body?.textSize ?? DEFAULT_STAGE_BODY.textSize
    ];
  const bodyTextClass = `${textSizeClass} leading-relaxed ${textToneClass}`;

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
          <div className="space-y-6 text-center">
            {intro.map((paragraph) => (
              <p key={paragraph} className={bodyTextClass}>
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className={`mt-10 text-center ${bodyTextClass}`}>
            {t('groupsHeading')}
          </h2>
        </StageTextSurface>

        <div className="grid grid-cols-3 gap-3 sm:gap-6">
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
