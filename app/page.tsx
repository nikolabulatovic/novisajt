'use client';

import { useState } from 'react';
import { NavigationProvider, Stage } from '@/contexts/NavigationContext';
import { PillProvider } from '@/contexts/PillContext';
import PillTransitionLayer from '@/components/ui/PillTransitionLayer';
import { sectionBackgrounds } from '@/config/sectionBackgrounds';
import ChoiceStage from '@/components/ChoiceStage';
import CharacterEvaluation from '@/components/CharacterEvaluation';
import RedPillIntro from '@/components/RedPillIntro';
import QuestionExplanation from '@/components/QuestionExplanation';
import HistoricalInjustices from '@/components/HistoricalInjustices';
import PersonalQuestion from '@/components/PersonalQuestion';
import BreakingQuestion from '@/components/BreakingQuestion';
import SpasaStory from '@/components/SpasaStory';
import SpasaRevelation from '@/components/SpasaRevelation';
import OtherPigs from '@/components/OtherPigs';
import FactsNumbers from '@/components/FactsNumbers';
import RootOfTheProblem from '@/components/RootOfTheProblem';
import AnimalsTreatedAsProducts from '@/components/AnimalsTreatedAsProducts';
import LetThemLive from '@/components/LetThemLive';
import FromTheWild from '@/components/FromTheWild';
import ViciousCycle from '@/components/ViciousCycle';
import CowFate from '@/components/CowFate';
import AnimalCostOfLiving from '@/components/AnimalCostOfLiving';
import ReproductionControl from '@/components/ReproductionControl';
import SolutionUse from '@/components/SolutionUse';
import SolutionKnow from '@/components/SolutionKnow';
import VeganDietHealth from '@/components/VeganDietHealth';
import SolutionChoice from '@/components/SolutionChoice';
import AlignBehaviour from '@/components/AlignBehaviour';
import VeganismPrinciple from '@/components/VeganismPrinciple';
import AnimalExploitation from '@/components/AnimalExploitation';
import DomesticationReproduction from '@/components/DomesticationReproduction';
import MoralConsistency from '@/components/MoralConsistency';
import FinalChoice from '@/components/FinalChoice';
import Mirror from '@/components/Mirror';
import CallToAction from '@/components/CallToAction';
import AfterChoice from '@/components/AfterChoice';
import NavigationMenu from '@/components/NavigationMenu';

