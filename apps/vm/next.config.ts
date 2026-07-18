import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: '/vm',
  experimental: {
    optimizePackageImports: ['primereact', '@tanstack/react-query'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/vm',
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
