import { type Stage, StageId } from '@/src/contexts/NavigationContext';
import { stageConfig } from '@/src/lib/story/stageUiConfig';
import {
  answerStageTransitions,
  answerStepTransitions,
  directStageTransitions,
} from '@/src/lib/story/transitions';

/**
 * Likely next stage(s) from `stage` — for one-hop background preload.
 * Direct edges return one stage; answer forks return every distinct destination.
 * Multi-step stages collect every `{ type: 'stage' }` destination across steps
 * (intra-stage `{ type: 'step' }` advances are ignored).
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

  const nextForStep = answerStepTransitions[stage];
  const steps = stageConfig[stage]?.steps;
  if (nextForStep && steps?.length) {
    const destinations: Stage[] = [];
    for (const step of steps) {
      for (const option of step.answerOptions) {
        const destination = nextForStep(step.id, option.id);
        if (destination.type === 'stage') {
          destinations.push(destination.stage);
        }
      }
    }
    return [...new Set(destinations)];
  }

  const nextForAnswer = answerStageTransitions[stage];
  const options = stageConfig[stage]?.answerOptions;
  if (nextForAnswer && options?.length) {
    return [...new Set(options.map((option) => nextForAnswer(option.id)))];
  }

  return [];
}
