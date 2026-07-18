import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: '/oams',
  experimental: {
    optimizePackageImports: ['primereact', '@tanstack/react-query'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/oams',
        permanent: false,
        basePath: false,
      },
    ];
  },
};

export default nextConfig;
