'use client';

import { useState, useRef, MouseEvent } from 'react';
import ProgressDots from './ui/ProgressDots';
import AnswerOption from './ui/AnswerOption';

interface CharacterEvaluationProps {
  onComplete: (answers: Record<string, string>) => void;
  answers?: Record<string, string>;
}

const questions = [
  {
    id: 1,
    question: 'Kako definišeš svoj karakter?',
    options: [
      { text: 'Ja sam ono što jesam i ne treba mi da se menjam', value: 0 },
      { text: 'Uglavnom sam dobar, sa nekim manama', value: 1 },
      {
        text: 'Pokušavam da budem saosećajan i da radim pravu stvar',
        value: 2,
      },
      {
        text: 'Hoću da uskladim svoje postupke sa svojim vrednostima',
        value: 3,
      },
    ],
  },
  {
    id: 2,
    question: 'Kada saznaš nešto neprijatno o sebi, ti:',
    options: [
      { text: 'Ignorišeš to i nastavljaš kao ranije', value: 0 },
      { text: 'Priznaš to, ali praviš izgovore', value: 1 },
      { text: 'Osećaš se konfliktno i nisi siguran šta da radiš', value: 2 },
      { text: 'Duboko razmišljaš i razmatraš promenu', value: 3 },
    ],
  },
  {
    id: 3,
    question: 'Šta ti je najvažnije?',
    options: [
      { text: 'Moj komfor i udobnost', value: 0 },
      { text: 'Pridržavanje društvenih normi i uklapanje', value: 1 },
      { text: 'Biti dobra osoba na svoj način', value: 2 },
      { text: 'Živeti u skladu sa svojim najdubljim vrednostima', value: 3 },
    ],
  },
];

export default function CharacterEvaluation({
  onComplete,
  answers: existingAnswers = {},
}: CharacterEvaluationProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] =
    useState<Record<string, string>>(existingAnswers);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(
    null,
  );
  const [nonSelectedFading, setNonSelectedFading] = useState(false);
  const [ripples, setRipples] = useState<
    Record<number, Array<{ id: number; x: number; y: number }>>
  >({});
  const rippleIdCounter = useRef(0);

  const createRipple = (
    event: MouseEvent<HTMLButtonElement>,
    optionIndex: number,
  ) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rippleId = ++rippleIdCounter.current;

    setRipples((prev) => ({
      ...prev,
      [optionIndex]: [...(prev[optionIndex] || []), { id: rippleId, x, y }],
    }));

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => ({
        ...prev,
        [optionIndex]: (prev[optionIndex] || []).filter(
          (r) => r.id !== rippleId,
        ),
      }));
    }, 600);
  };

  const handleAnswer = (
    value: number,
    event: MouseEvent<HTMLButtonElement>,
    optionIndex: number,
  ) => {
    // Create ripple first
    createRipple(event, optionIndex);
    setSelectedOptionIndex(optionIndex);

    const questionId = `q${questions[currentQuestion].id}`;
    const newAnswers = { ...answers, [questionId]: value.toString() };
    setAnswers(newAnswers);

    // Fade out non-selected answers immediately
    setNonSelectedFading(true);

    // After non-selected fade (500ms) + keep selected visible (1000ms), fade it out
    setTimeout(() => {
      // Selected answer fades out
    setIsTransitioning(true);
      setShowContent(false);

      // After selected fades out (300ms), move to next question or complete
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
          setNonSelectedFading(false);
          setSelectedOptionIndex(null);
          // Clear ripples when moving to next question
          setRipples({});
          // Show content after transition completes
          setTimeout(() => {
            setShowContent(true);
          }, 50);
      } else {
        // All questions answered
        setTimeout(() => {
          onComplete(newAnswers);
          }, 1500);
      }
      }, 300); // Selected fade out duration
    }, 1500); // Non-selected fade (500ms) + keep selected visible (1000ms)
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black overflow-hidden'>
      {/* Background image */}
      <div
        className='absolute inset-0 opacity-50 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out'
        style={{
          backgroundImage: "url('/images/character-introspection.jpeg')",
        }}
      />

      {/* Enhanced atmospheric background effects */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl animate-pulse animate-glow' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-400/10 rounded-full blur-3xl animate-pulse animate-glow delay-1000' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-500/5 rounded-full blur-3xl animate-float' />
      </div>

      {/* Gradient overlays for depth */}
      <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none' />
      <div className='absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent pointer-events-none' />

      <div className='relative z-10 max-w-4xl mx-auto w-full'>
        {/* Enhanced progress indicator with glow */}
        <div className='mb-16'>
          <ProgressDots current={currentQuestion} total={questions.length} />
        </div>

        {/* Question and Options */}
        <div
          className={`text-center space-y-12 transition-all duration-700 ease-out ${
            isTransitioning
              ? 'opacity-0 translate-y-8 scale-95'
              : showContent
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95'
          }`}>
          {/* Question with subtle glow effect */}
          <div className='relative'>
            <h1 className='text-2xl md:text-4xl font-light text-gray-200 leading-relaxed max-w-3xl mx-auto relative z-10 drop-shadow-lg'>
            {questions[currentQuestion].question}
            </h1>
            {/* Subtle glow behind question */}
            <div className='absolute inset-0 blur-2xl opacity-20 bg-gray-400/30 -z-0' />
          </div>

          {/* Options with staggered animations */}
          <div className='space-y-6 max-w-3xl mx-auto'>
            {questions[currentQuestion].options.map((option, index) => {
              const isSelected = selectedOptionIndex === index;
              const shouldFade = nonSelectedFading && !isSelected;
              const shouldFadeOut = isTransitioning && isSelected;
              // Keep selected button highlighted (not just on hover) until it fades out
              const isHighlighted =
                isSelected || (hoveredOption === index && !nonSelectedFading);

              return (
                <AnswerOption
                key={index}
                  text={option.text}
                  onClick={(e) => handleAnswer(option.value, e, index)}
                  onMouseEnter={() =>
                    !nonSelectedFading && setHoveredOption(index)
                  }
                  onMouseLeave={() => setHoveredOption(null)}
                  isSelected={isHighlighted}
                  isDisabled={nonSelectedFading || isTransitioning}
                  index={index}
                  shouldFade={shouldFade}
                  shouldFadeOut={shouldFadeOut}>
                  {/* Ripple effects for this specific button */}
                  {(ripples[index] || []).map((ripple) => (
                    <span
                      key={ripple.id}
                      className='ripple'
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: '30px',
                        height: '30px',
                        marginLeft: '-15px',
                        marginTop: '-15px',
                      }}
                    />
                  ))}
                </AnswerOption>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
