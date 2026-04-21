'use client';

import type { ComponentType } from 'react';

import AcceptingSelfOwnership from '@/components/AcceptingSelfOwnership';
import AdditionalResources from '@/components/AdditionalResources';
import AddressingContradiction from '@/components/AddressingContradiction';
import AfterChoice from '@/components/AfterChoice';
import AlignBehaviour from '@/components/AlignBehaviour';
import AlreadyVegan from '@/components/AlreadyVegan';
import AnimalCostOfLiving from '@/components/AnimalCostOfLiving';
import AnimalsTreatedAsProducts from '@/components/AnimalsTreatedAsProducts';
import ApatheticStance from '@/components/ApatheticStance';
import BackToAnswers from '@/components/BackToAnswers';
import BackToAnswersAgain from '@/components/BackToAnswersAgain';
import BreakingQuestion from '@/components/BreakingQuestion';
import CharacterEvaluation from '@/components/CharacterEvaluation';
import ChoiceStage from '@/components/ChoiceStage';
import CowFate from '@/components/CowFate';
import FromTheWild from '@/components/FromTheWild';
import HistoricalInjustices from '@/components/HistoricalInjustices';
import LetThemLive from '@/components/LetThemLive';
import NotFollowingThrough from '@/components/NotFollowingThrough';
import NotHonest from '@/components/NotHonest';
import OtherPigs from '@/components/OtherPigs';
import PersonalQuestion from '@/components/PersonalQuestion';
import QuestionExplanation from '@/components/QuestionExplanation';
import RecognizingInjustice from '@/components/RecognizingInjustice';
import RedPillIntro from '@/components/RedPillIntro';
import ReproductionControl from '@/components/ReproductionControl';
import RootOfTheProblem from '@/components/RootOfTheProblem';
import SolutionChoice from '@/components/SolutionChoice';
import SolutionKnow from '@/components/SolutionKnow';
import SolutionUse from '@/components/SolutionUse';
import SpasaRevelation from '@/components/SpasaRevelation';
import SpasaStory from '@/components/SpasaStory';
import StayComfortable from '@/components/StayComfortable';
import VeganDietHealth from '@/components/VeganDietHealth';
import VeganismPrinciple from '@/components/VeganismPrinciple';
import ViciousCycle from '@/components/ViciousCycle';
import WouldYouLikeToBe from '@/components/WouldYouLikeToBe';
import type { Stage } from '@/contexts/NavigationContext';
import { StageId } from '@/contexts/NavigationContext';

type StageCompletionAnswer = string | Record<string, string>;

export interface StageRegistryContext {
  answers: Record<string, string>;
  onStageComplete: (stage: Stage, answer?: StageCompletionAnswer) => void;
  onPillChoice: (pill: 'red' | 'blue') => void;
}

interface StageDefinition {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<any>;
  getProps: (ctx: StageRegistryContext) => Record<string, unknown>;
}

/**
 * For flow-ending stages - no continuation
 */
const noProps = () => ({});

/**
 * For stages the directly transition to the next stage
 */
const withComplete = (stage: Stage): StageDefinition['getProps'] => {
  return ({ onStageComplete }) => ({
    onComplete: () => onStageComplete(stage),
  });
};

/**
 * For stages that require an answer - call the onStageComplete function with the answer
 */
const withAnswerComplete = (stage: Stage): StageDefinition['getProps'] => {
  return ({ onStageComplete }) => ({
    onComplete: (answer: string) => onStageComplete(stage, answer),
  });
};

/**
 * The stage registry
 * getProps is a function that returns the props for the stage - usually fits into the three functions above (noProps, withComplete, withAnswerComplete), but can be made custom
 */
