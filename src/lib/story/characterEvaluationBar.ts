/**
 * Answers that clear {@link StageId.Evaluation}: aware (`admit`) or ready to change (`act`).
 * Order of options can differ per question (e.g. Q1 lists `act` before `admit`).
 */
export const PASSING_EVALUATION_ANSWERS = new Set(['admit', 'act']);

const QUESTION_IDS = [1, 2, 3] as const;

export function characterEvaluationAnswersMeetBar(
  answers: Record<string, string>,
): boolean {
  for (const id of QUESTION_IDS) {
    const raw = answers[`q${id}`];
    if (raw === undefined || !PASSING_EVALUATION_ANSWERS.has(raw)) {
      return false;
    }
  }
  return true;
}
