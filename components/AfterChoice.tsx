'use client';

import { sectionBackgrounds } from '@/config/sectionBackgrounds';
import PageContainer from './ui/PageContainer';
import AnimatedText from './ui/AnimatedText';
import ContentContainer from './ui/ContentContainer';
import TextBackdrop from './ui/TextBackdrop';

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-700" fill="currentColor" aria-hidden="true">
      <path d="M12.02 2C6.49 2 2 6.36 2 11.74c0 1.9.58 3.67 1.57 5.17L2.2 22l5.33-1.34a10.27 10.27 0 0 0 4.49 1.03c5.53 0 10.02-4.36 10.02-9.75C22.04 6.36 17.55 2 12.02 2Zm5.85 13.86c-.25.69-1.47 1.3-2.02 1.38-.52.08-1.18.12-1.9-.1-.43-.13-.98-.32-1.69-.62-2.97-1.26-4.9-4.38-5.05-4.58-.15-.2-1.2-1.56-1.2-2.98 0-1.42.75-2.12 1.01-2.41.27-.29.59-.36.79-.36.2 0 .4 0 .58.01.19.01.44-.07.69.52.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.61.18.3.78 1.28 1.67 2.07 1.15 1.02 2.12 1.33 2.42 1.48.3.15.47.13.64-.08.17-.2.73-.84.92-1.13.2-.29.39-.24.66-.14.27.1 1.72.8 2.01.94.3.15.49.22.56.34.07.12.07.69-.18 1.38Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-700" fill="currentColor" aria-hidden="true">
      <path d="M20.32 4.37A16.35 16.35 0 0 0 16.26 3a11.1 11.1 0 0 0-.52 1.06 15.13 15.13 0 0 0-7.5 0A11.1 11.1 0 0 0 7.72 3a16.3 16.3 0 0 0-4.06 1.37C1.1 8.21.4 11.93.75 15.6A16.53 16.53 0 0 0 5.7 18.1c.4-.53.76-1.1 1.07-1.7-.59-.22-1.15-.49-1.69-.8.14-.1.27-.2.4-.31 3.27 1.56 6.82 1.56 10.05 0 .13.11.27.21.4.31-.54.31-1.1.58-1.69.8.31.6.67 1.17 1.07 1.7a16.48 16.48 0 0 0 4.95-2.5c.43-4.26-.73-7.95-2.94-11.23ZM8.67 13.37c-.98 0-1.78-.9-1.78-2.01s.79-2.01 1.78-2.01c.99 0 1.79.9 1.78 2.01 0 1.11-.79 2.01-1.78 2.01Zm6.66 0c-.98 0-1.78-.9-1.78-2.01s.79-2.01 1.78-2.01c.99 0 1.79.9 1.78 2.01 0 1.11-.79 2.01-1.78 2.01Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-700" fill="currentColor" aria-hidden="true">
      <path d="M22.46 4.59a1.82 1.82 0 0 0-2.2-.22L2.57 11.24a1.5 1.5 0 0 0 .1 2.8l3.65 1.18 1.4 4.47a1.5 1.5 0 0 0 2.5.64l2.33-2.26 3.77 2.78a1.5 1.5 0 0 0 2.36-.89l3.83-14.2c.2-.72-.08-1.26-.05-1.17Zm-4.95 3.34-8.06 7.26-.31 2.7-.95-3.02-3.02-.98 12.34-5.96Z" />
    </svg>
  );
}

export default function AfterChoice() {
  const { backgroundImage, opacity = 0.8 } = sectionBackgrounds['after-choice'];

  const title = [
    'Svaka čast! Izabrao si stranu pravde i empatije.',
    'Životinje će ti biti zahvalne.',
    'Nisi sam u ovome. Pridruži nam se.',
  ];

  return (
    <PageContainer
      backgroundImage={backgroundImage}
      backgroundImageOpacity={opacity}
      overlayOpacity={0}
      maxWidth="3xl">
      <ContentContainer spacing="lg">
        <div className="relative p-16">
          <TextBackdrop type="linear" opacity={0.2} />
          <div className="relative z-10">
            <AnimatedText
              text={title}
              speed={120}
              delayAfterComplete={800}
              textSize="xl"
              alignment="center"
              // AfterChoice is the final stage; no "next" pill.
              onComplete={() => { }}
              className="text-gray-900"
            />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-200 shadow-xl space-y-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-900 text-center">
            Pronađi nas u grupama
          </h2>

          <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
            <button className="cursor-pointer group p-6 rounded-xl border border-gray-200 bg-white/80 hover:bg-gray-50 transition-all duration-300 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <WhatsAppIcon />
              </div>
              <p className="text-gray-800 text-lg font-light">WhatsApp</p>
            </button>

            <button className="cursor-pointer group p-6 rounded-xl border border-gray-200 bg-white/80 hover:bg-gray-50 transition-all duration-300 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <DiscordIcon />
              </div>
              <p className="text-gray-800 text-lg font-light">Discord</p>
            </button>

            <button className="cursor-pointer group p-6 rounded-xl border border-gray-200 bg-white/80 hover:bg-gray-50 transition-all duration-300 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <TelegramIcon />
              </div>
              <p className="text-gray-800 text-lg font-light">Telegram</p>
            </button>
          </div>
        </div>

      </ContentContainer>
    </PageContainer>
  );
}
