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

export const directStageTransitions: Partial<Record<Stage, Stage>> = {
  [StageId.Intro]: StageId.Evaluation,
  [StageId.Explanation]: StageId.HistoricalIntro,
  [StageId.HistoricalIntro]: StageId.HistoricalSlavery,
  [StageId.HistoricalSlavery]: StageId.HistoricalAuthoritarianism,
  [StageId.HistoricalAuthoritarianism]: StageId.PersonalQuestion,
  [StageId.SpasaStory]: StageId.SpasaRevelation,
  [StageId.SpasaRevelation]: StageId.OtherPigs,
  [StageId.OtherPigs]: StageId.RootOfTheProblem,
  [StageId.RootOfTheProblem]: StageId.AnimalsTreatedAsProducts,
  [StageId.AnimalsTreatedAsProducts]: StageId.LetThemLive,
  [StageId.AcceptingSelfOwnership]: StageId.FromTheWild,
  [StageId.FromTheWild]: StageId.ReproductionControl,
  [StageId.ReproductionControl]: StageId.ViciousCycle,
  [StageId.ViciousCycle]: StageId.CowFate,
  [StageId.CowFate]: StageId.AnimalCostOfLiving,
  [StageId.AnimalCostOfLiving]: StageId.SolutionUse,
  [StageId.AdditionalResources]: StageId.SolutionChoice,
};

export const answerStageTransitions: Partial<
  Record<Stage, (answer: string) => Stage>
> = {
  [StageId.PersonalQuestion]: nextAfterPersonalQuestion,
  [StageId.WouldYouLikeToBe]: nextAfterDaLiBiVoleo,
  [StageId.BreakingQuestion]: nextAfterBreakingQuestion,
  [StageId.LetThemLive]: nextAfterLetThemLive,
  [StageId.SolutionUse]: nextAfterSolutionUse,
  [StageId.AlreadyVegan]: nextAfterVecVeganski,
  [StageId.SolutionKnow]: nextAfterSolutionKnow,
  [StageId.VeganDietHealth]: nextAfterVeganDietHealth,
  [StageId.SolutionChoice]: nextAfterSolutionChoice,
  [StageId.AddressingContradiction]: nextAfterKontradiktornostJe,
  [StageId.AlignBehaviour]: nextAfterAlignBehaviour,
  [StageId.BackToAnswers]: nextAfterVracanjeNaOdgovore,
  [StageId.BackToAnswersAgain]: nextAfterPonovoNaOdgovore,
};
