'use client';

import { Card, Button } from '@repo/ui';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="403 - Unauthorized" className="w-full max-w-md p-4 text-center">
        <p className="mb-6">You do not have permission to access this page.</p>
        <Button label="Go back" onClick={() => router.back()} />
      </Card>
    </div>
  );
}
