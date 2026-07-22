'use client';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';

export default function StayComfortable() {
  const t = useTranslations(StageId.StayComfortable);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <p className="text-white text-2xl md:text-3xl text-center font-light tracking-wide">
        {t('message')}
      </p>
    </div>
  );
}
