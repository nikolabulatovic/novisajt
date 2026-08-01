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
  backdropFade?: number;
  /** Backdrop gradient color (`#rgb`, `#rrggbb`, or `rgb(r, g, b)`). Defaults to black. */
  backdropColor?: string;
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
  /** CSS background-position for the stage image. Defaults to `center`. */
  backgroundPosition?: string;
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

type StageBackgroundExt = 'jpg' | 'webp' | 'png';

/** Path for a stage-owned background (`/images/{stageId}.{ext}`). */
export function stageBackground(
  stage: Stage,
  ext: StageBackgroundExt = 'jpg',
): string {
  return `/images/${stage}.${ext}`;
}

export const stageConfig: Record<Stage, StageConfig> = {
  [StageId.Choice]: {
    backgroundImage: stageBackground(StageId.Choice, 'webp'),
    opacity: 0.2,
  },
  [StageId.Intro]: {
    backgroundImage: stageBackground(StageId.Intro),
    opacity: 0.2,
    showBackgroundEffects: false,
    additionalUiConfig: {
      contentSpacing: 'sm',
      textSurfaceFrame: 'inset-compact',
      textPadding: 'intro',
    },
  },
  [StageId.Evaluation]: {
    backgroundImage: stageBackground(StageId.Evaluation),
    opacity: 0.5,
    gradientOverlayClasses: [
      'absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none',
      'absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none',
    ],
  },
  [StageId.CharacterIncompatible]: {
    backgroundImage: stageBackground(StageId.CharacterIncompatible),
    nextInteraction: 'none',
    opacity: 0.6,
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.Explanation]: {
    backgroundImage: stageBackground(StageId.Explanation),
    opacity: 0.35,
    nextInteraction: 'pill',
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
    backgroundImage: stageBackground(StageId.HistoricalIntro),
    opacity: 0.75,
    body: {
      delayAfterComplete: 1000,
      textSize: 'lg',
    },
  },
  [StageId.HistoricalSlavery]: {
    backgroundImage: stageBackground(StageId.HistoricalSlavery),
    opacity: 0.6,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.35,
      backdropFade: 0.15,
    },
    body: {
      speed: 150,
      delayAfterComplete: 1000,
      textSize: 'lg',
      alignment: 'right',
    },
  },
  [StageId.HistoricalAuthoritarianism]: {
    backgroundImage: stageBackground(StageId.HistoricalAuthoritarianism),
    opacity: 0.65,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.55,
      backdropFade: 0.2,
    },
    body: {
      speed: 150,
      delayAfterComplete: 1000,
      textSize: 'lg',
      alignment: 'left',
    },
  },
  [StageId.PersonalAccountability]: {
    backgroundImage: stageBackground(StageId.PersonalAccountability),
    opacity: 0.5,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.2,
      backdropFade: 0.15,
    },
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
  [StageId.InjusticePersists]: {
    backgroundImage: stageBackground(StageId.InjusticePersists),
    opacity: 0.5,
    nextInteraction: 'none',
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.PersonalQuestion]: {
    backgroundImage: stageBackground(StageId.PersonalQuestion),
    opacity: 0.3,
  },
  [StageId.BreakingQuestion]: {
    backgroundImage: stageBackground(StageId.BreakingQuestion),
    textSurface: 'backdrop',
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
    backgroundImage: stageBackground(StageId.SpasaStory),
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.2,
      backdropFade: 0.1,
    },
  },
  [StageId.SpasaRevelation]: {
    backgroundImage: stageBackground(StageId.SpasaRevelation),
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.15,
      backdropFade: 0.1,
      backdropColor: '#AA8282',
    },
  },
  [StageId.OtherPigs]: {
    backgroundImage: stageBackground(StageId.OtherPigs),
    opacity: 0.6,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.45,
      backdropFade: 0.25,
    },
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.RootOfTheProblem]: {
    backgroundImage: stageBackground(StageId.RootOfTheProblem),
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.4,
      backdropFade: 0.1,
    },
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AnimalsTreatedAsProducts]: {
    backgroundImage: stageBackground(StageId.AnimalsTreatedAsProducts),
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.4,
      backdropFade: 0.1,
    },
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.LetThemLive]: {
    backgroundImage: stageBackground(StageId.LetThemLive),
    opacity: 0.65,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.5,
      backdropFade: 0.25,
      backdropColor: '#61635D',
    },
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
    backgroundImage: stageBackground(StageId.AcceptingSelfOwnership),
    opacity: 0.55,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.1,
      backdropFade: 0.1,
    },
    backgroundPosition: 'right',
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'ACCEPT', labelKey: 'options.accept' },
      { id: 'REJECT', labelKey: 'options.reject' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.DishonestSelfOwnership]: {
    backgroundImage: stageBackground(StageId.DishonestSelfOwnership),
    opacity: 0.5,
    nextInteraction: 'none',
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.FromTheWild]: {
    backgroundImage: stageBackground(StageId.FromTheWild),
    opacity: 0.65,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.35,
      backdropFade: 0.1,
    },
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.ReproductionControl]: {
    backgroundImage: stageBackground(StageId.ReproductionControl),
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.3,
      backdropFade: 0.1,
      backdropColor: '#263841',
    },
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.ViciousCycle]: {
    backgroundImage: stageBackground(StageId.ViciousCycle),
    opacity: 0.6,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.35,
      backdropFade: 0.1,
      backdropColor: '#655942',
    },
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.CowFate]: {
    backgroundImage: stageBackground(StageId.CowFate),
    opacity: 0.65,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.4,
      backdropFade: 0.25,
    },
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AnimalCostOfLiving]: {
    backgroundImage: stageBackground(StageId.AnimalCostOfLiving),
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.25,
      backdropFade: 0.1,
    },
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.SolutionUse]: {
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
    backgroundImage: stageBackground(StageId.SolutionKnow),
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.3,
      backdropFade: 0.25,
    },
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
    backgroundImage: stageBackground(StageId.VeganDietHealth, 'webp'),
    opacity: 0.4,
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
  [StageId.AdditionalResources]: {
    backgroundImage: stageBackground(StageId.AdditionalResources, 'webp'),
    opacity: 0.55,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'ACCEPT', labelKey: 'options.accept' },
      { id: 'REJECT', labelKey: 'options.reject' },
    ],
  },
  [StageId.SolutionChoice]: {
    backgroundImage: stageBackground(StageId.SolutionChoice),
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.35,
      backdropFade: 0.1,
    },
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
  [StageId.AddressingContradiction]: {
    backgroundImage: stageBackground(StageId.AddressingContradiction),
    opacity: 0.5,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.35,
      backdropFade: 0.1,
    },
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
    backgroundImage: stageBackground(StageId.NotHonest),
    opacity: 0.5,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.1,
      backdropFade: 0.1,
    },
    nextInteraction: 'none',
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AlignBehaviour]: {
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
    nextInteraction: 'pill',
    body: {
      speed: 120,
      delayAfterComplete: 1000,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.AfterChoice]: {
    nextInteraction: 'none',
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.StayComfortable]: {
    // Shared with Choice — first stage owns the file
    backgroundImage: stageBackground(StageId.Choice, 'webp'),
    opacity: 0.3,
  },
  [StageId.WouldYouLikeToBe]: {
    backgroundImage: stageBackground(StageId.WouldYouLikeToBe),
    opacity: 0.5,
    textSurface: 'backdrop',
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
    additionalUiConfig: {
      backdropOpacity: 0.2,
      backdropFade: 0.2,
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
    backgroundImage: stageBackground(StageId.ApatheticStance),
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
    backgroundImage: stageBackground(StageId.AlreadyVegan),
    opacity: 0.5,
  },
  [StageId.NotAcceptingHealth]: {
    opacity: 0.8,
    nextInteraction: 'none',
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.Excuse]: {
    // Shared with Explanation — first stage owns the file
    backgroundImage: stageBackground(StageId.Explanation),
    opacity: 0.4,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'NO', labelKey: 'options.no' },
      { id: 'YES', labelKey: 'options.yes' },
    ],
  },
  [StageId.DoubleStandard]: {
    // Shared with Explanation — first stage owns the file
    backgroundImage: stageBackground(StageId.Explanation),
    opacity: 0.4,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'WILL_STOP', labelKey: 'options.willStop' },
      { id: 'NOT_AN_ANIMAL', labelKey: 'options.notAnAnimal' },
      { id: 'NOT_IN_THEIR_PLACE', labelKey: 'options.notInTheirPlace' },
    ],
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.NotThreatened]: {
    nextInteraction: 'none',
    body: {
      speed: 120,
      delayAfterComplete: 800,
      textSize: 'md',
      alignment: 'center',
    },
  },
  [StageId.NotFollowingThrough]: {},
};
