'use client';

import { Card, Button } from '@repo/ui';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card title="Something went wrong" className="w-full max-w-md p-4 text-center border-red-500 border-2">
        <p className="mb-6 text-red-600">{error.message || 'An unexpected error occurred.'}</p>
        <Button label="Try again" severity="danger" onClick={() => reset()} />
      </Card>
    </div>
  );
}