export default function Home() {
  const [stage, setStage] = useState<Stage>('choice');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [pendingNextStage, setPendingNextStage] = useState<Stage | null>(null);

  const handleTransitionComplete = () => {
    if (pendingNextStage) {
      setStage(pendingNextStage);
    }
    setPendingNextStage(null);
  };

  const transitionToStage = (newStage: Stage) => {
    if (sectionBackgrounds[stage]?.pillTransition) {
      setPendingNextStage(newStage);
    } else {
      setStage(newStage);
    }
  };

  const handlePillChoice = (pill: 'red' | 'blue') => {
    if (pill === 'red') {
      transitionToStage('intro');
    } else {
      // Plava pilula - neutralni izlaz (može se implementirati kasnije)
      setStage('choice');
    }
  };

  const handleIntroComplete = () => {
    transitionToStage('evaluation');
  };

  const handleEvaluationComplete = (userAnswers: Record<string, string>) => {
    setAnswers(userAnswers);
    transitionToStage('explanation');
  };

  const handleExplanationComplete = () => {
    transitionToStage('historical');
  };

  const handleHistoricalComplete = () => {
    transitionToStage('personal-question');
  };

  const handlePersonalQuestionComplete = () => {
    transitionToStage('breaking-question');
  };

  const handleBreakingQuestionComplete = (answer: string) => {
    if (answer === 'Radije bih da ne znam') {
      // Tihi izlaz - možemo vratiti na početak ili prikazati poruku
      transitionToStage('choice');
    } else {
      transitionToStage('spasa-story');
    }
  };

  const handleSpasaStoryComplete = () => {
    transitionToStage('spasa-revelation');
  };

  const handleSpasaRevelationComplete = () => {
    transitionToStage('other-pigs');
  };

  const handleOtherPigsComplete = () => {
    transitionToStage('root-of-the-problem');
  };

  const handleRootOfTheProblemComplete = () => {
    transitionToStage('animals-treated-as-products');
  };

  const handleAnimalsTreatedAsProductsComplete = () => {
    transitionToStage('let-them-live');
  };

  const handleLetThemLiveComplete = () => {
    transitionToStage('from-the-wild');
  };

  const handleFromTheWildComplete = () => {
    transitionToStage('reproduction-control');
  };

  const handleReproductionControlComplete = () => {
    transitionToStage('vicious-cycle');
  };

  const handleViciousCycleComplete = () => {
    transitionToStage('cow-fate');
  };

  const handleCowFateComplete = () => {
    transitionToStage('animal-cost-of-living');
  };

  const handleAnimalCostOfLivingComplete = () => {
    transitionToStage('solution-use');
  };

  const handleSolutionUseComplete = () => {
    transitionToStage('solution-know');
  };

  const handleSolutionKnowComplete = (answer: string) => {
    if (answer === 'Nisam siguran' || answer === 'Ne možemo') {
      transitionToStage('vegan-diet-health');
    } else {
      transitionToStage('solution-choice');
    }
  };

  const handleVeganDietHealthComplete = (answer: string) => {
    setAnswers((prev) => ({ ...prev, 'vegan-diet-health': answer }));
    transitionToStage('solution-choice');
  };

  const handleSolutionChoiceComplete = () => {
    transitionToStage('align-behaviour');
  };

  const handleAlignBehaviourComplete = (answer: string) => {
    setAnswers((prev) => ({ ...prev, 'align-behaviour': answer }));
    transitionToStage('veganism-principle');
  };

  const handleVeganismPrincipleComplete = () => {
    transitionToStage('after-choice');
  };

  const handleAnimalExploitationComplete = () => {
    transitionToStage('moral-consistency');
  };

  const handleDomesticationComplete = () => {
    transitionToStage('moral-consistency');
  };

  const handleMoralConsistencyComplete = () => {
    transitionToStage('final-choice');
  };

  const handleFinalChoiceComplete = () => {
    transitionToStage('mirror');
  };

  const handleMirrorComplete = () => {
    transitionToStage('call-to-action');
  };

  const handleCallToActionComplete = () => {
    transitionToStage('after-choice');
  };

  const navigateToStage = (newStage: Stage) => {
    setStage(newStage);
  };

  return (
    <NavigationProvider currentStage={stage} navigateToStage={navigateToStage}>
      <PillProvider>
        <PillTransitionLayer pendingNextStage={pendingNextStage} onComplete={handleTransitionComplete} />
        <NavigationMenu />
        <main className='min-h-screen bg-black text-white overflow-hidden relative'>
          <>
            {stage === 'choice' && <ChoiceStage onPillChoice={handlePillChoice} />}
            {stage === 'intro' && <RedPillIntro onComplete={handleIntroComplete} />}
            {stage === 'evaluation' && (
              <CharacterEvaluation
                onComplete={handleEvaluationComplete}
                answers={answers}
              />
            )}
            {stage === 'explanation' && (
              <QuestionExplanation onComplete={handleExplanationComplete} />
            )}
            {stage === 'historical' && (
              <HistoricalInjustices onComplete={handleHistoricalComplete} />
            )}
            {stage === 'personal-question' && (
              <PersonalQuestion onComplete={handlePersonalQuestionComplete} />
            )}
            {stage === 'breaking-question' && (
              <BreakingQuestion onComplete={handleBreakingQuestionComplete} />
            )}
            {stage === 'spasa-story' && (
              <SpasaStory onComplete={handleSpasaStoryComplete} />
            )}
            {stage === 'spasa-revelation' && (
              <SpasaRevelation onComplete={handleSpasaRevelationComplete} />
            )}
            {stage === 'other-pigs' && (
              <OtherPigs onComplete={handleOtherPigsComplete} />
            )}
            {stage === 'facts' && <FactsNumbers onComplete={() => { }} />}
            {stage === 'root-of-the-problem' && (
              <RootOfTheProblem onComplete={handleRootOfTheProblemComplete} />
            )}
            {stage === 'animals-treated-as-products' && (
              <AnimalsTreatedAsProducts
                onComplete={handleAnimalsTreatedAsProductsComplete}
              />
            )}
            {stage === 'let-them-live' && (
              <LetThemLive onComplete={handleLetThemLiveComplete} />
            )}
            {stage === 'from-the-wild' && (
              <FromTheWild onComplete={handleFromTheWildComplete} />
            )}
            {stage === 'vicious-cycle' && (
              <ViciousCycle onComplete={handleViciousCycleComplete} />
            )}
            {stage === 'cow-fate' && (
              <CowFate onComplete={handleCowFateComplete} />
            )}
            {stage === 'animal-cost-of-living' && (
              <AnimalCostOfLiving
                onComplete={handleAnimalCostOfLivingComplete}
              />
            )}
            {stage === 'reproduction-control' && (
              <ReproductionControl
                onComplete={handleReproductionControlComplete}
              />
            )}
            {stage === 'solution-use' && (
              <SolutionUse onComplete={handleSolutionUseComplete} />
            )}
            {stage === 'solution-know' && (
              <SolutionKnow onComplete={handleSolutionKnowComplete} />
            )}
            {stage === 'vegan-diet-health' && (
              <VeganDietHealth onComplete={handleVeganDietHealthComplete} />
            )}
            {stage === 'solution-choice' && (
              <SolutionChoice onComplete={handleSolutionChoiceComplete} />
            )}
            {stage === 'align-behaviour' && (
              <AlignBehaviour onComplete={handleAlignBehaviourComplete} />
            )}
            {stage === 'veganism-principle' && (
              <VeganismPrinciple onComplete={handleVeganismPrincipleComplete} />
            )}
            {stage === 'animal-exploitation' && (
              <AnimalExploitation
                onComplete={handleAnimalExploitationComplete}
              />
            )}
            {stage === 'domestication' && (
              <DomesticationReproduction
                onComplete={handleDomesticationComplete}
              />
            )}
            {stage === 'moral-consistency' && (
              <MoralConsistency onComplete={handleMoralConsistencyComplete} />
            )}
            {stage === 'final-choice' && (
              <FinalChoice onComplete={handleFinalChoiceComplete} />
            )}
            {stage === 'mirror' && (
              <Mirror answers={answers} onComplete={handleMirrorComplete} />
            )}
            {stage === 'call-to-action' && (
              <CallToAction onComplete={handleCallToActionComplete} />
            )}
            {stage === 'after-choice' && <AfterChoice />}
          </>
        </main>
      </PillProvider>
    </NavigationProvider>
  );
}
