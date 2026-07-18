import { DashboardStats } from '../../features/dashboard/components/DashboardStats';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Overview</h2>
      <DashboardStats />
    </div>
  );
}
