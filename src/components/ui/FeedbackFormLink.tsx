'use client';

import { useLocale, useTranslations } from 'next-intl';

import type { Stage } from '@/src/contexts/NavigationContext';
import { useTracking } from '@/src/hooks/useTracking';
import { stageShowsFeedbackFormLink } from '@/src/lib/story/stageUiConfig';
import { feedbackFormUrlForLocale } from '@/src/lib/tracking';

import AnswerReveal from './AnswerReveal';
import GlassPanel from './GlassPanel';

interface FeedbackFormLinkProps {
  stage: Stage;
  /** When false, stays hidden (e.g. waiting for stage text to finish). */
  visible?: boolean;
  className?: string;
}

/** Shared Google Form CTA for terminal stages (see {@link stageShowsFeedbackFormLink}). */
export default function FeedbackFormLink({
  stage,
  visible = true,
  className = '',
}: FeedbackFormLinkProps) {
  const locale = useLocale();
  const t = useTranslations('feedback');
  const { trackFeedbackFormClicked } = useTracking();

  if (!stageShowsFeedbackFormLink(stage)) {
    return null;
  }

  return (
    <AnswerReveal show={visible}>
      {/*
        Sit just under stage content, flush to the viewport right edge
        (cancel centering of the max-width column).
      */}
      <div
        className={`flex justify-end ${className}`}
        style={{ marginRight: 'calc(50% - 50vw)' }}
      >
        <GlassPanel
          variant="dark"
          className="rounded-l-2xl rounded-r-none"
          contentClassName="rounded-l-2xl rounded-r-none px-4 py-3 sm:px-5 sm:py-4"
        >
          <a
            href={feedbackFormUrlForLocale(locale)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFeedbackFormClicked(stage)}
            className="block max-w-[11rem] text-center text-base sm:max-w-[13rem] sm:text-lg leading-snug text-white/85 hover:text-white underline underline-offset-4 decoration-white/40 hover:decoration-white/80 transition-colors"
          >
            {t('linkLabel')}
          </a>
        </GlassPanel>
      </div>
    </AnswerReveal>
  );
}
