'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import { StageId } from '@/src/contexts/NavigationContext';
import { useStoryFlow } from '@/src/contexts/StoryFlowContext';
import type { LocalizedAnswerOption } from '@/src/lib/answerIds';
import { stageConfig } from '@/src/lib/story/stageUiConfig';

import AnswerOptions from './ui/AnswerOptions';
import StageTextSurface from './ui/StageTextSurface';

export default function PersonalQuestion() {
  const t = useTranslations(StageId.PersonalQuestion);
  const { completeStage } = useStoryFlow();
  const [selected, setSelected] = useState<string | null>(null);
  const [hideQuestion, setHideQuestion] = useState(false);
  const [showFlashMessage, setShowFlashMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const options = (t.raw('options') as LocalizedAnswerOption[]).map(
    (option) => ({
      id: option.id,
      label: option.label,
    }),
  );

  const handleAnswer = (value: string) => {
    setSelected(value);
    // Hide question and options
    setTimeout(() => {
      setHideQuestion(true);
      // Show flash message after fade out
      setTimeout(() => {
        setShowFlashMessage(true);
        // After 3 seconds, fade out and move to next section
        setTimeout(() => {
          setFadeOut(true);
          setTimeout(() => {
            completeStage(StageId.PersonalQuestion, value);
          }, 500); // Fade out duration
        }, 3000);
      }, 300); // Wait for question to fade out
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative bg-black">
      {(() => {
        const { backgroundImage, opacity = 0.8 } =
          stageConfig[StageId.PersonalQuestion];
        return backgroundImage ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${backgroundImage}')`,
                opacity: opacity,
              }}
            />
          </div>
        ) : null;
      })()}

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {!showFlashMessage ? (
          <div
            className={`text-center space-y-12 transition-opacity duration-300 ${
              hideQuestion ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <StageTextSurface
              stage={StageId.PersonalQuestion}
              contentClassName="p-6 md:p-10"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto">
                {t('question')}
              </h1>
            </StageTextSurface>

            {/* Options */}
            <AnswerOptions
              options={options}
              onSelect={handleAnswer}
              selectedId={selected}
              animateBeforeSelect={false}
              disableUnselectedWhenSelected
              containerClassName="flex flex-row gap-8"
              textClassName="text-lg md:text-xl lg:text-2xl text-gray-300 font-light"
              getButtonClassName={(isSelected, isDisabled) =>
                `w-full text-center px-2 py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  isSelected
                    ? 'bg-gray-800/60 border-2 border-gray-600 cursor-pointer'
                    : isDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50 cursor-pointer'
                }`
              }
            />
          </div>
        ) : (
          <StageTextSurface
            stage={StageId.PersonalQuestion}
            contentClassName="p-6 md:p-10"
          >
            <div
              className={`text-center transition-opacity duration-500 ${
                fadeOut ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-200 italic">
                {t('flashMessage')}
              </p>
            </div>
          </StageTextSurface>
        )}
      </div>
    </div>
  );
}
