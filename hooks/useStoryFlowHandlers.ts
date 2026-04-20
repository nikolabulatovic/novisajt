import { type Dispatch, type SetStateAction, useMemo } from 'react';

import type { Stage } from '@/contexts/NavigationContext';
import {
  nextAfterAlignBehaviour,
  nextAfterBreakingQuestion,
  nextAfterDaLiBiVoleo,
  nextAfterKontradiktornostJe,
  nextAfterLetThemLive,
  nextAfterPersonalQuestion,
  nextAfterPonovoNaOdgovore,
  nextAfterSolutionChoice,
  nextAfterSolutionKnow,
  nextAfterSolutionUse,
  nextAfterVecVeganski,
  nextAfterVeganDietHealth,
  nextAfterVracanjeNaOdgovore,
} from '@/lib/storyFlow';

export interface StoryFlowHandlerDeps {
  transitionToStage: (stage: Stage) => void;
  setAnswers: Dispatch<SetStateAction<Record<string, string>>>;
  trackAnswerSelected: (stage: Stage, answer: string) => void;
  trackFlowCompleted: () => void;
}

export function useStoryFlowHandlers({
  transitionToStage,
  setAnswers,
  trackAnswerSelected,
  trackFlowCompleted,
}: StoryFlowHandlerDeps) {
  return useMemo(
    () => ({
      handleIntroComplete: () => {
        transitionToStage('evaluation');
      },

      handleEvaluationComplete: (userAnswers: Record<string, string>) => {
        setAnswers(userAnswers);
        Object.entries(userAnswers).forEach(([question, answer]) => {
          trackAnswerSelected('evaluation', `${question}:${answer}`);
        });
        transitionToStage('explanation');
      },

      handleExplanationComplete: () => {
        transitionToStage('historical');
      },

      handleHistoricalComplete: () => {
        transitionToStage('personal-question');
      },

      handlePersonalQuestionComplete: (answer: string) => {
        trackAnswerSelected('personal-question', answer);
        transitionToStage(nextAfterPersonalQuestion(answer));
      },

      handleDaLiBiVoleoComplete: (answer: string) => {
        trackAnswerSelected('da-li-bi-voleo', answer);
        transitionToStage(nextAfterDaLiBiVoleo(answer));
      },

      handleBreakingQuestionComplete: (answer: string) => {
        trackAnswerSelected('breaking-question', answer);
        transitionToStage(nextAfterBreakingQuestion(answer));
      },

      handleSpasaStoryComplete: () => {
        transitionToStage('spasa-revelation');
      },

      handleSpasaRevelationComplete: () => {
        transitionToStage('other-pigs');
      },

      handleOtherPigsComplete: () => {
        transitionToStage('root-of-the-problem');
      },

      handleRootOfTheProblemComplete: () => {
        transitionToStage('animals-treated-as-products');
      },

      handleAnimalsTreatedAsProductsComplete: () => {
        transitionToStage('let-them-live');
      },

      handleLetThemLiveComplete: (answer: string) => {
        transitionToStage(nextAfterLetThemLive(answer));
      },

      handleAcceptingSelfOwnershipComplete: () => {
        transitionToStage('from-the-wild');
      },

      handleFromTheWildComplete: () => {
        transitionToStage('reproduction-control');
      },

      handleReproductionControlComplete: () => {
        transitionToStage('vicious-cycle');
      },

      handleViciousCycleComplete: () => {
        transitionToStage('cow-fate');
      },

      handleCowFateComplete: () => {
        transitionToStage('animal-cost-of-living');
      },

      handleAnimalCostOfLivingComplete: () => {
        transitionToStage('solution-use');
      },

      handleSolutionUseComplete: (answer: string) => {
        trackAnswerSelected('solution-use', answer);
        transitionToStage(nextAfterSolutionUse(answer));
      },

      handleVecVeganskiComplete: (answer: string) => {
        trackAnswerSelected('vec-veganski', answer);
        if (answer === 'Spreman sam') {
          trackFlowCompleted();
        }
        transitionToStage(nextAfterVecVeganski(answer));
      },

      handleSolutionKnowComplete: (answer: string) => {
        trackAnswerSelected('solution-know', answer);
        transitionToStage(nextAfterSolutionKnow(answer));
      },

      handleVeganDietHealthComplete: (answer: string) => {
        setAnswers((prev) => ({ ...prev, 'vegan-diet-health': answer }));
        trackAnswerSelected('vegan-diet-health', answer);
        transitionToStage(nextAfterVeganDietHealth(answer));
      },

      handleNijeUbediloResursiComplete: () => {
        transitionToStage('solution-choice');
      },

      handleSolutionChoiceComplete: (answer: string) => {
        trackAnswerSelected('solution-choice', answer);
        transitionToStage(nextAfterSolutionChoice(answer));
      },

      handleKontradiktornostJeComplete: (answer: string) => {
        trackAnswerSelected('kontradiktornost-je', answer);
        transitionToStage(nextAfterKontradiktornostJe(answer));
      },

      handleAlignBehaviourComplete: (answer: string) => {
        setAnswers((prev) => ({ ...prev, 'align-behaviour': answer }));
        trackAnswerSelected('align-behaviour', answer);
        transitionToStage(nextAfterAlignBehaviour(answer));
      },

      handleVracanjeNaOdgovoreComplete: (answer: string) => {
        trackAnswerSelected('vracanje-na-odgovore', answer);
        transitionToStage(nextAfterVracanjeNaOdgovore(answer));
      },

      handlePonovoNaOdgovoreComplete: (answer: string) => {
        trackAnswerSelected('ponovo-na-odgovore', answer);
        transitionToStage(nextAfterPonovoNaOdgovore(answer));
      },

      handleVeganismPrincipleComplete: () => {
        trackFlowCompleted();
        transitionToStage('after-choice');
      },
    }),
    [transitionToStage, setAnswers, trackAnswerSelected, trackFlowCompleted],
  );
}
