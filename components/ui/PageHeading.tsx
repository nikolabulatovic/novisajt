'use client';

interface PageHeadingProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function PageHeading({
  children,
  size = 'lg',
  className = '',
}: PageHeadingProps) {
  const sizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-3xl md:text-5xl',
    xl: 'text-4xl md:text-6xl',
  };

  return (
    <h1
      className={`${sizeClasses[size]} font-light text-gray-200 leading-relaxed max-w-3xl mx-auto ${className}`}>
      {children}
    </h1>
  );
}

