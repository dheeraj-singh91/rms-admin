import type { ReactNode } from 'react';

export interface FooterProps {
  children?: ReactNode;
  className?: string;
}

export const Footer = ({ children, className }: FooterProps) => {
  return (
    <footer className={`bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-500 ${className || ''}`}>
      {children || '© 2026 Admin Portal. All rights reserved.'}
    </footer>
  );
};
