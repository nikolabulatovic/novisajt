'use client';

import { ReactNode, useState } from 'react';

import { useTranslations } from 'next-intl';

import type { Stage } from '@/src/contexts/NavigationContext';
import { useTracking } from '@/src/hooks/useTracking';
import type { NarrativeTwoBeatConfig } from '@/src/lib/story/stageUiConfig';

import AnimatedText from './AnimatedText';
import AnswerOptions from './AnswerOptions';
import StoryStageChrome from './StoryStageChrome';

const BEAT_FADE_MS = 300;

interface StoryStageNarrativeTwoBeatProps {
  stage: Stage;
  narrativeTwoBeat: NarrativeTwoBeatConfig;
  footer?: ReactNode;
}

export default function StoryStageNarrativeTwoBeat({
  stage,
  narrativeTwoBeat,
  footer,
}: StoryStageNarrativeTwoBeatProps) {
  const t = useTranslations(narrativeTwoBeat.translationNamespace);
  const { trackNarrativeAdvanceClicked } = useTracking();

  const beat1Text = t.raw(narrativeTwoBeat.beat1TextKey) as string[];
  const beat2Text = t.raw(narrativeTwoBeat.beat2TextKey) as string[];

  const [phase, setPhase] = useState<1 | 2>(1);
  const [beat1Exiting, setBeat1Exiting] = useState(false);
  const [showAdvanceButton, setShowAdvanceButton] = useState(false);
  const [showFinalFooter, setShowFinalFooter] = useState(false);
  const [advanceLocked, setAdvanceLocked] = useState(false);

  const handleAdvanceClick = () => {
    if (advanceLocked) return;
    setAdvanceLocked(true);
    trackNarrativeAdvanceClicked(stage);
    setBeat1Exiting(true);
    setTimeout(() => {
      setPhase(2);
      setBeat1Exiting(false);
      setShowAdvanceButton(false);
    }, BEAT_FADE_MS);
  };

  return (
    <StoryStageChrome
      stage={stage}
      textSurfaceContent={
        <>
          {phase === 1 && (
            <div
              className={`transition-opacity duration-300 ease-out ${
                beat1Exiting ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <AnimatedText
                text={beat1Text}
                speed={120}
                delayAfterComplete={800}
                textSize="md"
                alignment="center"
                onComplete={() => setShowAdvanceButton(true)}
              />
            </div>
          )}
          {phase === 2 && (
            <AnimatedText
              text={beat2Text}
              speed={120}
              delayAfterComplete={800}
              textSize="md"
              alignment="center"
              onComplete={() => setShowFinalFooter(true)}
            />
          )}
        </>
      }
      belowSurface={
        <>
          {phase === 1 && showAdvanceButton && (
            <AnswerOptions
              options={[
                {
                  id: 'narrative-advance',
                  label: t(narrativeTwoBeat.advanceLabelKey),
                },
              ]}
              onSelect={handleAdvanceClick}
              selectedId={advanceLocked ? 'narrative-advance' : null}
              disableUnselectedWhenSelected
            />
          )}
          {showFinalFooter ? footer : null}
        </>
      }
    />
  );
}
