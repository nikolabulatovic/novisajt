'use client';

import { type ReactNode, createContext, useContext } from 'react';

import { noopAnalyticsClient } from '@/src/lib/analytics/noopClient';
import type { AnalyticsClient } from '@/src/lib/analytics/types';

const AnalyticsContext = createContext<AnalyticsClient>(noopAnalyticsClient);

export function AnalyticsContextProvider({
  client,
  children,
}: {
  client: AnalyticsClient;
  children: ReactNode;
}) {
  return (
    <AnalyticsContext.Provider value={client}>
      {children}
    </AnalyticsContext.Provider>
  );
}

/** Active analytics backend (PostHog, noop, …). */
export function useAnalytics(): AnalyticsClient {
  return useContext(AnalyticsContext);
}
