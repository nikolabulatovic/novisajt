'use client';

import type { ComponentType } from 'react';

import AcceptingSelfOwnership from '@/src/components/AcceptingSelfOwnership';
import ActResponsibly from '@/src/components/ActResponsibly';
import AdditionalResources from '@/src/components/AdditionalResources';
import AddressingContradiction from '@/src/components/AddressingContradiction';
import AlignBehaviour from '@/src/components/AlignBehaviour';
import AnimalCostOfLiving from '@/src/components/AnimalCostOfLiving';
import AnimalsTreatedAsProducts from '@/src/components/AnimalsTreatedAsProducts';
import ApatheticStance from '@/src/components/ApatheticStance';
import AvoidingResponsibility from '@/src/components/AvoidingResponsibility';
import BreakingQuestion from '@/src/components/BreakingQuestion';
import CharacterEvaluation from '@/src/components/CharacterEvaluation';
import CharacterIncompatible from '@/src/components/CharacterIncompatible';
import ChoiceStage from '@/src/components/ChoiceStage';
import CourageousChoice from '@/src/components/CourageousChoice';
import CowFate from '@/src/components/CowFate';
import DishonestSelfOwnership from '@/src/components/DishonestSelfOwnership';
import DoubleStandard from '@/src/components/DoubleStandard';
import Excuse from '@/src/components/Excuse';
import FromTheWild from '@/src/components/FromTheWild';
import HistoricalAuthoritarianism from '@/src/components/HistoricalAuthoritarianism';
import HistoricalIntro from '@/src/components/HistoricalIntro';
import HistoricalSlavery from '@/src/components/HistoricalSlavery';
import InjusticePersists from '@/src/components/InjusticePersists';
import JoinUs from '@/src/components/JoinUs';
import LetThemLive from '@/src/components/LetThemLive';
import NotAcceptingHealth from '@/src/components/NotAcceptingHealth';
import NotHonest from '@/src/components/NotHonest';
import NotThreatened from '@/src/components/NotThreatened';
import NotWhoYouThink from '@/src/components/NotWhoYouThink';
import OkWithInjustice from '@/src/components/OkWithInjustice';
import OtherPigs from '@/src/components/OtherPigs';
import PersonalAccountability from '@/src/components/PersonalAccountability';
import PersonalQuestion from '@/src/components/PersonalQuestion';
import QuestionExplanation from '@/src/components/QuestionExplanation';
import RecognizingInjustice from '@/src/components/RecognizingInjustice';
import RedPillIntro from '@/src/components/RedPillIntro';
import ReproductionControl from '@/src/components/ReproductionControl';
import RighteousChoice from '@/src/components/RighteousChoice';
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
import YouAreResponsible from '@/src/components/YouAreResponsible';
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
  [StageId.PersonalAccountability]: PersonalAccountability,
  [StageId.InjusticePersists]: InjusticePersists,
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
  [StageId.DishonestSelfOwnership]: DishonestSelfOwnership,
  [StageId.FromTheWild]: FromTheWild,
  [StageId.ViciousCycle]: ViciousCycle,
  [StageId.CowFate]: CowFate,
  [StageId.AnimalCostOfLiving]: AnimalCostOfLiving,
  [StageId.ReproductionControl]: ReproductionControl,
  [StageId.SolutionUse]: SolutionUse,
  [StageId.SolutionKnow]: SolutionKnow,
  [StageId.VeganDietHealth]: VeganDietHealth,
  [StageId.AdditionalResources]: AdditionalResources,
  [StageId.NotAcceptingHealth]: NotAcceptingHealth,
  [StageId.SolutionChoice]: SolutionChoice,
  [StageId.AddressingContradiction]: AddressingContradiction,
  [StageId.NotHonest]: NotHonest,
  [StageId.AlignBehaviour]: AlignBehaviour,
  [StageId.Excuse]: Excuse,
  [StageId.DoubleStandard]: DoubleStandard,
  [StageId.NotThreatened]: NotThreatened,
  [StageId.YouAreResponsible]: YouAreResponsible,
  [StageId.ActResponsibly]: ActResponsibly,
  [StageId.NotWhoYouThink]: NotWhoYouThink,
  [StageId.AvoidingResponsibility]: AvoidingResponsibility,
  [StageId.OkWithInjustice]: OkWithInjustice,
  [StageId.VeganismPrinciple]: VeganismPrinciple,
  [StageId.RighteousChoice]: RighteousChoice,
  [StageId.CourageousChoice]: CourageousChoice,
  [StageId.JoinUs]: JoinUs,
};
