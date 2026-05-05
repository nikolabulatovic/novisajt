import { Stage, StageId } from '@/src/contexts/NavigationContext';

/**
 * How narrative text sits on the stage background (forks tune per stage in this file).
 * - `panel` — frosted `GlassPanel` (default when omitted).
 * - `backdrop` — gradient `TextBackdrop` + text (no glass card).
 * - `none` — plain text on the image.
 */
export type StageTextSurfaceMode = 'backdrop' | 'panel' | 'none';
export type StoryStageTextPadding = 'default' | 'intro' | 'explanation';
export type StoryStageSurfaceFrame = 'default' | 'inset-compact';

export interface StoryStageUiConfig {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  contentSpacing?: 'sm' | 'md' | 'lg';
  contentAlign?: 'left' | 'center' | 'right';
  textPadding?: StoryStageTextPadding;
  textSurfaceFrame?: StoryStageSurfaceFrame;
  backdropType?: 'linear' | 'radial';
  backdropOpacity?: number;
}

export interface StageConfig {
  backgroundImage?: string;
  opacity?: number;
  pillTransitionOverlayColor?: 'black' | 'white'; // Overlay color used during pill mask expansion into this stage
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
}

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
    textSurface: 'none',
    additionalUiConfig: {
      maxWidth: 'lg',
      contentSpacing: 'sm',
      textPadding: 'explanation',
    },
  },
  [StageId.HistoricalIntro]: {
    backgroundImage: '/images/historical-weight.png',
    opacity: 0.75,
  },
  [StageId.HistoricalSlavery]: {
    backgroundImage: '/images/robovi.jpg',
    opacity: 0.8,
  },
  [StageId.HistoricalAuthoritarianism]: {
    backgroundImage: '/images/nacizam.jpg',
    opacity: 0.8,
  },
  [StageId.PersonalQuestion]: {
    backgroundImage: '/images/covek-u-grupi.jpeg',
    opacity: 0.3,
  },
  [StageId.BreakingQuestion]: {
    backgroundImage: '/images/odluka-put.jpg',
    opacity: 0.5,
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
  },
  [StageId.RootOfTheProblem]: {
    backgroundImage: '/images/horse-stable-gray.jpg',
    opacity: 0.8,
  },
  [StageId.AnimalsTreatedAsProducts]: {
    backgroundImage: '/images/industrija-koze.png',
    opacity: 0.8,
  },
  [StageId.LetThemLive]: {
    backgroundImage: '/images/farm-animals.jpg',
    opacity: 0.8,
  },
  [StageId.AcceptingSelfOwnership]: {
    opacity: 0.55,
  },
  [StageId.FromTheWild]: {
    backgroundImage: '/images/gallus-gallus.jpg',
    opacity: 0.8,
  },
  [StageId.ViciousCycle]: {
    backgroundImage: '/images/chicks-in-bucket.png',
    opacity: 0.8,
  },
  [StageId.CowFate]: {
    backgroundImage: '/images/cow-slave.jpg',
    opacity: 0.8,
  },
  [StageId.AnimalCostOfLiving]: {
    backgroundImage: '/images/cows-transported.png',
    opacity: 0.8,
  },
  [StageId.ReproductionControl]: {
    backgroundImage: '/images/cow-silhouettes.png',
    opacity: 0.8,
  },
  [StageId.SolutionUse]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.8,
  },
  [StageId.SolutionKnow]: {
    backgroundImage: '/images/djokovic-trophy.jpg',
    opacity: 0.8,
  },
  [StageId.VeganDietHealth]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.8,
  },
  [StageId.SolutionChoice]: {
    backgroundImage: '/images/silhouette-cracked-mirror.png',
    opacity: 0.8,
  },
  [StageId.AlignBehaviour]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.8,
  },
  [StageId.VeganismPrinciple]: {
    backgroundImage: '/images/farm-animals2.jpg',
    opacity: 0.8,
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
  },
  [StageId.RecognizingInjustice]: {
    backgroundImage: '/images/jarak.jpg',
    opacity: 0.5,
  },
  [StageId.ApatheticStance]: {
    backgroundImage: '/images/izbor-da-ne-vidi.jpg',
    opacity: 0.4,
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
  },
  [StageId.NotHonest]: {
    backgroundImage: '/images/silhouette-cracked-mirror.png',
    opacity: 0.5,
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
