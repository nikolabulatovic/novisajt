'use client';

import { ReactNode } from 'react';

interface ContentContainerProps {
  children: ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
  maxWidth?: string;
  className?: string;
}

const spacingClasses = {
  sm: 'space-y-4 md:space-y-6',
  md: 'space-y-8 md:space-y-12',
  lg: 'space-y-10 md:space-y-16',
};

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export default function ContentContainer({
  children,
  spacing = 'md',
  align = 'center',
  maxWidth,
  className = '',
}: ContentContainerProps) {
  return (
    <div
      className={`${spacingClasses[spacing]} ${alignmentClasses[align]} ${className}`}
      style={maxWidth ? { maxWidth } : undefined}>
      {children}
    </div>
  );
}

