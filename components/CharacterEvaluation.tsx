'use client';

import { useState } from 'react';

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
        text: 'Aktivno radim da uskladim svoje postupke sa svojim vrednostima',
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

  const handleAnswer = (value: number) => {
    const questionId = `q${questions[currentQuestion].id}`;
    const newAnswers = { ...answers, [questionId]: value.toString() };
    setAnswers(newAnswers);
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      } else {
        // All questions answered
        setTimeout(() => {
          onComplete(newAnswers);
        }, 1000);
      }
    }, 500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative bg-black'>
      {/* SLIKA: Minimalistička, tamna - apstraktna forma koja sugerira introspekciju i samopreispitivanje */}
      {/* Opciono: Dark, abstract background suggesting introspection/self-reflection */}
      {/* Primeri: Apstraktne forme koje sugerišu ogledalo, dubinu, ili unutrašnji prostor */}
      {/* Fajl: character-introspection.png ili self-reflection.png */}
      <div
        className='absolute inset-0 opacity-35 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out'
        style={{
          backgroundImage: "url('/images/character-introspection.jpeg')",
        }}
      />

      {/* Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-3xl mx-auto w-full'>
        {/* Progress Bar */}
        <div className='mb-12'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-gray-400 text-sm font-medium'>
              Pitanje {currentQuestion + 1} od {questions.length}
            </span>
            <span className='text-gray-400 text-sm font-medium'>
              {Math.round(progress)}%
            </span>
          </div>
          <div className='w-full bg-gray-900/50 rounded-full h-2 overflow-hidden'>
            <div
              className='bg-gray-600 h-full rounded-full transition-all duration-500 ease-out'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div
          className={`bg-gray-900/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-gray-800/50 shadow-2xl transition-all duration-500 ${
            isTransitioning
              ? 'opacity-0 translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}>
          <h2 className='text-3xl md:text-4xl font-light mb-8 text-center text-gray-200'>
            {questions[currentQuestion].question}
          </h2>

          <div className='space-y-4'>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className='cursor-pointer w-full text-left p-6 rounded-xl bg-gray-900/30 hover:bg-gray-800/40 border border-gray-800/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group'>
                <div className='flex items-center space-x-4'>
                  <div className='w-6 h-6 rounded-full border-2 border-gray-600 group-hover:border-gray-400 flex items-center justify-center transition-colors'>
                    <div className='w-3 h-3 rounded-full bg-gray-400 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </div>
                  <span className='text-lg text-gray-300 group-hover:text-gray-200 transition-colors'>
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
