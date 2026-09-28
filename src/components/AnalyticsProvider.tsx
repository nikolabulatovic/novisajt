'use client';

import posthog from 'posthog-js';

import { type ReactNode, useEffect, useState } from 'react';

import {
  type AnalyticsClient,
  AnalyticsContextProvider,
  consoleAnalyticsClient,
  createPostHogAnalyticsClient,
  noopAnalyticsClient,
} from '@/src/lib/analytics';
import {
  registerCampaignFromUrl,
  registerDevSession,
  registerLocale,
} from '@/src/lib/tracking';

type AnalyticsBackend = 'posthog' | 'console' | 'noop';

function isPostHogDisabled() {
  return process.env.NEXT_PUBLIC_POSTHOG_DISABLED === 'true';
}

function canUsePostHog() {
  return !isPostHogDisabled() && Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY);
}

/**
 * `NEXT_PUBLIC_ANALYTICS_PROVIDER=console|noop|posthog` forces a backend.
 * Default: PostHog when configured, otherwise noop.
 */
function resolveAnalyticsBackend(): AnalyticsBackend {
  const explicit = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  if (explicit === 'console' || explicit === 'noop') return explicit;
  if (explicit === 'posthog') return canUsePostHog() ? 'posthog' : 'noop';
  return canUsePostHog() ? 'posthog' : 'noop';
}

function createClientFor(backend: AnalyticsBackend): AnalyticsClient {
  switch (backend) {
    case 'posthog':
      return createPostHogAnalyticsClient(posthog);
    case 'console':
      return consoleAnalyticsClient;
    case 'noop':
      return noopAnalyticsClient;
  }
}

function registerSessionStickyProps(client: AnalyticsClient) {
  registerCampaignFromUrl(client);
  registerDevSession(client);
}

export default function AnalyticsProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) {
  const [{ backend, client }] = useState(() => {
    const backend = resolveAnalyticsBackend();
    return { backend, client: createClientFor(backend) };
  });

  useEffect(() => {
    if (backend === 'noop') return;

    if (backend === 'console') {
      registerSessionStickyProps(client);
      return;
    }

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
        registerSessionStickyProps(client);
        client.notifyReady?.();
      },
    });
  }, [backend, client]);

  useEffect(() => {
    if (backend === 'noop') return;
    registerLocale(client, locale);
  }, [backend, client, locale]);

  return (
    <AnalyticsContextProvider client={client}>
      {children}
    </AnalyticsContextProvider>
  );
}
