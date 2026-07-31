import { redirect } from 'next/navigation';

import { routing } from '@/src/i18n/routing';

type PreviewPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Shortcut for people in the know: `/preview` (or `/en/preview`) → home with nav unlocked.
 */
export default async function PreviewPage({ params }: PreviewPageProps) {
  const { locale } = await params;
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  redirect(`${prefix}/?nav=1`);
}
