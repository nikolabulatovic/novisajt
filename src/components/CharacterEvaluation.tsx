'use client';

import { MouseEvent, useState } from 'react';

import { useTranslations } from 'next-intl';

import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import { useAnswerChoiceRipples } from '@/src/hooks/useAnswerChoiceRipples';
import { useScheduledTimeouts } from '@/src/hooks/useScheduledTimeouts';
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
  text: string;
  value: number;
}

interface EvaluationQuestion {
  id: number;
  question: string;
  options: EvaluationOption[];
}

export default function CharacterEvaluation() {
  const { completeStage, answers: existingAnswers = {} } = useStoryFlow();
  const schedule = useScheduledTimeouts();
  const { ripples, createRipple, clearRipples } =
    useAnswerChoiceRipples<number>(schedule);

  const t = useTranslations('character-evaluation');
  const questions = t.raw('questions') as EvaluationQuestion[];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] =
    useState<Record<string, string>>(existingAnswers);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [nonSelectedFading, setNonSelectedFading] = useState(false);

  const handleAnswer = (
    value: number,
    event: MouseEvent<HTMLButtonElement>,
    optionIndex: number,
  ) => {
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
          setTimeout(() => {
            setShowContent(true);
          }, 50);
        } else {
          setTimeout(() => {
            completeStage(StageId.Evaluation, newAnswers);
          }, 1500);
        }
      },
    );
  };

  const { backgroundImage, opacity = 0.8 } = stageConfig[StageId.Evaluation];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative bg-black overflow-hidden">
      {/* Background image */}
      {backgroundImage && (
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              opacity: opacity,
            }}
          />
        </div>
      )}

      {/* Enhanced atmospheric background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-gray-400/10 rounded-full blur-3xl animate-pulse animate-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-gray-400/10 rounded-full blur-3xl animate-pulse animate-glow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-[600px] md:h-[600px] bg-gray-500/5 rounded-full blur-3xl animate-float" />
      </div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Enhanced progress indicator with glow */}
        <div className="mb-8 md:mb-16">
          <ProgressDots current={currentQuestion} total={questions.length} />
        </div>

        {/* Question (glass) and options outside */}
        <div
          className={`text-center space-y-12 ${answerChoiceShellClassName(
            isTransitioning,
            showContent,
          )}`}
        >
          <StageTextSurface
            stage={StageId.Evaluation}
            contentClassName="p-6 md:p-10"
          >
            {/* Question with subtle glow effect */}
            <div className="relative">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto relative z-10 drop-shadow-lg">
                {questions[currentQuestion].question}
              </h1>
              {/* Subtle glow behind question */}
              <div className="absolute inset-0 blur-2xl opacity-20 bg-gray-400/30 -z-0" />
            </div>
          </StageTextSurface>

          {/* Options with staggered animations */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedOptionIndex === index;
              const shouldFade = nonSelectedFading && !isSelected;
              const shouldFadeOut = isTransitioning && isSelected;
              const isHighlighted =
                isSelected || (hoveredOption === index && !nonSelectedFading);

              return (
                <AnswerOption
                  key={index}
                  text={option.text}
                  onClick={(e) => handleAnswer(option.value, e, index)}
                  onMouseEnter={() =>
                    !nonSelectedFading && setHoveredOption(index)
                  }
                  onMouseLeave={() => setHoveredOption(null)}
                  isSelected={isHighlighted}
                  isDisabled={nonSelectedFading || isTransitioning}
                  index={index}
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
  );
}
