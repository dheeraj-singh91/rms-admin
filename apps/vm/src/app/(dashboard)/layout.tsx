'use client';

import { DefaultLayout } from '@repo/layouts';
import { ProtectedRoute } from '@repo/auth';
import { useAuth } from '@repo/hooks';
import type { ReactNode } from 'react';
import { Button } from '@repo/ui';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <DefaultLayout
        title="VM Dashboard"
        headerContent={
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user?.name || 'User'}</span>
            <Button label="Logout" size="small" severity="secondary" onClick={() => logout()} />
          </div>
        }
        sidebarContent={
          <nav className="flex flex-col gap-2">
            <a href="/" className="p-2 hover:bg-gray-700 rounded block text-gray-200 no-underline">Dashboard</a>
            <a href="/virtual-machines" className="p-2 hover:bg-gray-700 rounded block text-gray-200 no-underline">Virtual Machines</a>
            <a href="/networks" className="p-2 hover:bg-gray-700 rounded block text-gray-200 no-underline">Networks</a>
          </nav>
        }
      >
        {children}
      </DefaultLayout>
    </ProtectedRoute>
  );
}
