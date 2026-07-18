'use client';

import { Card, Loader } from '@repo/ui';
import { useDashboardStats } from '../api/getDashboardStats';

export function DashboardStats() {
  const { data, isLoading, error } = useDashboardStats();

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Failed to load statistics</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Total VMs">
        <div className="text-3xl font-bold">{data?.totalVms || 0}</div>
      </Card>
      <Card title="Running">
        <div className="text-3xl font-bold text-green-600">{data?.runningVms || 0}</div>
      </Card>
      <Card title="Stopped">
        <div className="text-3xl font-bold text-gray-500">{data?.stoppedVms || 0}</div>
      </Card>
    </div>
  );
}
