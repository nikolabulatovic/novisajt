'use client';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { useResolvedBackgroundImage } from '@/src/hooks/useGenderedTranslations';
import { mapLocalizedAnswerOptions } from '@/src/lib/mapLocalizedAnswerOptions';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

import AnswerOptions from './ui/AnswerOptions';
import ContentContainer from './ui/ContentContainer';
import PageContainer from './ui/PageContainer';
import ResourceAccordion, {
  type ResourceAccordionItem,
} from './ui/ResourceAccordion';
import StageTextSurface from './ui/StageTextSurface';

export default function AdditionalResources() {
  const t = useTranslations(StageId.AdditionalResources);
  const { completeStage } = useStoryFlow();
  const stageCfg = stageConfig[StageId.AdditionalResources];
  const { backgroundImage: backgroundImageConfig, opacity = 0.8 } = stageCfg;
  const backgroundImage = useResolvedBackgroundImage(backgroundImageConfig);
  const items = t.raw('items') as ResourceAccordionItem[];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      maxWidth="4xl"
    >
      <ContentContainer spacing="md">
        <StageTextSurface
          stage={StageId.AdditionalResources}
          contentClassName="px-5 py-4 md:px-8 md:py-6"
        >
          <p className="text-center text-xl font-medium leading-relaxed text-gray-200 md:text-2xl">
            {t('intro')}
          </p>
        </StageTextSurface>

        <ResourceAccordion items={items} linkLabel={t('linkLabel')} />

        <AnswerOptions
          options={mapLocalizedAnswerOptions(stageCfg.answerOptions!, t)}
          onSelect={(answerId) =>
            completeStage(StageId.AdditionalResources, answerId)
          }
        />
      </ContentContainer>
    </PageContainer>
  );
}
