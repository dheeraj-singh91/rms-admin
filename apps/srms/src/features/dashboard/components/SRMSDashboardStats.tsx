'use client';

import { Card, Loader } from '@repo/ui';
import { useSRMSStats } from '../api/getSRMSStats';

export function SRMSDashboardStats() {
  const { data, isLoading, error } = useSRMSStats();

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Failed to load SRMS statistics</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total Resources">
        <div className="text-3xl font-bold">{data?.totalResources || 0}</div>
      </Card>
      <Card title="Allocated">
        <div className="text-3xl font-bold text-blue-600">{data?.allocated || 0}</div>
      </Card>
      <Card title="Available">
        <div className="text-3xl font-bold text-green-500">{data?.available || 0}</div>
      </Card>
    </div>
  );
}
