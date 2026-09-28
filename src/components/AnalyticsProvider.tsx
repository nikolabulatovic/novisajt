'use client';

import posthog from 'posthog-js';

import { type ReactNode, useEffect, useState } from 'react';

import {
  type AnalyticsClient,
  AnalyticsContextProvider,
  createPostHogAnalyticsClient,
  noopAnalyticsClient,
} from '@/src/lib/analytics';
import {
  registerCampaignFromUrl,
  registerDevSession,
  registerLocale,
} from '@/src/lib/tracking';

function isPostHogDisabled() {
  return process.env.NEXT_PUBLIC_POSTHOG_DISABLED === 'true';
}

function shouldUsePostHog() {
  return !isPostHogDisabled() && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);
}

function createAnalyticsClient(): AnalyticsClient {
  return shouldUsePostHog()
    ? createPostHogAnalyticsClient(posthog)
    : noopAnalyticsClient;
}

export default function AnalyticsProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const [client] = useState(createAnalyticsClient);

  useEffect(() => {
    if (!shouldUsePostHog()) return;

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      ui_host: 'https://eu.posthog.com',
      capture_pageview: false, // single-page app — we capture stage views manually
      capture_pageleave: true,
      disable_surveys: true, // skip surveys.js (~88K); re-enable later via set_config if needed
      // Recorder (~150–250K) stays off until engagement — see ensureSessionRecording
      disable_session_recording: true,
      session_recording: {
        maskAllInputs: false, // inputs are just answer buttons, safe to record
      },
      persistence: 'localStorage',
      loaded: () => {
        registerCampaignFromUrl(client);
        registerDevSession(client);
        client.notifyReady?.();
      },
    });
  }, [client]);

  useEffect(() => {
    if (!shouldUsePostHog()) return;
    registerLocale(client, locale);
  }, [client, locale]);

  return (
    <AnalyticsContextProvider client={client}>
      {children}
    </AnalyticsContextProvider>
  );
}
