import { Stage, StageId } from '@/src/contexts/NavigationContext';
import { AnswerId } from '@/src/lib/answerIds';

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
/** Body copy tone over the stage. Defaults to {@link DEFAULT_STAGE_BODY.textTone}. */
export type StoryStageTextTone = 'light' | 'dark';

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
  /** Defaults to {@link DEFAULT_STORY_UI.maxWidth}. */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  /** Defaults to {@link DEFAULT_STORY_UI.contentSpacing}. */
  contentSpacing?: 'sm' | 'md' | 'lg';
  /** Defaults to {@link DEFAULT_STORY_UI.contentAlign}. */
  contentAlign?: 'left' | 'center' | 'right';
  /** Defaults to {@link DEFAULT_STORY_UI.textPadding}. */
  textPadding?: StoryStageTextPadding;
  /** Defaults to {@link DEFAULT_STORY_UI.textSurfaceFrame}. */
  textSurfaceFrame?: StoryStageSurfaceFrame;
  backdropType?: 'linear' | 'radial';
  backdropOpacity?: number;
  backdropFade?: number;
  /** Backdrop gradient color (`#rgb`, `#rrggbb`, or `rgb(r, g, b)`). Defaults to black. */
  backdropColor?: string;
}

export interface StageBodyAnimatedText {
  /** Defaults to {@link DEFAULT_STAGE_BODY.speed}. */
  speed?: number;
  /** Defaults to {@link DEFAULT_STAGE_BODY.delayAfterComplete}. */
  delayAfterComplete?: number;
  /** Translation key for body text. Defaults to {@link DEFAULT_STAGE_BODY.textKey}. */
  textKey?: string;
  /** Defaults to {@link DEFAULT_STAGE_BODY.textSize}. */
  textSize?: 'sm' | 'md' | 'lg';
  /** Defaults to {@link DEFAULT_STAGE_BODY.alignment}. */
  alignment?: 'left' | 'center' | 'right';
  /** Defaults to {@link DEFAULT_STAGE_BODY.wordTransitionDuration}. */
  wordTransitionDuration?: number;
  /** Defaults to {@link DEFAULT_STAGE_BODY.textTone}. */
  textTone?: StoryStageTextTone;
}

/**
 * Calibrated body animation defaults — omit matching fields in `stageConfig.body`.
 * Applied by {@link StoryStageChrome} via `??`.
 */
export const DEFAULT_STAGE_BODY = {
  speed: 120,
  delayAfterComplete: 1000,
  textKey: 'text',
  textSize: 'md' as const,
  alignment: 'center' as const,
  wordTransitionDuration: 3000,
  textTone: 'light' as const,
};

/**
 * Calibrated StoryStage layout defaults — omit matching fields in `additionalUiConfig`.
 * Applied by {@link StoryStageChrome} via `??`.
 */
export const DEFAULT_STORY_UI = {
  maxWidth: 'md' as const,
  contentSpacing: 'lg' as const,
  contentAlign: 'center' as const,
  textPadding: 'default' as const,
  textSurfaceFrame: 'default' as const,
};

/** Top-level stage shell defaults applied by {@link StoryStageChrome}. */
export const DEFAULT_STAGE_SHELL = {
  opacity: 0.8,
  backgroundPosition: 'center',
  showBackgroundEffects: false,
  /** Under the dimmed stage image: `black` darkens, `white` lightens. */
  backgroundWash: 'black' as const,
};

export interface StageAnswerOptionConfig {
  id: string;
  labelKey: string;
}

