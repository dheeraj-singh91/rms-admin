'use client';

import { Card, Button } from '@repo/ui';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="404 - Not Found" className="w-full max-w-md p-4 text-center">
        <p className="mb-6">The page you are looking for does not exist.</p>
        <Button label="Return Home" onClick={() => router.push('/')} />
      </Card>
    </div>
  );
}
