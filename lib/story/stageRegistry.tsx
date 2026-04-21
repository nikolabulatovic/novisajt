'use client';

import type { ReactElement } from 'react';

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

interface StageRenderContext {
  stage: Stage;
  answers: Record<string, string>;
  onStageComplete: (
    stage: Stage,
    answer?: string | Record<string, string>,
  ) => void;
  onPillChoice: (pill: 'red' | 'blue') => void;
}

export function renderStage({
  stage,
  answers,
  onStageComplete,
  onPillChoice,
}: StageRenderContext) {
  const stageViews: Record<Stage, ReactElement> = {
    [StageId.Choice]: <ChoiceStage onPillChoice={onPillChoice} />,
    [StageId.Intro]: (
      <RedPillIntro onComplete={() => onStageComplete(StageId.Intro)} />
    ),
    [StageId.Evaluation]: (
      <CharacterEvaluation
        onComplete={(answer) => onStageComplete(StageId.Evaluation, answer)}
        answers={answers}
      />
    ),
    [StageId.Explanation]: (
      <QuestionExplanation
        onComplete={() => onStageComplete(StageId.Explanation)}
      />
    ),
    [StageId.Historical]: (
      <HistoricalInjustices
        onComplete={() => onStageComplete(StageId.Historical)}
      />
    ),
    [StageId.PersonalQuestion]: (
      <PersonalQuestion
        onComplete={(answer) =>
          onStageComplete(StageId.PersonalQuestion, answer)
        }
      />
    ),
    [StageId.WouldYouLikeToBe]: (
      <WouldYouLikeToBe
        onComplete={(answer) =>
          onStageComplete(StageId.WouldYouLikeToBe, answer)
        }
      />
    ),
    [StageId.RecognizingInjustice]: <RecognizingInjustice />,
    [StageId.BreakingQuestion]: (
      <BreakingQuestion
        onComplete={(answer) =>
          onStageComplete(StageId.BreakingQuestion, answer)
        }
      />
    ),
    [StageId.StayComfortable]: <StayComfortable />,
    [StageId.ApatheticStance]: <ApatheticStance />,
    [StageId.SpasaStory]: (
      <SpasaStory onComplete={() => onStageComplete(StageId.SpasaStory)} />
    ),
    [StageId.SpasaRevelation]: (
      <SpasaRevelation
        onComplete={() => onStageComplete(StageId.SpasaRevelation)}
      />
    ),
    [StageId.OtherPigs]: (
      <OtherPigs onComplete={() => onStageComplete(StageId.OtherPigs)} />
    ),
    [StageId.RootOfTheProblem]: (
      <RootOfTheProblem
        onComplete={() => onStageComplete(StageId.RootOfTheProblem)}
      />
    ),
    [StageId.AnimalsTreatedAsProducts]: (
      <AnimalsTreatedAsProducts
        onComplete={() => onStageComplete(StageId.AnimalsTreatedAsProducts)}
      />
    ),
    [StageId.LetThemLive]: (
      <LetThemLive
        onComplete={(answer) => onStageComplete(StageId.LetThemLive, answer)}
      />
    ),
    [StageId.AcceptingSelfOwnership]: (
      <AcceptingSelfOwnership
        onComplete={() => onStageComplete(StageId.AcceptingSelfOwnership)}
      />
    ),
    [StageId.FromTheWild]: (
      <FromTheWild onComplete={() => onStageComplete(StageId.FromTheWild)} />
    ),
    [StageId.ViciousCycle]: (
      <ViciousCycle onComplete={() => onStageComplete(StageId.ViciousCycle)} />
    ),
    [StageId.CowFate]: (
      <CowFate onComplete={() => onStageComplete(StageId.CowFate)} />
    ),
    [StageId.AnimalCostOfLiving]: (
      <AnimalCostOfLiving
        onComplete={() => onStageComplete(StageId.AnimalCostOfLiving)}
      />
    ),
    [StageId.ReproductionControl]: (
      <ReproductionControl
        onComplete={() => onStageComplete(StageId.ReproductionControl)}
      />
    ),
    [StageId.SolutionUse]: (
      <SolutionUse
        onComplete={(answer) => onStageComplete(StageId.SolutionUse, answer)}
      />
    ),
    [StageId.AlreadyVegan]: (
      <AlreadyVegan
        onComplete={(answer) => onStageComplete(StageId.AlreadyVegan, answer)}
      />
    ),
    [StageId.SolutionKnow]: (
      <SolutionKnow
        onComplete={(answer) => onStageComplete(StageId.SolutionKnow, answer)}
      />
    ),
    [StageId.VeganDietHealth]: (
      <VeganDietHealth
        onComplete={(answer) =>
          onStageComplete(StageId.VeganDietHealth, answer)
        }
      />
    ),
    [StageId.AdditionalResources]: (
      <AdditionalResources
        onComplete={() => onStageComplete(StageId.AdditionalResources)}
      />
    ),
    [StageId.SolutionChoice]: (
      <SolutionChoice
        onComplete={(answer) => onStageComplete(StageId.SolutionChoice, answer)}
      />
    ),
    [StageId.AddressingContradiction]: (
      <AddressingContradiction
        onComplete={(answer) =>
          onStageComplete(StageId.AddressingContradiction, answer)
        }
      />
    ),
    [StageId.NotHonest]: <NotHonest />,
    [StageId.AlignBehaviour]: (
      <AlignBehaviour
        onComplete={(answer) => onStageComplete(StageId.AlignBehaviour, answer)}
      />
    ),
    [StageId.BackToAnswers]: (
      <BackToAnswers
        onComplete={(answer) => onStageComplete(StageId.BackToAnswers, answer)}
        answers={answers}
      />
    ),
    [StageId.BackToAnswersAgain]: (
      <BackToAnswersAgain
        onComplete={(answer) =>
          onStageComplete(StageId.BackToAnswersAgain, answer)
        }
        answers={answers}
      />
    ),
    [StageId.NotFollowingThrough]: <NotFollowingThrough />,
    [StageId.VeganismPrinciple]: (
      <VeganismPrinciple
        onComplete={() => onStageComplete(StageId.VeganismPrinciple)}
      />
    ),
    [StageId.AfterChoice]: <AfterChoice />,
  };

  return stageViews[stage];
}
