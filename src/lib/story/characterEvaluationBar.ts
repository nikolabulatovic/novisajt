/**
 * Threshold for continuing past {@link StageId.Evaluation}: each question score must reach at least this value (scale 0–3 in translation JSON).
 */
export const CHARACTER_EVALUATION_MIN_SCORE_PER_QUESTION = 2;

const QUESTION_IDS = [1, 2, 3] as const;

export function characterEvaluationAnswersMeetBar(
  answers: Record<string, string>,
): boolean {
  for (const id of QUESTION_IDS) {
    const raw = answers[`q${id}`];
    if (raw === undefined) return false;
    const value = Number.parseInt(raw, 10);
    if (
      Number.isNaN(value) ||
      value < CHARACTER_EVALUATION_MIN_SCORE_PER_QUESTION
    ) {
      return false;
    }
  }
  return true;
}
