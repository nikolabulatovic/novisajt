import { usePostHog } from 'posthog-js/react';
import { Stage } from '@/contexts/NavigationContext';

export function useTracking() {
  const posthog = usePostHog();

  const trackStageViewed = (stage: Stage) => {
    posthog?.capture('stage_viewed', { stage });
  };

  const trackAnswerSelected = (stage: Stage, answer: string) => {
    posthog?.capture('answer_selected', { stage, answer });
  };

  const trackFlowCompleted = () => {
    posthog?.capture('flow_completed');
  };

  return { trackStageViewed, trackAnswerSelected, trackFlowCompleted };
}
