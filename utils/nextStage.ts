import { Stage, StageId } from '@/contexts/NavigationContext';

/**
 * Determines the next stage based on the current stage
 * This is used for transition effects to show the next background image
 */
export function getNextStage(
  currentStage: Stage,
  pillColor?: 'red' | 'blue',
): Stage | null {
  // For choice stage, red pill goes to intro, blue stays on choice
  if (currentStage === StageId.Choice) {
    return pillColor === 'red' ? StageId.Intro : null;
  }

  // Map of current stage to next stage
  const stageMap: Record<Stage, Stage | null> = {
    [StageId.Choice]: StageId.Intro,
    [StageId.Intro]: StageId.Evaluation,
    [StageId.Evaluation]: StageId.Explanation,
    [StageId.Explanation]: StageId.Historical,
    [StageId.Historical]: StageId.PersonalQuestion,
    [StageId.PersonalQuestion]: StageId.BreakingQuestion,
    [StageId.WouldYouLikeToBe]: StageId.BreakingQuestion,
    [StageId.RecognizingInjustice]: null,
    [StageId.BreakingQuestion]: StageId.SpasaStory,
    [StageId.StayComfortable]: null,
    [StageId.ApatheticStance]: null,
    [StageId.SpasaStory]: StageId.SpasaRevelation,
    [StageId.SpasaRevelation]: StageId.OtherPigs,
    [StageId.OtherPigs]: StageId.RootOfTheProblem,
    [StageId.RootOfTheProblem]: StageId.AnimalsTreatedAsProducts,
    [StageId.AnimalsTreatedAsProducts]: StageId.LetThemLive,
    [StageId.LetThemLive]: StageId.FromTheWild,
    [StageId.AcceptingSelfOwnership]: StageId.FromTheWild,
    [StageId.FromTheWild]: StageId.ReproductionControl,
    [StageId.ReproductionControl]: StageId.ViciousCycle,
    [StageId.ViciousCycle]: StageId.CowFate,
    [StageId.CowFate]: StageId.AnimalCostOfLiving,
    [StageId.AnimalCostOfLiving]: StageId.SolutionUse,
    [StageId.SolutionUse]: StageId.SolutionKnow,
    [StageId.AlreadyVegan]: StageId.SolutionKnow,
    [StageId.SolutionKnow]: StageId.SolutionChoice,
    [StageId.VeganDietHealth]: StageId.SolutionChoice,
    [StageId.AdditionalResources]: StageId.SolutionChoice,
    [StageId.SolutionChoice]: StageId.AlignBehaviour,
    [StageId.AddressingContradiction]: StageId.AlignBehaviour,
    [StageId.NotHonest]: null,
    [StageId.AlignBehaviour]: StageId.VeganismPrinciple,
    [StageId.BackToAnswers]: StageId.VeganismPrinciple,
    [StageId.BackToAnswersAgain]: StageId.VeganismPrinciple,
    [StageId.NotFollowingThrough]: null,
    [StageId.VeganismPrinciple]: StageId.AfterChoice,
    [StageId.AfterChoice]: null,
  };

  return stageMap[currentStage] || null;
}
