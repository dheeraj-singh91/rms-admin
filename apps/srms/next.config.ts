import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: '/srms',
  experimental: {
    optimizePackageImports: ['primereact', '@tanstack/react-query'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/srms',
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
