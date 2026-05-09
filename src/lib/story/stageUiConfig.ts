import { Stage, StageId } from '@/src/contexts/NavigationContext';

export const NEXT_LABEL = 'next';

/**
 * How narrative text sits on the stage background (forks tune per stage in this file).
 * - `panel` — frosted `GlassPanel` (default when omitted).
 * - `backdrop` — gradient `TextBackdrop` + text (no glass card).
 * - `none` — plain text on the image.
 */
export type StageTextSurfaceMode = 'backdrop' | 'panel' | 'none';
export type StoryStageTextPadding = 'default' | 'intro' | 'explanation';
export type StoryStageSurfaceFrame = 'default' | 'inset-compact';

/** Two narrative beats on one stage: same background; mid-stage advance; final footer after beat 2 animation. */
export interface NarrativeTwoBeatConfig {
  /** next-intl namespace (e.g. AcceptingSelfOwnership). */
  translationNamespace: string;
  /** Raw JSON keys whose values are `string[]` for AnimatedText. */
  beat1TextKey: string;
  beat2TextKey: string;
  /** Label key for the single advance control (same namespace). */
  advanceLabelKey: string;
}

export interface StoryStageUiConfig {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  contentSpacing?: 'sm' | 'md' | 'lg';
  contentAlign?: 'left' | 'center' | 'right';
  textPadding?: StoryStageTextPadding;
  textSurfaceFrame?: StoryStageSurfaceFrame;
  backdropType?: 'linear' | 'radial';
  backdropOpacity?: number;
}

export interface StageBodyAnimatedText {
  /** Defaults to `120` (most common project value). */
  speed?: number;
  /** Defaults to `1000` (most common project value). */
  delayAfterComplete?: number;
  /** Translation key for body text (defaults to `text`). */
  textKey?: string;
  /** Defaults to `md` (most common project value). */
  textSize?: 'sm' | 'md' | 'lg';
  /** Defaults to `center` (most common project value). */
  alignment?: 'left' | 'center' | 'right';
  wordTransitionDuration?: number;
}

export interface StageAnswerOptionConfig {
  id: string;
  labelKey: string;
}

interface BaseStageConfig {
  backgroundImage?: string;
  opacity?: number;
  gradientOverlayClasses?: string[]; // Extra gradient overlay divs to replicate in PillTransitionLayer so transition end matches page start
  /**
   * Text chrome for this stage. Defaults to `panel` (frosted glass) when omitted.
   * `backdrop` = gradient vignette; `none` = raw text on the image.
   */
  textSurface?: StageTextSurfaceMode;
  /** Used when `textSurface` is `panel`. Defaults to `dark`. */
  glassVariant?: 'dark' | 'light';
  /** Whether to show background effects on the stage. Defaults to `false` when omitted. */
  showBackgroundEffects?: boolean;
  /** Optional StoryStage layout defaults for this stage. */
  additionalUiConfig?: StoryStageUiConfig;
  /** When set, StoryStage renders two beats + advance + deferred footer; `children` are ignored. */
  narrativeTwoBeat?: NarrativeTwoBeatConfig;
  /** Optional body rendered by `StoryStage` when no children are passed. */
  body?: StageBodyAnimatedText;
  /** Next interaction translation namespace. */
  translationNamespace?: string;
}

type StageInteractionConfig =
  | {
      nextInteraction?: 'none';
      answerOptions?: never;
      pillTransitionOverlayColor?: never;
    }
  | {
      nextInteraction: 'pill';
      answerOptions?: never;
      /** Overlay color used during pill mask expansion into this stage. */
      pillTransitionOverlayColor?: 'black' | 'white';
    }
  | {
      nextInteraction: 'answer';
      /** Required when `nextInteraction` is `answer`. */
      answerOptions: StageAnswerOptionConfig[];
      pillTransitionOverlayColor?: never;
    };

export type StageConfig = BaseStageConfig & StageInteractionConfig;

