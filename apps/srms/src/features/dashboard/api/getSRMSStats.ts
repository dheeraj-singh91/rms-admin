import { useQuery } from '@tanstack/react-query';

export interface SRMSStatsData {
  totalResources: number;
  allocated: number;
  available: number;
}

export const getSRMSStats = async (): Promise<SRMSStatsData> => {
  // Mock API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalResources: 500,
        allocated: 350,
        available: 150,
      });
    }, 1000);
  });
};

export const useSRMSStats = () => {
  return useQuery({
    queryKey: ['srms-stats'],
    queryFn: getSRMSStats,
  });
};
