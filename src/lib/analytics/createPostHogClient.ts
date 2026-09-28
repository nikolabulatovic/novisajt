import type { PostHog } from 'posthog-js';

import type { AnalyticsClient } from '@/src/lib/analytics/types';

/**
 * Load the recorder only after real engagement (not Choice bounce-aways).
 * Queues until {@link AnalyticsClient.notifyReady} runs from PostHog's `loaded`.
 */
export function createPostHogAnalyticsClient(
  posthog: PostHog,
): AnalyticsClient {
  let recordingRequested = false;

  function startRecordingIfReady(assumeLoaded = false) {
    if (!recordingRequested) return;
    if (!assumeLoaded && !posthog.__loaded) return;
    if (posthog.sessionRecordingStarted()) return;
    posthog.startSessionRecording();
  }

  return {
    capture(event, properties, options) {
      posthog.capture(
        event,
        properties,
        options
          ? {
              transport: options.transport,
              send_instantly: options.sendInstantly,
            }
          : undefined,
      );
    },

    register(properties) {
      posthog.register(properties);
    },

    setPersonProperties(properties, options) {
      if (options?.once) {
        posthog.people.set_once(properties);
      } else {
        posthog.people.set(properties);
      }
    },

    ensureSessionRecording() {
      recordingRequested = true;
      startRecordingIfReady();
    },

    notifyReady() {
      startRecordingIfReady(true);
    },
  };
}
