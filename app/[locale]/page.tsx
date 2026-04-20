'use client';

import { useCallback, useEffect, useState } from 'react';

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
import NavigationMenu from '@/components/NavigationMenu';
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
import PillTransitionLayer from '@/components/ui/PillTransitionLayer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';
import {
  NavigationProvider,
  Stage,
  StageId,
} from '@/contexts/NavigationContext';
import { PillProvider } from '@/contexts/PillContext';
import { useStoryFlowHandlers } from '@/hooks/useStoryFlowHandlers';
import { useTracking } from '@/hooks/useTracking';

export default function Home() {
  const [stage, setStage] = useState<Stage>(StageId.Choice);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [pendingNextStage, setPendingNextStage] = useState<Stage | null>(null);
  const [blackOverlay, setBlackOverlay] = useState(false);
  const [stageAfterFade, setStageAfterFade] = useState<Stage | null>(null);
  const { trackStageViewed, trackAnswerSelected, trackFlowCompleted } =
    useTracking();

  useEffect(() => {
    trackStageViewed(stage);
  }, [stage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTransitionComplete = () => {
    if (pendingNextStage) {
      setStage(pendingNextStage);
    }
    setPendingNextStage(null);
  };

  const transitionToStage = useCallback(
    (newStage: Stage) => {
      if (sectionBackgrounds[stage]?.pillTransition) {
        setPendingNextStage(newStage);
      } else {
        setStage(newStage);
      }
    },
    [stage],
  );

  const {
    handleIntroComplete,
    handleEvaluationComplete,
    handleExplanationComplete,
    handleHistoricalComplete,
    handlePersonalQuestionComplete,
    handleDaLiBiVoleoComplete,
    handleBreakingQuestionComplete,
    handleSpasaStoryComplete,
    handleSpasaRevelationComplete,
    handleOtherPigsComplete,
    handleRootOfTheProblemComplete,
    handleAnimalsTreatedAsProductsComplete,
    handleLetThemLiveComplete,
    handleAcceptingSelfOwnershipComplete,
    handleFromTheWildComplete,
    handleReproductionControlComplete,
    handleViciousCycleComplete,
    handleCowFateComplete,
    handleAnimalCostOfLivingComplete,
    handleSolutionUseComplete,
    handleVecVeganskiComplete,
    handleSolutionKnowComplete,
    handleVeganDietHealthComplete,
    handleNijeUbediloResursiComplete,
    handleSolutionChoiceComplete,
    handleKontradiktornostJeComplete,
    handleAlignBehaviourComplete,
    handleVracanjeNaOdgovoreComplete,
    handlePonovoNaOdgovoreComplete,
    handleVeganismPrincipleComplete,
  } = useStoryFlowHandlers({
    transitionToStage,
    setAnswers,
    trackAnswerSelected,
    trackFlowCompleted,
  });

  const handlePillChoice = (pill: 'red' | 'blue') => {
    trackAnswerSelected(StageId.Choice, pill);
    if (pill === 'red') {
      transitionToStage(StageId.Intro);
    } else {
      setStageAfterFade(StageId.StayComfortable);
      setBlackOverlay(true);
    }
  };

  const handleBlackOverlayTransitionEnd = () => {
    if (stageAfterFade) {
      setStage(stageAfterFade);
      setStageAfterFade(null);
      setBlackOverlay(false);
    }
  };

  const navigateToStage = (newStage: Stage) => {
    setStage(newStage);
  };

  return (
    <NavigationProvider currentStage={stage} navigateToStage={navigateToStage}>
      <PillProvider>
        <PillTransitionLayer
          pendingNextStage={pendingNextStage}
          onComplete={handleTransitionComplete}
        />
        <div
          className="fixed inset-0 bg-black z-50 pointer-events-none transition-opacity duration-[2000ms]"
          style={{ opacity: blackOverlay ? 1 : 0 }}
          onTransitionEnd={handleBlackOverlayTransitionEnd}
        />
        <NavigationMenu />
        <main className="min-h-screen bg-black text-white overflow-hidden relative">
          <>
            {stage === StageId.Choice && (
              <ChoiceStage onPillChoice={handlePillChoice} />
            )}
            {stage === StageId.Intro && (
              <RedPillIntro onComplete={handleIntroComplete} />
            )}
            {stage === StageId.Evaluation && (
              <CharacterEvaluation
                onComplete={handleEvaluationComplete}
                answers={answers}
              />
            )}
            {stage === StageId.Explanation && (
              <QuestionExplanation onComplete={handleExplanationComplete} />
            )}
            {stage === StageId.Historical && (
              <HistoricalInjustices onComplete={handleHistoricalComplete} />
            )}
            {stage === StageId.PersonalQuestion && (
              <PersonalQuestion onComplete={handlePersonalQuestionComplete} />
            )}
            {stage === StageId.WouldYouLikeToBe && (
              <WouldYouLikeToBe onComplete={handleDaLiBiVoleoComplete} />
            )}
            {stage === StageId.RecognizingInjustice && <RecognizingInjustice />}
            {stage === StageId.BreakingQuestion && (
              <BreakingQuestion onComplete={handleBreakingQuestionComplete} />
            )}
            {stage === StageId.StayComfortable && <StayComfortable />}
            {stage === StageId.ApatheticStance && <ApatheticStance />}
            {stage === StageId.SpasaStory && (
              <SpasaStory onComplete={handleSpasaStoryComplete} />
            )}
            {stage === StageId.SpasaRevelation && (
              <SpasaRevelation onComplete={handleSpasaRevelationComplete} />
            )}
            {stage === StageId.OtherPigs && (
              <OtherPigs onComplete={handleOtherPigsComplete} />
            )}
            {stage === StageId.RootOfTheProblem && (
              <RootOfTheProblem onComplete={handleRootOfTheProblemComplete} />
            )}
            {stage === StageId.AnimalsTreatedAsProducts && (
              <AnimalsTreatedAsProducts
                onComplete={handleAnimalsTreatedAsProductsComplete}
              />
            )}
            {stage === StageId.LetThemLive && (
              <LetThemLive onComplete={handleLetThemLiveComplete} />
            )}
            {stage === StageId.AcceptingSelfOwnership && (
              <AcceptingSelfOwnership
                onComplete={handleAcceptingSelfOwnershipComplete}
              />
            )}
            {stage === StageId.FromTheWild && (
              <FromTheWild onComplete={handleFromTheWildComplete} />
            )}
            {stage === StageId.ViciousCycle && (
              <ViciousCycle onComplete={handleViciousCycleComplete} />
            )}
            {stage === StageId.CowFate && (
              <CowFate onComplete={handleCowFateComplete} />
            )}
            {stage === StageId.AnimalCostOfLiving && (
              <AnimalCostOfLiving
                onComplete={handleAnimalCostOfLivingComplete}
              />
            )}
            {stage === StageId.ReproductionControl && (
              <ReproductionControl
                onComplete={handleReproductionControlComplete}
              />
            )}
            {stage === StageId.SolutionUse && (
              <SolutionUse onComplete={handleSolutionUseComplete} />
            )}
            {stage === StageId.AlreadyVegan && (
              <AlreadyVegan onComplete={handleVecVeganskiComplete} />
            )}
            {stage === StageId.SolutionKnow && (
              <SolutionKnow onComplete={handleSolutionKnowComplete} />
            )}
            {stage === StageId.VeganDietHealth && (
              <VeganDietHealth onComplete={handleVeganDietHealthComplete} />
            )}
            {stage === StageId.AdditionalResources && (
              <AdditionalResources
                onComplete={handleNijeUbediloResursiComplete}
              />
            )}
            {stage === StageId.SolutionChoice && (
              <SolutionChoice onComplete={handleSolutionChoiceComplete} />
            )}
            {stage === StageId.AddressingContradiction && (
              <AddressingContradiction
                onComplete={handleKontradiktornostJeComplete}
              />
            )}
            {stage === StageId.NotHonest && <NotHonest />}
            {stage === StageId.AlignBehaviour && (
              <AlignBehaviour onComplete={handleAlignBehaviourComplete} />
            )}
            {stage === StageId.BackToAnswers && (
              <BackToAnswers
                onComplete={handleVracanjeNaOdgovoreComplete}
                answers={answers}
              />
            )}
            {stage === StageId.BackToAnswersAgain && (
              <BackToAnswersAgain
                onComplete={handlePonovoNaOdgovoreComplete}
                answers={answers}
              />
            )}
            {stage === StageId.NotFollowingThrough && <NotFollowingThrough />}
            {stage === StageId.VeganismPrinciple && (
              <VeganismPrinciple onComplete={handleVeganismPrincipleComplete} />
            )}
            {stage === StageId.AfterChoice && <AfterChoice />}
          </>
        </main>
      </PillProvider>
    </NavigationProvider>
  );
}
