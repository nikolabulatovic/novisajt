import { type Dispatch, type SetStateAction, useMemo } from 'react';

import { type Stage, StageId } from '@/src/contexts/NavigationContext';
import type { StoryTransitionStyle } from '@/src/contexts/StoryFlowContext';
import { AnswerId } from '@/src/lib/answerIds';
import type { PillOrigin } from '@/src/lib/pillOrigin';
import { characterEvaluationAnswersMeetBar } from '@/src/lib/story/characterEvaluationBar';
import {
  answerStageTransitions,
  directStageTransitions,
} from '@/src/lib/story/transitions';

export interface StoryFlowHandlerDeps {
  transitionToStage: (
    stage: Stage,
    style?: StoryTransitionStyle,
    pillOrigin?: PillOrigin,
  ) => void;
  setAnswers: Dispatch<SetStateAction<Record<string, string>>>;
  trackAnswerSelected: (stage: Stage, answer: string) => void;
  trackFlowCompleted: () => void;
}

type StageCompletionAnswer = string | Record<string, string>;

export function useStoryFlowHandlers({
  transitionToStage,
  setAnswers,
  trackAnswerSelected,
  trackFlowCompleted,
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
          setAnswers((prev) => ({ ...prev, [completedStage]: answer }));
          trackAnswerSelected(completedStage, answer);

          if (
            completedStage === StageId.AlreadyVegan &&
            answer === AnswerId.YES
          ) {
            trackFlowCompleted();
          }

          const nextForAnswer = answerStageTransitions[completedStage];
          if (nextForAnswer) {
            transitionToStage(nextForAnswer(answer), 'auto', pillOrigin);
            return;
          }
        }

        if (completedStage === StageId.VeganismPrinciple) {
          trackFlowCompleted();
        }

        const nextStage = directStageTransitions[completedStage];
        if (nextStage) {
          transitionToStage(nextStage, 'auto', pillOrigin);
        }
      },
    }),
    [setAnswers, trackAnswerSelected, trackFlowCompleted, transitionToStage],
  );
}
