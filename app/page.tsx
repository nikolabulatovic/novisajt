'use client';

import { useState } from 'react';
import { NavigationProvider, Stage } from '@/contexts/NavigationContext';
import { TransitionProvider } from '@/contexts/TransitionContext';
import TransitionOverlay from '@/components/ui/TransitionOverlay';
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
import AnimalCostOfLiving from '@/components/AnimalCostOfLiving';
import ReproductionControl from '@/components/SpasaRevelationPart7';
import SolutionUse from '@/components/SolutionUse';
import SolutionKnow from '@/components/SolutionKnow';
import SolutionChoice from '@/components/SolutionChoice';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePillChoice = (pill: 'red' | 'blue') => {
    // ChoiceStage handles its own fade out, so we just need to wait a bit
    setTimeout(() => {
      if (pill === 'red') {
        setIsTransitioning(true);
        setTimeout(() => {
          setStage('intro');
          setIsTransitioning(false);
        }, 50);
      } else {
        // Plava pilula - neutralni izlaz (može se implementirati kasnije)
        setStage('choice');
      }
    }, 600);
  };

  const transitionToStage = (newStage: Stage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStage(newStage);
      // Small delay before fade in starts
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 400);
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
    transitionToStage('animal-cost-of-living');
  };

  const handleAnimalCostOfLivingComplete = () => {
    transitionToStage('reproduction-control');
  };

  const handleReproductionControlComplete = () => {
    transitionToStage('solution-use');
  };

  const handleSolutionUseComplete = () => {
    transitionToStage('solution-know');
  };

  const handleSolutionKnowComplete = () => {
    transitionToStage('solution-choice');
  };

  const handleSolutionChoiceComplete = () => {
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
    transitionToStage(newStage);
  };

  return (
    <NavigationProvider currentStage={stage} navigateToStage={navigateToStage}>
      <TransitionProvider>
        <NavigationMenu />
        <TransitionOverlay />
        <main className='min-h-screen bg-black text-white overflow-hidden relative'>
          {/* Fade overlay for transitions */}
          <div
            className={`absolute inset-0 bg-black z-50 pointer-events-none transition-opacity duration-[400ms] ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'
              }`}
          />

          {/* Stage content with fade in */}
          <div
            className={`transition-opacity duration-[600ms] ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}>
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
              <AnimalsTreatedAsProducts onComplete={handleAnimalsTreatedAsProductsComplete} />
            )}
            {stage === 'let-them-live' && (
              <LetThemLive onComplete={handleLetThemLiveComplete} />
            )}
            {stage === 'from-the-wild' && (
              <FromTheWild onComplete={handleFromTheWildComplete} />
            )}
            {stage === 'animal-cost-of-living' && (
              <AnimalCostOfLiving onComplete={handleAnimalCostOfLivingComplete} />
            )}
            {stage === 'reproduction-control' && (
              <ReproductionControl onComplete={handleReproductionControlComplete} />
            )}
            {stage === 'solution-use' && (
              <SolutionUse onComplete={handleSolutionUseComplete} />
            )}
            {stage === 'solution-know' && (
              <SolutionKnow onComplete={handleSolutionKnowComplete} />
            )}
            {stage === 'solution-choice' && (
              <SolutionChoice onComplete={handleSolutionChoiceComplete} />
            )}
            {stage === 'animal-exploitation' && (
              <AnimalExploitation onComplete={handleAnimalExploitationComplete} />
            )}
            {stage === 'domestication' && (
              <DomesticationReproduction onComplete={handleDomesticationComplete} />
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
          </div>
        </main>
      </TransitionProvider>
    </NavigationProvider>
  );
}
