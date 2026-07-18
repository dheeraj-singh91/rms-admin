import type { ReactNode } from 'react';

export interface SidebarProps {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
}

export const Sidebar = ({ children, className, isOpen = true }: SidebarProps) => {
  return (
    <aside className={`bg-gray-800 text-white w-64 min-h-screen transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${className || ''}`}>
      <div className="p-4">
        {children}
      </div>
    </aside>
  );
};
