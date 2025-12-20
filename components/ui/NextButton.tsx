'use client';

interface NextButtonProps {
  onClick: () => void;
  label?: string;
  show?: boolean;
}

export default function NextButton({
  onClick,
  label = 'Nastavi',
  show = true,
}: NextButtonProps) {
  return (
    <div
      className={`transition-opacity duration-500 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
      <button
        onClick={onClick}
        className='button-next cursor-pointer px-12 py-6 rounded-full font-light text-xl group relative overflow-hidden'>
        <span className='relative z-10 flex items-center justify-center'>
          {label}
        </span>
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-red-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
      </button>
    </div>
  );
}

