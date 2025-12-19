'use client';

import { useState } from 'react';
import ChoiceStage from '@/components/ChoiceStage';
import CharacterEvaluation from '@/components/CharacterEvaluation';
import RedPillIntro from '@/components/RedPillIntro';
import QuestionExplanation from '@/components/QuestionExplanation';
import HistoricalInjustices from '@/components/HistoricalInjustices';
import MilgramExperiment from '@/components/MilgramExperiment';
import PersonalQuestion from '@/components/PersonalQuestion';
import BreakingQuestion from '@/components/BreakingQuestion';
import AnimalsIntroduction from '@/components/AnimalsIntroduction';
import FactsNumbers from '@/components/FactsNumbers';
import DomesticationReproduction from '@/components/DomesticationReproduction';
import MoralConsistency from '@/components/MoralConsistency';
import FinalChoice from '@/components/FinalChoice';
import Mirror from '@/components/Mirror';
import CallToAction from '@/components/CallToAction';
import AfterChoice from '@/components/AfterChoice';

type Stage =
  | 'choice'
  | 'intro'
  | 'evaluation'
  | 'explanation'
  | 'historical'
  | 'personal-question'
  | 'breaking-question'
  | 'animals-intro'
  | 'facts'
  | 'domestication'
  | 'moral-consistency'
  | 'final-choice'
  | 'mirror'
  | 'call-to-action'
  | 'after-choice';

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
    if (answer === 'Ne') {
      // Tihi izlaz - možemo vratiti na početak ili prikazati poruku
      transitionToStage('choice');
    } else {
      transitionToStage('animals-intro');
    }
  };

  const handleAnimalsIntroComplete = () => {
    transitionToStage('facts');
  };

  const handleFactsComplete = () => {
    transitionToStage('domestication');
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

  return (
    <main className='min-h-screen bg-black text-white overflow-hidden relative'>
      {/* Fade overlay for transitions */}
      <div
        className={`absolute inset-0 bg-black z-50 pointer-events-none transition-opacity duration-[400ms] ease-in-out ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Stage content with fade in */}
      <div
        className={`transition-opacity duration-[600ms] ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
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
        {stage === 'animals-intro' && (
          <AnimalsIntroduction onComplete={handleAnimalsIntroComplete} />
        )}
        {stage === 'facts' && <FactsNumbers onComplete={handleFactsComplete} />}
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
  );
}
