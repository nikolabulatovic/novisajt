'use client';

import { useEffect, useState } from 'react';

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
import { NavigationProvider, Stage } from '@/contexts/NavigationContext';
import { PillProvider } from '@/contexts/PillContext';
import { useTracking } from '@/hooks/useTracking';

const answerAliases = {
  'personal-question': {
    unknown: ['Ne znam', "I don't know"],
  },
  'da-li-bi-voleo': {
    notImportant: ['Nije bitno', 'Nije mi bitno', "It doesn't matter"],
  },
  'breaking-question': {
    avoidKnowing: ['Radije bih da ne znam', "I'd rather not know"],
  },
  'let-them-live': {
    reject: ['Ne prihvatam', 'I do not accept'],
  },
  'solution-use': {
    no: ['Ne', 'No'],
  },
  'vec-veganski': {
    ready: ['Spreman sam', 'I am ready'],
  },
  'solution-know': {
    unsure: ['Nisam siguran', 'Not sure'],
    impossible: ['Ne možemo', "We can't"],
  },
  'vegan-diet-health': {
    notConvinced: ['Nije me ubedilo', "I'm not convinced"],
  },
  'solution-choice': {
    disagree: ['Ne slažem se', 'I disagree'],
  },
  'kontradiktornost-je': {
    notTrue: ['Nije tačno', "That's not true"],
  },
  'align-behaviour': {
    no: ['Ne', 'No'],
  },
  'vracanje-na-odgovore': {
    no: ['Ne', 'No'],
  },
  'ponovo-na-odgovore': {
    no: ['Ne', 'No'],
  },
} as const;

const normalizeAnswer = (
  stage: keyof typeof answerAliases,
  answer: string,
  key: string,
) => {
  const options = (answerAliases[stage] as Record<string, readonly string[]>)[
    key
  ];
  return options?.includes(answer) ?? false;
};

