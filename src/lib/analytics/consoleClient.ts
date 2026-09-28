import type { AnalyticsClient } from '@/src/lib/analytics/types';

const PREFIX = '[analytics]';

/** Logs every call — local testing without PostHog. */
export const consoleAnalyticsClient: AnalyticsClient = {
  capture(event, properties, options) {
    if (options) {
      console.log(PREFIX, 'capture', event, properties ?? {}, options);
    } else {
      console.log(PREFIX, 'capture', event, properties ?? {});
    }
  },

  register(properties) {
    console.log(PREFIX, 'register', properties);
  },

  setPersonProperties(properties, options) {
    console.log(
      PREFIX,
      options?.once ? 'setPersonPropertiesOnce' : 'setPersonProperties',
      properties,
    );
  },

  ensureSessionRecording() {
    console.log(PREFIX, 'ensureSessionRecording');
  },
};
