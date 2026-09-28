/** Event / sticky / person property bag. */
export type AnalyticsProperties = Record<string, unknown>;

/** Provider-agnostic capture options (PostHog maps these; others may ignore). */
export type AnalyticsCaptureOptions = {
  /** Prefer sendBeacon — used on page unload. */
  transport?: 'sendBeacon';
  /** Flush immediately when supported by the backend. */
  sendInstantly?: boolean;
};

/**
 * Thin analytics facade. App code (e.g. {@link useTracking}) talks only to this;
 * PostHog / console / noop adapters implement it.
 */
export type AnalyticsClient = {
  capture: (
    event: string,
    properties?: AnalyticsProperties,
    options?: AnalyticsCaptureOptions,
  ) => void;
  /** Sticky super-properties on subsequent events. */
  register: (properties: AnalyticsProperties) => void;
  setPersonProperties: (
    properties: AnalyticsProperties,
    options?: { once?: boolean },
  ) => void;
  /**
   * Start (or queue) session recording after real engagement.
   * No-op for backends without recording.
   */
  ensureSessionRecording: () => void;
  /**
   * Backend finished loading — flush any queued recording start.
   * Optional; only PostHog needs this today.
   */
  notifyReady?: () => void;
};
