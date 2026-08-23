import type { PostHog } from 'posthog-js';

let requested = false;

function startIfReady(
  posthog: PostHog | undefined,
  { assumeLoaded = false }: { assumeLoaded?: boolean } = {},
) {
  if (!requested || !posthog) return;
  if (!assumeLoaded && !posthog.__loaded) return;
  if (posthog.sessionRecordingStarted()) return;
  posthog.startSessionRecording();
}

/**
 * Load the recorder only after real engagement (not Choice bounce-aways).
 * Safe to call repeatedly. If init has not finished, start is deferred until
 * {@link startQueuedSessionRecording} runs from PostHog's `loaded` callback.
 */
export function ensureSessionRecording(posthog: PostHog | undefined) {
  requested = true;
  startIfReady(posthog);
}

/** Retry a queued start once `posthog.init` has finished. */
export function startQueuedSessionRecording(posthog: PostHog | undefined) {
  startIfReady(posthog, { assumeLoaded: true });
}
