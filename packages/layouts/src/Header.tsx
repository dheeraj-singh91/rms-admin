import type { ReactNode } from 'react';

export interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  return (
    <header className={`bg-white shadow-sm h-16 flex items-center px-4 ${className || ''}`}>
      {children}
    </header>
  );
};
