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
import CharacterIncompatible from '@/src/components/CharacterIncompatible';
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const STAGE_REGISTRY: Record<Stage, ComponentType<any>> = {
  [StageId.Choice]: ChoiceStage,
  [StageId.Intro]: RedPillIntro,
  [StageId.Evaluation]: CharacterEvaluation,
  [StageId.CharacterIncompatible]: CharacterIncompatible,
  [StageId.Explanation]: QuestionExplanation,
  [StageId.HistoricalIntro]: HistoricalIntro,
  [StageId.HistoricalSlavery]: HistoricalSlavery,
  [StageId.HistoricalAuthoritarianism]: HistoricalAuthoritarianism,
  [StageId.PersonalQuestion]: PersonalQuestion,
  [StageId.WouldYouLikeToBe]: WouldYouLikeToBe,
  [StageId.RecognizingInjustice]: RecognizingInjustice,
  [StageId.BreakingQuestion]: BreakingQuestion,
  [StageId.StayComfortable]: StayComfortable,
  [StageId.ApatheticStance]: ApatheticStance,
  [StageId.SpasaStory]: SpasaStory,
  [StageId.SpasaRevelation]: SpasaRevelation,
  [StageId.OtherPigs]: OtherPigs,
  [StageId.RootOfTheProblem]: RootOfTheProblem,
  [StageId.AnimalsTreatedAsProducts]: AnimalsTreatedAsProducts,
  [StageId.LetThemLive]: LetThemLive,
  [StageId.AcceptingSelfOwnership]: AcceptingSelfOwnership,
  [StageId.FromTheWild]: FromTheWild,
  [StageId.ViciousCycle]: ViciousCycle,
  [StageId.CowFate]: CowFate,
  [StageId.AnimalCostOfLiving]: AnimalCostOfLiving,
  [StageId.ReproductionControl]: ReproductionControl,
  [StageId.SolutionUse]: SolutionUse,
  [StageId.AlreadyVegan]: AlreadyVegan,
  [StageId.SolutionKnow]: SolutionKnow,
  [StageId.VeganDietHealth]: VeganDietHealth,
  [StageId.AdditionalResources]: AdditionalResources,
  [StageId.SolutionChoice]: SolutionChoice,
  [StageId.AddressingContradiction]: AddressingContradiction,
  [StageId.NotHonest]: NotHonest,
  [StageId.AlignBehaviour]: AlignBehaviour,
  [StageId.BackToAnswers]: BackToAnswers,
  [StageId.BackToAnswersAgain]: BackToAnswersAgain,
  [StageId.NotFollowingThrough]: NotFollowingThrough,
  [StageId.VeganismPrinciple]: VeganismPrinciple,
  [StageId.AfterChoice]: AfterChoice,
};
