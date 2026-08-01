import { withSentryConfig } from '@sentry/nextjs';

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

export default withSentryConfig(withNextIntl(nextConfig), {
  // Set in CI / Vercel for source-map upload (optional but recommended)
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: !process.env.CI,
  widenClientFileUpload: true,
  // Route browser events through the Next server to reduce ad-blocker drops
  tunnelRoute: '/monitoring',
});