export const STAGE_REGISTRY: Record<Stage, StageDefinition> = {
  [StageId.Choice]: {
    Component: ChoiceStage,
    getProps: ({ onPillChoice }) => ({ onPillChoice }),
  },
  [StageId.Intro]: {
    Component: RedPillIntro,
    getProps: withComplete(StageId.Intro),
  },
  [StageId.Evaluation]: {
    Component: CharacterEvaluation,
    getProps: ({ answers, onStageComplete }) => ({
      answers,
      onComplete: (answer: Record<string, string>) =>
        onStageComplete(StageId.Evaluation, answer),
    }),
  },
  [StageId.Explanation]: {
    Component: QuestionExplanation,
    getProps: withComplete(StageId.Explanation),
  },
  [StageId.Historical]: {
    Component: HistoricalInjustices,
    getProps: withComplete(StageId.Historical),
  },
  [StageId.PersonalQuestion]: {
    Component: PersonalQuestion,
    getProps: withAnswerComplete(StageId.PersonalQuestion),
  },
  [StageId.WouldYouLikeToBe]: {
    Component: WouldYouLikeToBe,
    getProps: withAnswerComplete(StageId.WouldYouLikeToBe),
  },
  [StageId.RecognizingInjustice]: {
    Component: RecognizingInjustice,
    getProps: noProps,
  },
  [StageId.BreakingQuestion]: {
    Component: BreakingQuestion,
    getProps: withAnswerComplete(StageId.BreakingQuestion),
  },
  [StageId.StayComfortable]: {
    Component: StayComfortable,
    getProps: noProps,
  },
  [StageId.ApatheticStance]: {
    Component: ApatheticStance,
    getProps: noProps,
  },
  [StageId.SpasaStory]: {
    Component: SpasaStory,
    getProps: withComplete(StageId.SpasaStory),
  },
  [StageId.SpasaRevelation]: {
    Component: SpasaRevelation,
    getProps: withComplete(StageId.SpasaRevelation),
  },
  [StageId.OtherPigs]: {
    Component: OtherPigs,
    getProps: withComplete(StageId.OtherPigs),
  },
  [StageId.RootOfTheProblem]: {
    Component: RootOfTheProblem,
    getProps: withComplete(StageId.RootOfTheProblem),
  },
  [StageId.AnimalsTreatedAsProducts]: {
    Component: AnimalsTreatedAsProducts,
    getProps: withComplete(StageId.AnimalsTreatedAsProducts),
  },
  [StageId.LetThemLive]: {
    Component: LetThemLive,
    getProps: withAnswerComplete(StageId.LetThemLive),
  },
  [StageId.AcceptingSelfOwnership]: {
    Component: AcceptingSelfOwnership,
    getProps: withComplete(StageId.AcceptingSelfOwnership),
  },
  [StageId.FromTheWild]: {
    Component: FromTheWild,
    getProps: withComplete(StageId.FromTheWild),
  },
  [StageId.ViciousCycle]: {
    Component: ViciousCycle,
    getProps: withComplete(StageId.ViciousCycle),
  },
  [StageId.CowFate]: {
    Component: CowFate,
    getProps: withComplete(StageId.CowFate),
  },
  [StageId.AnimalCostOfLiving]: {
    Component: AnimalCostOfLiving,
    getProps: withComplete(StageId.AnimalCostOfLiving),
  },
  [StageId.ReproductionControl]: {
    Component: ReproductionControl,
    getProps: withComplete(StageId.ReproductionControl),
  },
  [StageId.SolutionUse]: {
    Component: SolutionUse,
    getProps: withAnswerComplete(StageId.SolutionUse),
  },
  [StageId.AlreadyVegan]: {
    Component: AlreadyVegan,
    getProps: withAnswerComplete(StageId.AlreadyVegan),
  },
  [StageId.SolutionKnow]: {
    Component: SolutionKnow,
    getProps: withAnswerComplete(StageId.SolutionKnow),
  },
  [StageId.VeganDietHealth]: {
    Component: VeganDietHealth,
    getProps: withAnswerComplete(StageId.VeganDietHealth),
  },
  [StageId.AdditionalResources]: {
    Component: AdditionalResources,
    getProps: withComplete(StageId.AdditionalResources),
  },
  [StageId.SolutionChoice]: {
    Component: SolutionChoice,
    getProps: withAnswerComplete(StageId.SolutionChoice),
  },
  [StageId.AddressingContradiction]: {
    Component: AddressingContradiction,
    getProps: withAnswerComplete(StageId.AddressingContradiction),
  },
  [StageId.NotHonest]: {
    Component: NotHonest,
    getProps: noProps,
  },
  [StageId.AlignBehaviour]: {
    Component: AlignBehaviour,
    getProps: withAnswerComplete(StageId.AlignBehaviour),
  },
  [StageId.BackToAnswers]: {
    Component: BackToAnswers,
    getProps: ({ answers, onStageComplete }) => ({
      answers,
      onComplete: (answer: string) =>
        onStageComplete(StageId.BackToAnswers, answer),
    }),
  },
  [StageId.BackToAnswersAgain]: {
    Component: BackToAnswersAgain,
    getProps: ({ answers, onStageComplete }) => ({
      answers,
      onComplete: (answer: string) =>
        onStageComplete(StageId.BackToAnswersAgain, answer),
    }),
  },
  [StageId.NotFollowingThrough]: {
    Component: NotFollowingThrough,
    getProps: noProps,
  },
  [StageId.VeganismPrinciple]: {
    Component: VeganismPrinciple,
    getProps: withComplete(StageId.VeganismPrinciple),
  },
  [StageId.AfterChoice]: {
    Component: AfterChoice,
    getProps: noProps,
  },
};
