import type { AnalyticsClient } from '@/src/lib/analytics/types';

/** Used when analytics is disabled or no backend is configured. */
export const noopAnalyticsClient: AnalyticsClient = {
  capture: () => {},
  register: () => {},
  setPersonProperties: () => {},
  ensureSessionRecording: () => {},
};
