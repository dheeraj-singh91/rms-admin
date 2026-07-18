'use client';

import { DefaultLayout } from '@repo/layouts';
import { useAuth } from '@repo/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Button } from '@repo/ui';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <DefaultLayout
      title="OAMS Dashboard"
      headerContent={
        <div className="flex items-center gap-4">
          <span className="text-sm">Welcome, {user?.name || 'User'}</span>
          <Button label="Logout" size="small" severity="secondary" onClick={() => logout()} />
        </div>
      }
      sidebarContent={
        <nav className="flex flex-col gap-2">
          <Link href="/" className="p-2 hover:bg-gray-700 rounded block text-gray-200 no-underline">Dashboard</Link>
          <Link href="/access-requests" className="p-2 hover:bg-gray-700 rounded block text-gray-200 no-underline">Access Requests</Link>
          <Link href="/audit-logs" className="p-2 hover:bg-gray-700 rounded block text-gray-200 no-underline">Audit Logs</Link>
        </nav>
      }
    >
      {children}
    </DefaultLayout>
  );
}
