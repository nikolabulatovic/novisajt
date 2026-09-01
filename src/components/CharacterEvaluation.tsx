'use client';

import { MouseEvent, useRef, useState } from 'react';

import { useGpuEffects } from '@/src/contexts/GpuEffectsContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { useAnswerChoiceRipples } from '@/src/hooks/useAnswerChoiceRipples';
import { useGenderedTranslations } from '@/src/hooks/useGenderedTranslations';
import { useResolvedBackgroundImage } from '@/src/hooks/useResolvedBackgroundImage';
import { useScheduledTimeouts } from '@/src/hooks/useScheduledTimeouts';
import type { GenderedContent } from '@/src/lib/gender';
import { resolveGenderedContent } from '@/src/lib/gender';
import { stageConfig } from '@/src/lib/story/stageUiConfig';
import {
  answerChoiceShellClassName,
  scheduleAnswerChoiceExit,
} from '@/src/lib/ui/answerChoiceInteraction';

import { StageId } from '../contexts/NavigationContext';
import AnswerChoiceRippleSpans from './ui/AnswerChoiceRippleSpans';
import AnswerOption from './ui/AnswerOption';
import ProgressDots from './ui/ProgressDots';
import StageTextSurface from './ui/StageTextSurface';

interface EvaluationOption {
  text: GenderedContent<string>;
  value: number;
}

interface EvaluationQuestion {
  id: number;
  question: string;
  options: EvaluationOption[];
}

export default function CharacterEvaluation() {
  const { completeStage, answers: existingAnswers = {} } = useStoryFlow();
  const { allowsHeavyEffects } = useGpuEffects();
  const schedule = useScheduledTimeouts();
  const { ripples, createRipple, clearRipples } =
    useAnswerChoiceRipples<number>(schedule);

  const { raw, gender } = useGenderedTranslations('character-evaluation');
  const questions = raw('questions') as EvaluationQuestion[];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] =
    useState<Record<string, string>>(existingAnswers);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [nonSelectedFading, setNonSelectedFading] = useState(false);
  const answeringRef = useRef(false);

  const handleAnswer = (
    value: number,
    event: MouseEvent<HTMLButtonElement>,
    optionIndex: number,
  ) => {
    if (answeringRef.current) return;
    answeringRef.current = true;

    createRipple(event, optionIndex);
    setSelectedOptionIndex(optionIndex);

    const questionId = `q${questions[currentQuestion].id}`;
    const newAnswers = { ...answers, [questionId]: value.toString() };
    setAnswers(newAnswers);

    setNonSelectedFading(true);

    scheduleAnswerChoiceExit(
      schedule,
      () => {
        setIsTransitioning(true);
        setShowContent(false);
      },
      () => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setIsTransitioning(false);
          setNonSelectedFading(false);
          setSelectedOptionIndex(null);
          clearRipples();
          answeringRef.current = false;
          schedule(() => {
            setShowContent(true);
          }, 50);
        } else {
          schedule(() => {
            completeStage(StageId.Evaluation, newAnswers);
          }, 1500);
        }
      },
    );
  };

  const { backgroundImage: backgroundImageConfig, opacity = 0.8 } =
    stageConfig[StageId.Evaluation];
  const backgroundImage = useResolvedBackgroundImage(backgroundImageConfig);

  return (
    <div className="h-full min-h-0 relative bg-black overflow-y-auto overscroll-y-contain">
      {backgroundImage && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              opacity: opacity,
            }}
          />
        </div>
      )}

      {allowsHeavyEffects && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-gray-400/10 rounded-full blur-3xl animate-pulse animate-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-gray-400/10 rounded-full blur-3xl animate-pulse animate-glow delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[600px] md:h-[600px] bg-gray-500/5 rounded-full blur-3xl animate-float" />
        </div>
      )}

      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />

      <div className="relative z-10 flex min-h-full w-full items-center justify-center p-4 md:p-8">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-8 md:mb-16">
            <ProgressDots current={currentQuestion} total={questions.length} />
          </div>

          <div
            className={`text-center space-y-12 ${answerChoiceShellClassName(
              isTransitioning,
              showContent,
            )}`}
          >
            <StageTextSurface
              stage={StageId.Evaluation}
              surface={allowsHeavyEffects ? undefined : 'backdrop'}
              contentClassName={
                allowsHeavyEffects ? 'p-6 md:p-10' : 'relative p-6 md:p-10'
              }
            >
              <div className="relative">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto relative z-10 drop-shadow-lg">
                  {questions[currentQuestion].question}
                </h1>
                {allowsHeavyEffects && (
                  <div className="absolute inset-0 blur-2xl opacity-20 bg-gray-400/30 -z-0" />
                )}
              </div>
            </StageTextSurface>

            <div className="space-y-6 max-w-3xl mx-auto">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedOptionIndex === index;
                const shouldFade = nonSelectedFading && !isSelected;
                const shouldFadeOut = isTransitioning && isSelected;

                return (
                  <AnswerOption
                    key={index}
                    text={resolveGenderedContent(option.text, gender)}
                    onClick={(e) => handleAnswer(option.value, e, index)}
                    isSelected={isSelected}
                    isDisabled={nonSelectedFading || isTransitioning}
                    index={index}
                    entranceAnimation
                    shouldFade={shouldFade}
                    shouldFadeOut={shouldFadeOut}
                  >
                    <AnswerChoiceRippleSpans
                      ripples={ripples[String(index)] ?? []}
                    />
                  </AnswerOption>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
