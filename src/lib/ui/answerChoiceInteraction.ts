/** Timing and shell motion shared by {@link CharacterEvaluation} and {@link AnswerOptions}. */

export const ANSWER_CHOICE_NON_SELECTED_FADE_MS = 500;

/** Story chrome shell fade-out duration (Tailwind `duration-*` must stay in sync). */
export const ANSWER_CHOICE_SHELL_FADE_MS = 1000;

/** Delay after bulk transition starts before committing navigation / next step. */
export const ANSWER_CHOICE_COMMIT_AFTER_BULK_MS = ANSWER_CHOICE_SHELL_FADE_MS;

/** Evaluation-only: fade + slide down + slight shrink on exit. */
export const ANSWER_CHOICE_SHELL_TRANSITION_CLASS =
  'transition-all duration-700 ease-out';

/** Story / chrome: fade only — no vertical motion or scale (background fade handled separately). */
export const ANSWER_CHOICE_SHELL_FADE_TRANSITION_CLASS =
  'transition-opacity duration-1000 ease-out';

export interface AnswerChoiceShellState {
  isTransitioning: boolean;
  showContent: boolean;
}

/** Shell motion used only by {@link CharacterEvaluation}. */
export function answerChoiceShellClassName(
  isTransitioning: boolean,
  showContent: boolean,
): string {
  return `${ANSWER_CHOICE_SHELL_TRANSITION_CLASS} ${
    isTransitioning
      ? 'opacity-0 translate-y-8 scale-95'
      : showContent
        ? 'opacity-100 translate-y-0 scale-100'
        : 'opacity-0 translate-y-8 scale-95'
  }`;
}

/** Shell motion for story answer stages and standalone {@link AnswerOptions} — opacity only. */
export function answerChoiceShellFadeOnlyClassName(
  isTransitioning: boolean,
  showContent: boolean,
): string {
  return `${ANSWER_CHOICE_SHELL_FADE_TRANSITION_CLASS} ${
    isTransitioning ? 'opacity-0' : showContent ? 'opacity-100' : 'opacity-0'
  }`;
}

export const ANSWER_IDLE_SHELL_STATE: AnswerChoiceShellState = {
  isTransitioning: false,
  showContent: true,
};

/**
 * Same scheduling as `CharacterEvaluation` after a choice: wait for non-selected fade,
 * start bulk transition (wrapper motion + selected option fade-out), then run commit.
 */
export function scheduleAnswerChoiceExit(
  schedule: (fn: () => void, delayMs: number) => void,
  onBulkTransitionStart: () => void,
  onCommit: () => void,
): void {
  schedule(() => {
    onBulkTransitionStart();
    schedule(onCommit, ANSWER_CHOICE_COMMIT_AFTER_BULK_MS);
  }, ANSWER_CHOICE_NON_SELECTED_FADE_MS);
}
