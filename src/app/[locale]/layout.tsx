import type { Metadata, Viewport } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { Inter, Literata, Source_Serif_4 } from 'next/font/google';
import { notFound } from 'next/navigation';

import PostHogProvider from '@/src/components/PostHogProvider';
import { GpuEffectsProvider } from '@/src/contexts/GpuEffectsContext';
import { routing } from '@/src/i18n/routing';

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  weight: '500',
});

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${literata.variable} ${sourceSerif4.variable} ${inter.variable} antialiased`}
      >
        <PostHogProvider>
          <NextIntlClientProvider messages={messages}>
            <GpuEffectsProvider>{children}</GpuEffectsProvider>
          </NextIntlClientProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
