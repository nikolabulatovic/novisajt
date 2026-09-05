'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

import { useEffect } from 'react';

import { startQueuedSessionRecording } from '@/src/lib/posthogSessionRecording';
import { registerCampaignFromUrl, registerLocale } from '@/src/lib/tracking';

function isPostHogDisabled() {
  return process.env.NEXT_PUBLIC_POSTHOG_DISABLED === 'true';
}

export default function PostHogProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  useEffect(() => {
    if (isPostHogDisabled()) {
      return;
    }

    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) {
      return;
    }

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
        registerCampaignFromUrl(posthog);
        startQueuedSessionRecording(posthog);
      },
    });
  }, []);

  useEffect(() => {
    if (isPostHogDisabled()) return;
    registerLocale(posthog, locale);
  }, [locale]);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
