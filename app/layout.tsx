import type { Metadata, Viewport } from 'next';
import { Inter, Literata, Source_Serif_4 } from 'next/font/google';

import PostHogProvider from '@/components/PostHogProvider';

import './globals.css';

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  weight: '500', // Medium
});

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Izbor',
  description: 'Imersivno putovanje samospoznaje i svesti',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body
        className={`${literata.variable} ${sourceSerif4.variable} ${inter.variable} antialiased`}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
