'use client';

import Pill from './Pill';

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
    <Pill
      color='red'
      onClick={onClick}
      label={label}
      show={show}
      disabled={!show}
    />
  );
}
