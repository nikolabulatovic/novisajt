'use client';

import { useState } from 'react';

export interface ResourceAccordionItem {
  id: string;
  title: string;
  quotes: string[];
  linkUrl: string;
}

interface ResourceAccordionProps {
  items: ResourceAccordionItem[];
  linkLabel: string;
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`mt-1 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-300 ${
        expanded ? 'rotate-180' : ''
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ResourceAccordion({
  items,
  linkLabel,
}: ResourceAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const expanded = openId === item.id;
        const panelId = `resource-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/60 backdrop-blur-xs"
          >
            <button
              type="button"
              id={`resource-trigger-${item.id}`}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
              className="flex w-full cursor-pointer items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-800/80"
            >
              <span className="text-lg font-light leading-relaxed text-gray-100 md:text-xl">
                {item.title}
              </span>
              <ChevronIcon expanded={expanded} />
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={`resource-trigger-${item.id}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-4 border-t border-gray-700/50 bg-gray-900/30 px-5 pb-5 pt-4">
                  {item.quotes.map((quote) => (
                    <blockquote
                      key={quote}
                      className="border-l-2 border-gray-500/60 pl-4 text-sm font-light italic leading-relaxed text-gray-300 md:text-base"
                    >
                      {quote}
                    </blockquote>
                  ))}
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm text-red-400 underline decoration-red-400/40 underline-offset-4 transition-colors hover:text-red-300 hover:decoration-red-300/60 md:text-base"
                  >
                    {linkLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
