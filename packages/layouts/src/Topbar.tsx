import type { ReactNode } from 'react';

export interface TopbarProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

export const Topbar = ({ title, children, className }: TopbarProps) => {
  return (
    <div className={`flex justify-between items-center w-full ${className || ''}`}>
      <h1 className="text-xl font-semibold m-0">{title}</h1>
      <div className="flex items-center gap-4">
        {children}
      </div>
    </div>
  );
};
