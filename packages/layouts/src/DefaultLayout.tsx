import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Topbar } from './Topbar';

export interface DefaultLayoutProps {
  children: ReactNode;
  sidebarContent?: ReactNode;
  headerContent?: ReactNode;
  title?: string;
}

export function DefaultLayout({ children, sidebarContent, headerContent, title }: DefaultLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar>
        <div className="text-xl font-bold mb-8">Admin Platform</div>
        {sidebarContent}
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header>
          <Topbar title={title || 'Dashboard'}>
            {headerContent}
          </Topbar>
        </Header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

