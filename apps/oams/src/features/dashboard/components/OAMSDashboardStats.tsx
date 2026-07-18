'use client';

import { Card, Loader } from '@repo/ui';
import { useOAMSStats } from '../api/getOAMSStats';

export function OAMSDashboardStats() {
  const { data, isLoading, error } = useOAMSStats();

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">Failed to load OAMS statistics</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card title="Active Users">
        <div className="text-3xl font-bold">{data?.activeUsers || 0}</div>
      </Card>
      <Card title="Pending Requests">
        <div className="text-3xl font-bold text-yellow-600">{data?.pendingRequests || 0}</div>
      </Card>
      <Card title="Total Audits">
        <div className="text-3xl font-bold text-gray-500">{data?.totalAudits || 0}</div>
      </Card>
    </div>
  );
}
