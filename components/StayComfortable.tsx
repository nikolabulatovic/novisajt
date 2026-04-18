'use client';

import { useTranslations } from 'next-intl';

export default function StayComfortable() {
  const t = useTranslations('StayComfortable');

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <p className="text-white text-2xl md:text-3xl text-center font-light tracking-wide">
        {t('message')}
      </p>
    </div>
  );
}
