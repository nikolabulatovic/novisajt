import { type Dispatch, type SetStateAction, useMemo } from 'react';

import { type Stage, StageId } from '@/contexts/NavigationContext';
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
        transitionToStage(StageId.Evaluation);
      },

      handleEvaluationComplete: (userAnswers: Record<string, string>) => {
        setAnswers(userAnswers);
        Object.entries(userAnswers).forEach(([question, answer]) => {
          trackAnswerSelected(StageId.Evaluation, `${question}:${answer}`);
        });
        transitionToStage(StageId.Explanation);
      },

      handleExplanationComplete: () => {
        transitionToStage(StageId.Historical);
      },

      handleHistoricalComplete: () => {
        transitionToStage(StageId.PersonalQuestion);
      },

      handlePersonalQuestionComplete: (answer: string) => {
        trackAnswerSelected(StageId.PersonalQuestion, answer);
        transitionToStage(nextAfterPersonalQuestion(answer));
      },

      handleDaLiBiVoleoComplete: (answer: string) => {
        trackAnswerSelected(StageId.WouldYouLikeToBe, answer);
        transitionToStage(nextAfterDaLiBiVoleo(answer));
      },

      handleBreakingQuestionComplete: (answer: string) => {
        trackAnswerSelected(StageId.BreakingQuestion, answer);
        transitionToStage(nextAfterBreakingQuestion(answer));
      },

      handleSpasaStoryComplete: () => {
        transitionToStage(StageId.SpasaRevelation);
      },

      handleSpasaRevelationComplete: () => {
        transitionToStage(StageId.OtherPigs);
      },

      handleOtherPigsComplete: () => {
        transitionToStage(StageId.RootOfTheProblem);
      },

      handleRootOfTheProblemComplete: () => {
        transitionToStage(StageId.AnimalsTreatedAsProducts);
      },

      handleAnimalsTreatedAsProductsComplete: () => {
        transitionToStage(StageId.LetThemLive);
      },

      handleLetThemLiveComplete: (answer: string) => {
        transitionToStage(nextAfterLetThemLive(answer));
      },

      handleAcceptingSelfOwnershipComplete: () => {
        transitionToStage(StageId.FromTheWild);
      },

      handleFromTheWildComplete: () => {
        transitionToStage(StageId.ReproductionControl);
      },

      handleReproductionControlComplete: () => {
        transitionToStage(StageId.ViciousCycle);
      },

      handleViciousCycleComplete: () => {
        transitionToStage(StageId.CowFate);
      },

      handleCowFateComplete: () => {
        transitionToStage(StageId.AnimalCostOfLiving);
      },

      handleAnimalCostOfLivingComplete: () => {
        transitionToStage(StageId.SolutionUse);
      },

      handleSolutionUseComplete: (answer: string) => {
        trackAnswerSelected(StageId.SolutionUse, answer);
        transitionToStage(nextAfterSolutionUse(answer));
      },

      handleVecVeganskiComplete: (answer: string) => {
        trackAnswerSelected(StageId.AlreadyVegan, answer);
        if (answer === 'Spreman sam') {
          trackFlowCompleted();
        }
        transitionToStage(nextAfterVecVeganski(answer));
      },

      handleSolutionKnowComplete: (answer: string) => {
        trackAnswerSelected(StageId.SolutionKnow, answer);
        transitionToStage(nextAfterSolutionKnow(answer));
      },

      handleVeganDietHealthComplete: (answer: string) => {
        setAnswers((prev) => ({ ...prev, [StageId.VeganDietHealth]: answer }));
        trackAnswerSelected(StageId.VeganDietHealth, answer);
        transitionToStage(nextAfterVeganDietHealth(answer));
      },

      handleNijeUbediloResursiComplete: () => {
        transitionToStage(StageId.SolutionChoice);
      },

      handleSolutionChoiceComplete: (answer: string) => {
        trackAnswerSelected(StageId.SolutionChoice, answer);
        transitionToStage(nextAfterSolutionChoice(answer));
      },

      handleKontradiktornostJeComplete: (answer: string) => {
        trackAnswerSelected(StageId.AddressingContradiction, answer);
        transitionToStage(nextAfterKontradiktornostJe(answer));
      },

      handleAlignBehaviourComplete: (answer: string) => {
        setAnswers((prev) => ({ ...prev, [StageId.AlignBehaviour]: answer }));
        trackAnswerSelected(StageId.AlignBehaviour, answer);
        transitionToStage(nextAfterAlignBehaviour(answer));
      },

      handleVracanjeNaOdgovoreComplete: (answer: string) => {
        trackAnswerSelected(StageId.BackToAnswers, answer);
        transitionToStage(nextAfterVracanjeNaOdgovore(answer));
      },

      handlePonovoNaOdgovoreComplete: (answer: string) => {
        trackAnswerSelected(StageId.BackToAnswersAgain, answer);
        transitionToStage(nextAfterPonovoNaOdgovore(answer));
      },

      handleVeganismPrincipleComplete: () => {
        trackFlowCompleted();
        transitionToStage(StageId.AfterChoice);
      },
    }),
    [transitionToStage, setAnswers, trackAnswerSelected, trackFlowCompleted],
  );
}
