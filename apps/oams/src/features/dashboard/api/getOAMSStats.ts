import { useQuery } from '@tanstack/react-query';

export interface OAMSStatsData {
  activeUsers: number;
  pendingRequests: number;
  totalAudits: number;
}

export const getOAMSStats = async (): Promise<OAMSStatsData> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        activeUsers: 1420,
        pendingRequests: 18,
        totalAudits: 54930,
      });
    }, 1000);
  });
};

export const useOAMSStats = () => {
  return useQuery({
    queryKey: ['oams-stats'],
    queryFn: getOAMSStats,
  });
};
