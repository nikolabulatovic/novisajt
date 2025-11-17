'use client';

import { useState } from 'react';

interface CharacterEvaluationProps {
  onComplete: () => void;
}

const questions = [
  {
    id: 1,
    question: 'Kada vidiš nekoga u bolu, šta je tvoj prvi instinkt?',
    options: [
      { text: 'Okrenem pogled i pravim se da se ništa ne dešava', value: 0 },
      { text: 'Osećam nelagodu, ali ne preduzimam ništa', value: 1 },
      { text: 'Osećam empatiju i želim da pomognem', value: 2 },
      {
        text: 'Preduzimam akciju da pomognem, čak i ako je to nezgodno',
        value: 3,
      },
    ],
  },
  {
    id: 2,
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
    id: 3,
    question: 'Kada saznaš nešto neprijatno o sebi, ti:',
    options: [
      { text: 'Ignorišeš to i nastavljaš kao ranije', value: 0 },
      { text: 'Priznaš to, ali praviš izgovore', value: 1 },
      { text: 'Osećaš se konfliktno i nisi siguran šta da radiš', value: 2 },
      { text: 'Duboko razmišljaš i razmatraš promenu', value: 3 },
    ],
  },
  {
    id: 4,
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
}: CharacterEvaluationProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setIsTransitioning(false);
      } else {
        // All questions answered
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }, 500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className='min-h-screen flex items-center justify-center p-8 relative'>
      {/* Background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='relative z-10 max-w-3xl mx-auto w-full'>
        {/* Progress Bar */}
        <div className='mb-12'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-purple-300 text-sm font-medium'>
              Pitanje {currentQuestion + 1} od {questions.length}
            </span>
            <span className='text-purple-300 text-sm font-medium'>
              {Math.round(progress)}%
            </span>
          </div>
          <div className='w-full bg-purple-900/30 rounded-full h-2 overflow-hidden'>
            <div
              className='bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500 ease-out'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div
          className={`bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl transition-all duration-500 ${
            isTransitioning
              ? 'opacity-0 translate-y-4'
              : 'opacity-100 translate-y-0'
          }`}>
          <h2 className='text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent'>
            {questions[currentQuestion].question}
          </h2>

          <div className='space-y-4'>
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                className='w-full text-left p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group'>
                <div className='flex items-center space-x-4'>
                  <div className='w-6 h-6 rounded-full border-2 border-purple-400 group-hover:border-purple-300 flex items-center justify-center transition-colors'>
                    <div className='w-3 h-3 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </div>
                  <span className='text-lg text-white/90 group-hover:text-white transition-colors'>
                    {option.text}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reflection Text */}
        {currentQuestion === questions.length - 1 &&
          answers.length === questions.length && (
            <div className='mt-8 text-center animate-fade-in'>
              <p className='text-xl text-purple-200 italic'>
                "Neispitan život nije vredan življenja."
              </p>
              <p className='text-sm text-purple-400 mt-2'>— Sokrat</p>
            </div>
          )}
      </div>
    </div>
  );
}
