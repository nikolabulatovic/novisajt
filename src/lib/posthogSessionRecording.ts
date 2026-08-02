import type { PostHog } from 'posthog-js';

let started = false;

/**
 * Load the recorder only after real engagement (not Choice bounce-aways).
 * Safe to call repeatedly.
 */
export function ensureSessionRecording(posthog: PostHog | undefined) {
  if (started || !posthog) return;
  started = true;
  posthog.startSessionRecording();
}
