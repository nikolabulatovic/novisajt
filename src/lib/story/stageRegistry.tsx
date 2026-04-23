'use client';

import type { ComponentType } from 'react';

import AcceptingSelfOwnership from '@/src/components/AcceptingSelfOwnership';
import AdditionalResources from '@/src/components/AdditionalResources';
import AddressingContradiction from '@/src/components/AddressingContradiction';
import AfterChoice from '@/src/components/AfterChoice';
import AlignBehaviour from '@/src/components/AlignBehaviour';
import AlreadyVegan from '@/src/components/AlreadyVegan';
import AnimalCostOfLiving from '@/src/components/AnimalCostOfLiving';
import AnimalsTreatedAsProducts from '@/src/components/AnimalsTreatedAsProducts';
import ApatheticStance from '@/src/components/ApatheticStance';
import BackToAnswers from '@/src/components/BackToAnswers';
import BackToAnswersAgain from '@/src/components/BackToAnswersAgain';
import BreakingQuestion from '@/src/components/BreakingQuestion';
import CharacterEvaluation from '@/src/components/CharacterEvaluation';
import ChoiceStage from '@/src/components/ChoiceStage';
import CowFate from '@/src/components/CowFate';
import FromTheWild from '@/src/components/FromTheWild';
import HistoricalAuthoritarianism from '@/src/components/HistoricalAuthoritarianism';
import HistoricalIntro from '@/src/components/HistoricalIntro';
import HistoricalSlavery from '@/src/components/HistoricalSlavery';
import LetThemLive from '@/src/components/LetThemLive';
import NotFollowingThrough from '@/src/components/NotFollowingThrough';
import NotHonest from '@/src/components/NotHonest';
import OtherPigs from '@/src/components/OtherPigs';
import PersonalQuestion from '@/src/components/PersonalQuestion';
import QuestionExplanation from '@/src/components/QuestionExplanation';
import RecognizingInjustice from '@/src/components/RecognizingInjustice';
import RedPillIntro from '@/src/components/RedPillIntro';
import ReproductionControl from '@/src/components/ReproductionControl';
import RootOfTheProblem from '@/src/components/RootOfTheProblem';
import SolutionChoice from '@/src/components/SolutionChoice';
import SolutionKnow from '@/src/components/SolutionKnow';
import SolutionUse from '@/src/components/SolutionUse';
import SpasaRevelation from '@/src/components/SpasaRevelation';
import SpasaStory from '@/src/components/SpasaStory';
import StayComfortable from '@/src/components/StayComfortable';
import VeganDietHealth from '@/src/components/VeganDietHealth';
import VeganismPrinciple from '@/src/components/VeganismPrinciple';
import ViciousCycle from '@/src/components/ViciousCycle';
import WouldYouLikeToBe from '@/src/components/WouldYouLikeToBe';
import type { Stage } from '@/src/contexts/NavigationContext';
import { StageId } from '@/src/contexts/NavigationContext';

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
  [StageId.HistoricalIntro]: {
    Component: HistoricalIntro,
    getProps: withComplete(StageId.HistoricalIntro),
  },
  [StageId.HistoricalSlavery]: {
    Component: HistoricalSlavery,
    getProps: withComplete(StageId.HistoricalSlavery),
  },
  [StageId.HistoricalAuthoritarianism]: {
    Component: HistoricalAuthoritarianism,
    getProps: withComplete(StageId.HistoricalAuthoritarianism),
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
