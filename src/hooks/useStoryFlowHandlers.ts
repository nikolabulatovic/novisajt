import { type Dispatch, type SetStateAction, useMemo } from 'react';

import {
  type Stage,
  StageId,
  type StepId,
} from '@/src/contexts/NavigationContext';
import type { StoryTransitionStyle } from '@/src/contexts/StoryFlowContext';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import { characterEvaluationAnswersMeetBar } from '@/src/lib/story/characterEvaluationBar';
import { stageConfig } from '@/src/lib/story/stageUiConfig';
import {
  answerStageTransitions,
  answerStepTransitions,
  directStageTransitions,
} from '@/src/lib/story/transitions';

export interface StoryFlowHandlerDeps {
  transitionToStage: (
    stage: Stage,
    style?: StoryTransitionStyle,
    pillOrigin?: PillOrigin,
  ) => void;
  navigateToStage: (stage: Stage, stepId?: StepId | null) => void;
  currentStepId: StepId | null;
  setAnswers: Dispatch<SetStateAction<Record<string, string>>>;
  trackAnswerSelected: (stage: Stage, answer: string) => void;
}

type StageCompletionAnswer = string | Record<string, string>;

export function useStoryFlowHandlers({
  transitionToStage,
  navigateToStage,
  currentStepId,
  setAnswers,
  trackAnswerSelected,
}: StoryFlowHandlerDeps) {
  return useMemo(
    () => ({
      completeStage: (
        completedStage: Stage,
        answer?: StageCompletionAnswer,
        pillOrigin?: PillOrigin,
      ) => {
        if (completedStage === StageId.Evaluation) {
          if (answer && typeof answer !== 'string') {
            setAnswers((prev) => ({ ...prev, ...answer }));
            Object.entries(answer).forEach(([question, value]) => {
              trackAnswerSelected(StageId.Evaluation, `${question}:${value}`);
            });
            if (characterEvaluationAnswersMeetBar(answer)) {
              transitionToStage(StageId.Explanation);
            } else {
              transitionToStage(StageId.CharacterIncompatible);
            }
          }
          return;
        }

        if (typeof answer === 'string') {
          const nextForStep = answerStepTransitions[completedStage];
          if (nextForStep) {
            const stepId =
              currentStepId ?? stageConfig[completedStage].steps?.[0]?.id;
            if (!stepId) {
              return;
            }

            setAnswers((prev) => ({
              ...prev,
              [`${completedStage}:${stepId}`]: answer,
            }));
            trackAnswerSelected(completedStage, `${stepId}:${answer}`);

            const destination = nextForStep(stepId, answer);
            if (destination.type === 'step') {
              navigateToStage(completedStage, destination.stepId);
              return;
            }
            transitionToStage(destination.stage, 'auto', pillOrigin);
            return;
          }

          setAnswers((prev) => ({ ...prev, [completedStage]: answer }));
          trackAnswerSelected(completedStage, answer);

          const nextForAnswer = answerStageTransitions[completedStage];
          if (nextForAnswer) {
            transitionToStage(nextForAnswer(answer), 'auto', pillOrigin);
            return;
          }
        }

        const nextStage = directStageTransitions[completedStage];
        if (nextStage) {
          transitionToStage(nextStage, 'auto', pillOrigin);
        }
      },
    }),
    [
      currentStepId,
      navigateToStage,
      setAnswers,
      trackAnswerSelected,
      transitionToStage,
    ],
  );
}
