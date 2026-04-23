'use client';

interface AnswerOptionItem {
  id: string;
  label: string;
}

interface AnswerOptionsProps {
  options: AnswerOptionItem[];
  onSelect: (id: string) => void;
  selectedId?: string | null;
  disableUnselectedWhenSelected?: boolean;
  containerClassName?: string;
  textClassName?: string;
  getButtonClassName?: (isSelected: boolean, isDisabled: boolean) => string;
}

const defaultButtonClassName = (isSelected: boolean, isDisabled: boolean) =>
  `text-center px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer ${
    isDisabled
      ? 'opacity-60 cursor-not-allowed bg-gray-900/70 border border-gray-800/50'
      : isSelected
        ? 'bg-gray-800/60 border-2 border-gray-600'
        : 'bg-gray-900/70 border border-gray-800/50 hover:bg-gray-800/80 hover:border-gray-700/50'
  }`;

export default function AnswerOptions({
  options,
  onSelect,
  selectedId,
  disableUnselectedWhenSelected = false,
  containerClassName = 'flex flex-row gap-6 justify-center flex-wrap px-4',
  textClassName = 'text-lg md:text-xl text-gray-300 font-light',
  getButtonClassName = defaultButtonClassName,
}: AnswerOptionsProps) {
  return (
    <div className={containerClassName}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        const isDisabled =
          disableUnselectedWhenSelected &&
          selectedId != null &&
          selectedId !== option.id;

        return (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            disabled={isDisabled}
            className={getButtonClassName(isSelected, isDisabled)}
          >
            <span
              className={textClassName}
              style={{ fontFamily: 'var(--font-literata), serif' }}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
