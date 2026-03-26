'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: false, // single-page app — we capture stage views manually
      capture_pageleave: true,
      session_recording: {
        maskAllInputs: false, // inputs are just answer buttons, safe to record
      },
      persistence: 'localStorage',
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
