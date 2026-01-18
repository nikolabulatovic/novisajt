'use client';

import Pill from './Pill';

interface NextButtonProps {
  onClick: () => void;
  label?: string;
  show?: boolean;
  align?: 'left' | 'center' | 'right';
  className?: string;
  marginTop?: 'none' | 'sm' | 'md' | 'lg';
}

const alignClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};

const marginTopClasses = {
  none: '',
  sm: 'mt-8',
  md: 'mt-12',
  lg: 'mt-16',
};

export default function NextButton({
  onClick,
  label = 'Nastavi',
  show = true,
  align = 'center',
  className = '',
  marginTop = 'md',
}: NextButtonProps) {
  return (
    <div className={`flex ${alignClasses[align]} ${marginTopClasses[marginTop]} ${className}`}>
      <Pill
        color='red'
        onClick={onClick}
        label={label}
        show={show}
        disabled={!show}
      />
    </div>
  );
}
