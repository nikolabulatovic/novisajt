'use client';

import { useRef, useState } from 'react';

import { StageId } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import NextButton from './ui/NextButton';
import PageContainer from './ui/PageContainer';
import StageTextSurface from './ui/StageTextSurface';

export default function SpasaStory() {
  const { completeStage } = useStoryFlow();
  const [showButton, setShowButton] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [finalMessageVisible, setFinalMessageVisible] = useState(false);
  const pillOriginRef = useRef<PillOrigin | null>(null);

  const text = [
    'Upoznaćemo te sa Spasinom pričom.',
    'Spasa je dobila ime po tome što je spašena. Njena sudbina pre nego što su je ljudi udomili bila je gotovo sigurna smrt. Ljudi su odlučili da joj pruže šansu za život — život koji bi inače izgubila.',
    'Svaki čin spašavanja nosi težinu. Izbor da poštuješ i saosećaš sa bićem koje oseća, razume i želi da živi, pokazuje koliko možemo biti odgovorni i dobri. Čak i kada niko nije dužan da reaguje.',
  ];

  const handleContinue = (origin?: PillOrigin) => {
    if (!showFinalMessage) {
      if (origin) {
        pillOriginRef.current = origin;
      }
      setShowFinalMessage(true);
      setShowButton(false);
      setTimeout(() => {
        setFinalMessageVisible(true);
        setTimeout(() => {
          completeStage(
            StageId.SpasaStory,
            undefined,
            pillOriginRef.current ?? undefined,
          );
        }, 3000);
      }, 500);
    }
  };

  const {
    backgroundImage,
    opacity = 0.8,
    additionalUiConfig,
  } = stageConfig[StageId.SpasaStory];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
    >
      {!showFinalMessage ? (
        <ContentContainer spacing="lg">
          <StageTextSurface
            stage={StageId.SpasaStory}
            contentClassName="relative p-6 md:p-16"
            backdropType={additionalUiConfig?.backdropType}
            backdropOpacity={additionalUiConfig?.backdropOpacity}
            backdropFade={additionalUiConfig?.backdropFade}
            backdropColor={additionalUiConfig?.backdropColor}
          >
            <AnimatedText
              text={text}
              speed={120}
              delayAfterComplete={1000}
              textSize="md"
              alignment="center"
              onComplete={() => setShowButton(true)}
            />
          </StageTextSurface>

          <NextButton
            onClick={handleContinue}
            label="Nastavi"
            show={showButton}
          />
        </ContentContainer>
      ) : (
        <div
          className={`text-center transition-opacity duration-1000 relative ${
            finalMessageVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <StageTextSurface
            stage={StageId.SpasaStory}
            contentClassName="relative px-6 py-10 md:px-10 md:py-14"
            backdropType={additionalUiConfig?.backdropType}
            backdropOpacity={additionalUiConfig?.backdropOpacity}
            backdropFade={additionalUiConfig?.backdropFade}
            backdropColor={additionalUiConfig?.backdropColor}
          >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed relative z-10">
              Ali postoji nešto što jesmo dužni: da sve životinje ostavimo na
              miru.
            </p>
          </StageTextSurface>
        </div>
      )}
    </PageContainer>
  );
}