export const stageConfig: Record<Stage, StageConfig> = {
  [StageId.Choice]: {
    backgroundImage: '/images/holding-out-hands.png',
    opacity: 0.2,
  },
  [StageId.Intro]: {
    backgroundImage: '/images/intro-reflection.jpeg',
    opacity: 0.2,
    showBackgroundEffects: false,
    additionalUiConfig: {
      contentSpacing: 'sm',
      textSurfaceFrame: 'inset-compact',
      textPadding: 'intro',
    },
  },
  [StageId.Evaluation]: {
    backgroundImage: '/images/character-introspection.jpeg',
    opacity: 0.5,
    gradientOverlayClasses: [
      'absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none',
      'absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none',
    ],
  },
  [StageId.Explanation]: {
    backgroundImage: '/images/ogledalo.png',
    opacity: 0.35,
    nextInteraction: 'pill',
    textSurface: 'none',
    additionalUiConfig: {
      maxWidth: 'lg',
      contentSpacing: 'sm',
      textPadding: 'explanation',
    },
    body: {
      speed: 100,
      delayAfterComplete: 1200,
      textSize: 'lg',
      wordTransitionDuration: 5000,
    },
  },
  [StageId.HistoricalIntro]: {
    backgroundImage: '/images/historical-weight.png',
    opacity: 0.75,
    body: {
      delayAfterComplete: 1000,
      textSize: 'lg',
    },
  },
  [StageId.HistoricalSlavery]: {
    backgroundImage: '/images/robovi.jpg',
    opacity: 0.8,
    body: {
      speed: 150,
      delayAfterComplete: 1000,
      textSize: 'lg',
      alignment: 'right',
    },
  },
  [StageId.HistoricalAuthoritarianism]: {
    backgroundImage: '/images/nacizam.jpg',
    opacity: 0.8,
    body: {
      speed: 150,
      delayAfterComplete: 1000,
      textSize: 'lg',
      alignment: 'left',
    },
  },
  [StageId.PersonalQuestion]: {
    backgroundImage: '/images/covek-u-grupi.jpeg',
    opacity: 0.3,
  },
  [StageId.BreakingQuestion]: {
    backgroundImage: '/images/odluka-put.jpg',
    opacity: 0.5,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'ACCEPT', labelKey: 'options.accept.label' },
      { id: 'REJECT', labelKey: 'options.reject.label' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.SpasaStory]: {
    backgroundImage: '/images/spasa-rescue-hope.png',
    opacity: 0.8,
  },
  [StageId.SpasaRevelation]: {
    backgroundImage: '/images/spasa-prasa.jpg',
    opacity: 0.8,
  },
  [StageId.OtherPigs]: {
    backgroundImage: '/images/enslaved-pigs.jpg',
    opacity: 0.8,
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.RootOfTheProblem]: {
    backgroundImage: '/images/horse-stable-gray.jpg',
    opacity: 0.8,
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AnimalsTreatedAsProducts]: {
    backgroundImage: '/images/industrija-koze.png',
    opacity: 0.8,
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.LetThemLive]: {
    backgroundImage: '/images/farm-animals.jpg',
    opacity: 0.8,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'ACCEPT', labelKey: 'options.accept' },
      { id: 'REJECT', labelKey: 'options.reject' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AcceptingSelfOwnership]: {
    backgroundImage: '/images/mountain-sheep.png',
    opacity: 0.55,
    narrativeTwoBeat: {
      translationNamespace: 'AcceptingSelfOwnership',
      beat1TextKey: 'beat1',
      beat2TextKey: 'beat2',
      advanceLabelKey: 'advance',
    },
  },
  [StageId.FromTheWild]: {
    backgroundImage: '/images/gallus-gallus.jpg',
    opacity: 0.8,
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.ViciousCycle]: {
    backgroundImage: '/images/chicks-in-bucket.png',
    opacity: 0.8,
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.CowFate]: {
    backgroundImage: '/images/cow-slave.jpg',
    opacity: 0.8,
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AnimalCostOfLiving]: {
    backgroundImage: '/images/cows-transported.png',
    opacity: 0.8,
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.ReproductionControl]: {
    backgroundImage: '/images/cow-silhouettes.png',
    opacity: 0.8,
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.SolutionUse]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.8,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'YES', labelKey: 'options.yes' },
      { id: 'NO', labelKey: 'options.no' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.SolutionKnow]: {
    backgroundImage: '/images/djokovic-trophy.jpg',
    opacity: 0.8,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'YES', labelKey: 'options.yes' },
      { id: 'DONT_KNOW', labelKey: 'options.dontKnow' },
      { id: 'NO', labelKey: 'options.no' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.VeganDietHealth]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.8,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'ACCEPT', labelKey: 'options.accept' },
      { id: 'REJECT', labelKey: 'options.reject' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.SolutionChoice]: {
    backgroundImage: '/images/silhouette-mirror.png',
    opacity: 0.8,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'AGREE', labelKey: 'options.agree' },
      { id: 'DISAGREE', labelKey: 'options.disagree' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AlignBehaviour]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.8,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'YES', labelKey: 'options.yes' },
      { id: 'NO', labelKey: 'options.no' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.VeganismPrinciple]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.8,
    nextInteraction: 'pill',
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AfterChoice]: {
    backgroundImage: '/images/animals-picturesque.png',
    opacity: 0.8,
    glassVariant: 'light',
  },
  [StageId.StayComfortable]: {
    backgroundImage: '/images/holding-out-hands.png',
    opacity: 0.3,
  },
  [StageId.WouldYouLikeToBe]: {
    backgroundImage: '/images/justitia-gray.png',
    opacity: 0.5,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'AGREE', labelKey: 'options.agree.label' },
      { id: 'DISAGREE', labelKey: 'options.disagree.label' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.RecognizingInjustice]: {
    opacity: 0.5,
    nextInteraction: 'none',
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.ApatheticStance]: {
    backgroundImage: '/images/izbor-da-ne-vidi.jpg',
    opacity: 0.4,
    nextInteraction: 'none',
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AlreadyVegan]: {
    backgroundImage: '/images/animals-picturesque.png',
    opacity: 0.5,
  },
  [StageId.AdditionalResources]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.8,
  },
  [StageId.AddressingContradiction]: {
    backgroundImage: '/images/silhouette-cracked-mirror.png',
    opacity: 0.6,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'AGREE', labelKey: 'options.agree' },
      { id: 'DISAGREE', labelKey: 'options.disagree' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.NotHonest]: {
    backgroundImage: '/images/silhouette-broken-mirror.png',
    opacity: 0.5,
    nextInteraction: 'none',
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.BackToAnswers]: {
    backgroundImage: '/images/ogledalo.png',
    opacity: 0.4,
  },
  [StageId.BackToAnswersAgain]: {
    backgroundImage: '/images/ogledalo.png',
    opacity: 0.4,
  },
  [StageId.NotFollowingThrough]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.4,
  },
};
