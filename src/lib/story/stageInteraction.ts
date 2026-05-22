import { type Stage, StageId } from '@/src/contexts/NavigationContext';

export type StageInteractionType =
  | 'choice-pills'
  | 'next-pill'
  | 'answer-options'
  | 'none';

export const stageInteractionType: Record<Stage, StageInteractionType> = {
  [StageId.Choice]: 'choice-pills',
  [StageId.Intro]: 'next-pill',
  [StageId.Evaluation]: 'none',
  [StageId.Explanation]: 'next-pill',
  [StageId.CharacterIncompatible]: 'none',
  [StageId.HistoricalIntro]: 'next-pill',
  [StageId.HistoricalSlavery]: 'next-pill',
  [StageId.HistoricalAuthoritarianism]: 'next-pill',
  [StageId.PersonalQuestion]: 'answer-options',
  [StageId.WouldYouLikeToBe]: 'answer-options',
  [StageId.RecognizingInjustice]: 'none',
  [StageId.BreakingQuestion]: 'answer-options',
  [StageId.StayComfortable]: 'none',
  [StageId.ApatheticStance]: 'none',
  [StageId.SpasaStory]: 'next-pill',
  [StageId.SpasaRevelation]: 'next-pill',
  [StageId.OtherPigs]: 'next-pill',
  [StageId.RootOfTheProblem]: 'next-pill',
  [StageId.AnimalsTreatedAsProducts]: 'next-pill',
  [StageId.LetThemLive]: 'answer-options',
  [StageId.AcceptingSelfOwnership]: 'next-pill',
  [StageId.FromTheWild]: 'next-pill',
  [StageId.ViciousCycle]: 'next-pill',
  [StageId.CowFate]: 'next-pill',
  [StageId.AnimalCostOfLiving]: 'next-pill',
  [StageId.ReproductionControl]: 'next-pill',
  [StageId.SolutionUse]: 'answer-options',
  [StageId.AlreadyVegan]: 'answer-options',
  [StageId.SolutionKnow]: 'answer-options',
  [StageId.VeganDietHealth]: 'answer-options',
  [StageId.AdditionalResources]: 'next-pill',
  [StageId.SolutionChoice]: 'answer-options',
  [StageId.AddressingContradiction]: 'answer-options',
  [StageId.NotHonest]: 'none',
  [StageId.AlignBehaviour]: 'answer-options',
  [StageId.BackToAnswers]: 'answer-options',
  [StageId.BackToAnswersAgain]: 'answer-options',
  [StageId.NotFollowingThrough]: 'none',
  [StageId.VeganismPrinciple]: 'next-pill',
  [StageId.AfterChoice]: 'none',
};