interface BaseStageConfig {
  backgroundImage?: string;
  /** Defaults to {@link DEFAULT_STAGE_SHELL.opacity}. */
  opacity?: number;
  /**
   * Color revealed when the background image is dimmed via `opacity`.
   * Defaults to {@link DEFAULT_STAGE_SHELL.backgroundWash} (`black`).
   * Use `white` for a light wash (e.g. RighteousChoice).
   */
  backgroundWash?: 'black' | 'white';
  /** Defaults to {@link DEFAULT_STAGE_SHELL.backgroundPosition}. */
  backgroundPosition?: string;
  /** Tablet (md–lg): nudge image horizontally, e.g. `44% center`. */
  backgroundPositionMd?: string;
  /** Mobile (< md): nudge image horizontally, e.g. `38% center`. */
  backgroundPositionSm?: string;
  gradientOverlayClasses?: string[]; // Extra gradient overlay divs to replicate in PillTransitionLayer so transition end matches page start
  /**
   * Text chrome for this stage. Defaults to `panel` (frosted glass) when omitted.
   * `backdrop` = gradient vignette; `none` = raw text on the image.
   */
  textSurface?: StageTextSurfaceMode;
  /** Used when `textSurface` is `panel`. Defaults to `dark`. */
  glassVariant?: 'dark' | 'light';
  /** Defaults to {@link DEFAULT_STAGE_SHELL.showBackgroundEffects}. */
  showBackgroundEffects?: boolean;
  /**
   * Overlay color during pill mask expansion *into* this stage.
   * Defaults to `black` in {@link PillTransitionLayer}.
   */
  pillTransitionOverlayColor?: 'black' | 'white';
  /** Layout overrides only — defaults live in {@link DEFAULT_STORY_UI}. */
  additionalUiConfig?: StoryStageUiConfig;
  /** When set, StoryStage renders two beats + advance + deferred footer; `children` are ignored. */
  narrativeTwoBeat?: NarrativeTwoBeatConfig;
  /** Body animation overrides only — defaults live in {@link DEFAULT_STAGE_BODY}. */
  body?: StageBodyAnimatedText;
  /** Next interaction translation namespace. */
  translationNamespace?: string;
}

