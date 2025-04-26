/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  // Ensure we're binding to 0.0.0.0 for external accessibility
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost', '0.0.0.0'],
    },
  },
};

module.exports = nextConfig;
