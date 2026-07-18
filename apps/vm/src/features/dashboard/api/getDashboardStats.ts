import { useQuery } from '@tanstack/react-query';

export interface DashboardStatsData {
  totalVms: number;
  runningVms: number;
  stoppedVms: number;
}

export const getDashboardStats = async (): Promise<DashboardStatsData> => {
  // Mock API call since there's no real backend yet
  // return apiClient.get('/api/v1/dashboard/stats');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalVms: 124,
        runningVms: 89,
        stoppedVms: 35,
      });
    }, 1000);
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  });
};
