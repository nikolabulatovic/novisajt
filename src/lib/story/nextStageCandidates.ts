import { type Stage, StageId } from '@/src/contexts/NavigationContext';
import { stageConfig } from '@/src/lib/story/stageUiConfig';
import {
  answerStageTransitions,
  directStageTransitions,
} from '@/src/lib/story/transitions';

/**
 * Likely next stage(s) from `stage` — for one-hop background preload.
 * Direct edges return one stage; answer forks return every distinct destination.
 */
export function getNextStageCandidates(stage: Stage): Stage[] {
  if (stage === StageId.Choice) {
    return [StageId.Intro, StageId.StayComfortable];
  }
  if (stage === StageId.Evaluation) {
    return [StageId.Explanation, StageId.CharacterIncompatible];
  }

  const direct = directStageTransitions[stage];
  if (direct) return [direct];

  const nextForAnswer = answerStageTransitions[stage];
  const options = stageConfig[stage]?.answerOptions;
  if (nextForAnswer && options?.length) {
    return [...new Set(options.map((option) => nextForAnswer(option.id)))];
  }

  return [];
}