type StageInteractionConfig =
  | {
      nextInteraction?: 'none';
      answerOptions?: never;
    }
  | {
      nextInteraction: 'pill';
      answerOptions?: never;
    }
  | {
      nextInteraction: 'answer';
      /** Required when `nextInteraction` is `answer`. */
      answerOptions: StageAnswerOptionConfig[];
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
    nextInteraction: 'answer',
    answerOptions: [
      { id: AnswerId.CHOOSE_GENDER, labelKey: 'options.chooseGender' },
      { id: AnswerId.SKIP_GENDER, labelKey: 'options.ratherNot' },
    ],
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
    body: {
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
      textSize: 'lg',
      alignment: 'right',
    },
  },
  [StageId.HistoricalAuthoritarianism]: {
    backgroundImage: stageBackground(StageId.HistoricalAuthoritarianism),
    opacity: 0.65,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.35,
      backdropFade: 0.2,
    },
    body: {
      speed: 150,
      textSize: 'lg',
      alignment: 'left',
    },
  },
  [StageId.PersonalAccountability]: {
    backgroundImage: stageBackground(StageId.PersonalAccountability),
    backgroundPositionMd: '54% center',
    backgroundPositionSm: '58% center',
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
  },
  [StageId.InjusticePersists]: {
    backgroundImage: stageBackground(StageId.InjusticePersists),
    backgroundPositionMd: '53% center',
    backgroundPositionSm: '56% center',
    opacity: 0.5,
    nextInteraction: 'none',
    body: {
      delayAfterComplete: 800,
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
    backgroundPositionMd: '42% center',
    backgroundPositionSm: '34% center',
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
  },
  [StageId.RootOfTheProblem]: {
    backgroundImage: stageBackground(StageId.RootOfTheProblem),
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.4,
      backdropFade: 0.1,
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
  },
  [StageId.LetThemLive]: {
    backgroundImage: stageBackground(StageId.LetThemLive),
    backgroundPositionMd: '60% center',
    backgroundPositionSm: '82% center',
    opacity: 0.65,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.3,
      backdropFade: 0.25,
      backdropColor: '#61635D',
    },
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'ACCEPT', labelKey: 'options.accept' },
      { id: 'REJECT', labelKey: 'options.reject' },
    ],
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
      delayAfterComplete: 800,
    },
  },
  [StageId.DishonestSelfOwnership]: {
    backgroundImage: stageBackground(StageId.DishonestSelfOwnership),
    opacity: 0.5,
    nextInteraction: 'none',
    body: {
      delayAfterComplete: 800,
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
  },
  [StageId.CowFate]: {
    backgroundImage: stageBackground(StageId.CowFate),
    opacity: 0.65,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.4,
      backdropFade: 0.25,
    },
  },
  [StageId.AnimalCostOfLiving]: {
    backgroundImage: stageBackground(StageId.AnimalCostOfLiving),
    backgroundPositionMd: '42% center',
    backgroundPositionSm: '10% center',
    opacity: 0.7,
    textSurface: 'backdrop',
    additionalUiConfig: {
      backdropOpacity: 0.25,
      backdropFade: 0.1,
    },
  },
  [StageId.SolutionUse]: {
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'YES', labelKey: 'options.yes' },
      { id: 'NO', labelKey: 'options.no' },
    ],
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
  },
  [StageId.VeganDietHealth]: {
    backgroundImage: stageBackground(StageId.VeganDietHealth, 'webp'),
    opacity: 0.4,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'ACCEPT', labelKey: 'options.accept' },
      { id: 'REJECT', labelKey: 'options.reject' },
    ],
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
      delayAfterComplete: 800,
    },
  },
  [StageId.AlignBehaviour]: {
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'YES', labelKey: 'options.yes' },
      { id: 'NO', labelKey: 'options.no' },
    ],
  },
  [StageId.VeganismPrinciple]: {
    nextInteraction: 'pill',
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
    additionalUiConfig: {
      backdropOpacity: 0.2,
      backdropFade: 0.2,
    },
  },
  [StageId.RecognizingInjustice]: {
    opacity: 0.5,
    nextInteraction: 'none',
    body: {
      delayAfterComplete: 800,
    },
  },
  [StageId.ApatheticStance]: {
    backgroundImage: stageBackground(StageId.ApatheticStance),
    opacity: 0.4,
    nextInteraction: 'none',
    body: {
      delayAfterComplete: 800,
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
      delayAfterComplete: 800,
    },
  },
  [StageId.Excuse]: {
    // Shared with Explanation — first stage owns the file
    backgroundImage: stageBackground(StageId.Excuse),
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
      { id: 'NOT_RESPONSIBLE', labelKey: 'options.notResponsible' },
      { id: 'NOT_IN_THEIR_PLACE', labelKey: 'options.notInTheirPlace' },
    ],
    body: {
      delayAfterComplete: 800,
    },
  },
  [StageId.NotThreatened]: {
    backgroundImage: stageBackground(StageId.NotThreatened),
    opacity: 0.5,
    nextInteraction: 'none',
    body: {
      delayAfterComplete: 800,
    },
  },
  [StageId.YouAreResponsible]: {
    backgroundImage: stageBackground(StageId.YouAreResponsible),
    opacity: 0.5,
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'ACCEPT', labelKey: 'options.accept' },
      { id: 'REJECT', labelKey: 'options.reject' },
    ],
    body: {
      delayAfterComplete: 800,
    },
  },
  [StageId.ActResponsibly]: {
    nextInteraction: 'answer',
    answerOptions: [
      { id: 'YES', labelKey: 'options.yes' },
      { id: 'NO', labelKey: 'options.no' },
    ],
    body: {
      delayAfterComplete: 800,
    },
  },
  [StageId.NotWhoYouThink]: {
    nextInteraction: 'none',
    body: {
      delayAfterComplete: 800,
    },
  },
  [StageId.AvoidingResponsibility]: {
    nextInteraction: 'none',
    body: {
      delayAfterComplete: 800,
    },
  },
  [StageId.OkWithInjustice]: {
    nextInteraction: 'none',
    body: {
      delayAfterComplete: 800,
    },
  },
  [StageId.RighteousChoice]: {
    // Shared with AlreadyVegan — former animals-picturesque.jpg
    backgroundImage: stageBackground(StageId.RighteousChoice),
    opacity: 0.5,
    backgroundWash: 'white',
    textSurface: 'backdrop',
    nextInteraction: 'pill',
    pillTransitionOverlayColor: 'white',
    body: {
      delayAfterComplete: 800,
      textTone: 'dark',
    },
    additionalUiConfig: {
      maxWidth: '3xl',
      backdropColor: '#ffffff',
      backdropOpacity: 0.15,
      backdropFade: 0.1,
    },
  },
  [StageId.CourageousChoice]: {
    // TODO: add public/images/courageous-choice.jpg
    backgroundImage: stageBackground(StageId.CourageousChoice),
    opacity: 0.85,
    textSurface: 'backdrop',
    nextInteraction: 'pill',
    pillTransitionOverlayColor: 'white',
    body: {
      delayAfterComplete: 800,
    },
    additionalUiConfig: {
      maxWidth: '3xl',
      backdropColor: '#ffffff',
      backdropOpacity: 0.1,
      backdropFade: 0.2,
    },
  },
  [StageId.JoinUs]: {
    backgroundImage: stageBackground(StageId.JoinUs),
    opacity: 0.55,
    nextInteraction: 'none',
    pillTransitionOverlayColor: 'white',
    additionalUiConfig: {
      maxWidth: '3xl',
    },
  },
};