export default function Home() {
  const [stage, setStage] = useState<Stage>('choice');
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

  const transitionToStage = (newStage: Stage) => {
    if (sectionBackgrounds[stage]?.pillTransition) {
      setPendingNextStage(newStage);
    } else {
      setStage(newStage);
    }
  };

  const handlePillChoice = (pill: 'red' | 'blue') => {
    trackAnswerSelected('choice', pill);
    if (pill === 'red') {
      transitionToStage('intro');
    } else {
      setStageAfterFade('ostani-komforan');
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

  const handleIntroComplete = () => {
    transitionToStage('evaluation');
  };

  const handleEvaluationComplete = (userAnswers: Record<string, string>) => {
    setAnswers(userAnswers);
    Object.entries(userAnswers).forEach(([question, answer]) => {
      trackAnswerSelected('evaluation', `${question}:${answer}`);
    });
    transitionToStage('explanation');
  };

  const handleExplanationComplete = () => {
    transitionToStage('historical');
  };

  const handleHistoricalComplete = () => {
    transitionToStage('personal-question');
  };

  const handlePersonalQuestionComplete = (answer: string) => {
    trackAnswerSelected('personal-question', answer);
    if (normalizeAnswer('personal-question', answer, 'unknown')) {
      transitionToStage('da-li-bi-voleo');
    } else {
      transitionToStage('breaking-question');
    }
  };

  const handleDaLiBiVoleoComplete = (answer: string) => {
    trackAnswerSelected('da-li-bi-voleo', answer);
    if (normalizeAnswer('da-li-bi-voleo', answer, 'notImportant')) {
      transitionToStage('prepoznavanje-nepravde');
    } else {
      transitionToStage('breaking-question');
    }
  };

  const handleBreakingQuestionComplete = (answer: string) => {
    trackAnswerSelected('breaking-question', answer);
    if (normalizeAnswer('breaking-question', answer, 'avoidKnowing')) {
      transitionToStage('apatican-stav');
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

  const handleLetThemLiveComplete = (answer: string) => {
    if (normalizeAnswer('let-them-live', answer, 'reject')) {
      transitionToStage('accepting-self-ownership');
    } else {
      transitionToStage('from-the-wild');
    }
  };

  const handleAcceptingSelfOwnershipComplete = () => {
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

  const handleSolutionUseComplete = (answer: string) => {
    trackAnswerSelected('solution-use', answer);
    if (normalizeAnswer('solution-use', answer, 'no')) {
      transitionToStage('vec-veganski');
    } else {
      transitionToStage('solution-know');
    }
  };

  const handleVecVeganskiComplete = (answer: string) => {
    trackAnswerSelected('vec-veganski', answer);
    if (normalizeAnswer('vec-veganski', answer, 'ready')) {
      trackFlowCompleted();
      transitionToStage('after-choice');
    } else {
      transitionToStage('solution-know');
    }
  };

  const handleSolutionKnowComplete = (answer: string) => {
    trackAnswerSelected('solution-know', answer);
    if (
      normalizeAnswer('solution-know', answer, 'unsure') ||
      normalizeAnswer('solution-know', answer, 'impossible')
    ) {
      transitionToStage('vegan-diet-health');
    } else {
      transitionToStage('solution-choice');
    }
  };

  const handleVeganDietHealthComplete = (answer: string) => {
    setAnswers((prev) => ({ ...prev, 'vegan-diet-health': answer }));
    trackAnswerSelected('vegan-diet-health', answer);
    if (normalizeAnswer('vegan-diet-health', answer, 'notConvinced')) {
      transitionToStage('nije-ubedilo-resursi');
    } else {
      transitionToStage('solution-choice');
    }
  };

  const handleNijeUbediloResursiComplete = () => {
    transitionToStage('solution-choice');
  };

  const handleSolutionChoiceComplete = (answer: string) => {
    trackAnswerSelected('solution-choice', answer);
    if (normalizeAnswer('solution-choice', answer, 'disagree')) {
      transitionToStage('kontradiktornost-je');
    } else {
      transitionToStage('align-behaviour');
    }
  };

  const handleKontradiktornostJeComplete = (answer: string) => {
    trackAnswerSelected('kontradiktornost-je', answer);
    if (normalizeAnswer('kontradiktornost-je', answer, 'notTrue')) {
      transitionToStage('nisi-iskren');
    } else {
      transitionToStage('align-behaviour');
    }
  };

  const handleAlignBehaviourComplete = (answer: string) => {
    setAnswers((prev) => ({ ...prev, 'align-behaviour': answer }));
    trackAnswerSelected('align-behaviour', answer);
    if (normalizeAnswer('align-behaviour', answer, 'no')) {
      transitionToStage('vracanje-na-odgovore');
    } else {
      transitionToStage('veganism-principle');
    }
  };

  const handleVracanjeNaOdgovoreComplete = (answer: string) => {
    trackAnswerSelected('vracanje-na-odgovore', answer);
    if (normalizeAnswer('vracanje-na-odgovore', answer, 'no')) {
      transitionToStage('ponovo-na-odgovore');
    } else {
      transitionToStage('veganism-principle');
    }
  };

  const handlePonovoNaOdgovoreComplete = (answer: string) => {
    trackAnswerSelected('ponovo-na-odgovore', answer);
    if (normalizeAnswer('ponovo-na-odgovore', answer, 'no')) {
      transitionToStage('ne-drzis-se');
    } else {
      transitionToStage('veganism-principle');
    }
  };

  const handleVeganismPrincipleComplete = () => {
    trackFlowCompleted();
    transitionToStage('after-choice');
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
            {stage === 'choice' && (
              <ChoiceStage onPillChoice={handlePillChoice} />
            )}
            {stage === 'intro' && (
              <RedPillIntro onComplete={handleIntroComplete} />
            )}
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
            {stage === 'da-li-bi-voleo' && (
              <WouldYouLikeToBe onComplete={handleDaLiBiVoleoComplete} />
            )}
            {stage === 'prepoznavanje-nepravde' && <RecognizingInjustice />}
            {stage === 'breaking-question' && (
              <BreakingQuestion onComplete={handleBreakingQuestionComplete} />
            )}
            {stage === 'ostani-komforan' && <StayComfortable />}
            {stage === 'apatican-stav' && <ApatheticStance />}
            {stage === 'spasa-story' && (
              <SpasaStory onComplete={handleSpasaStoryComplete} />
            )}
            {stage === 'spasa-revelation' && (
              <SpasaRevelation onComplete={handleSpasaRevelationComplete} />
            )}
            {stage === 'other-pigs' && (
              <OtherPigs onComplete={handleOtherPigsComplete} />
            )}
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
            {stage === 'accepting-self-ownership' && (
              <AcceptingSelfOwnership
                onComplete={handleAcceptingSelfOwnershipComplete}
              />
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
            {stage === 'vec-veganski' && (
              <AlreadyVegan onComplete={handleVecVeganskiComplete} />
            )}
            {stage === 'solution-know' && (
              <SolutionKnow onComplete={handleSolutionKnowComplete} />
            )}
            {stage === 'vegan-diet-health' && (
              <VeganDietHealth onComplete={handleVeganDietHealthComplete} />
            )}
            {stage === 'nije-ubedilo-resursi' && (
              <AdditionalResources
                onComplete={handleNijeUbediloResursiComplete}
              />
            )}
            {stage === 'solution-choice' && (
              <SolutionChoice onComplete={handleSolutionChoiceComplete} />
            )}
            {stage === 'kontradiktornost-je' && (
              <AddressingContradiction
                onComplete={handleKontradiktornostJeComplete}
              />
            )}
            {stage === 'nisi-iskren' && <NotHonest />}
            {stage === 'align-behaviour' && (
              <AlignBehaviour onComplete={handleAlignBehaviourComplete} />
            )}
            {stage === 'vracanje-na-odgovore' && (
              <BackToAnswers
                onComplete={handleVracanjeNaOdgovoreComplete}
                answers={answers}
              />
            )}
            {stage === 'ponovo-na-odgovore' && (
              <BackToAnswersAgain
                onComplete={handlePonovoNaOdgovoreComplete}
                answers={answers}
              />
            )}
            {stage === 'ne-drzis-se' && <NotFollowingThrough />}
            {stage === 'veganism-principle' && (
              <VeganismPrinciple onComplete={handleVeganismPrincipleComplete} />
            )}
            {stage === 'after-choice' && <AfterChoice />}
          </>
        </main>
      </PillProvider>
    </NavigationProvider>
  );
}
