/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/SalihDotTv',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
      },
      {
        protocol: 'https',
        hostname: 'vumbnail.com',
      },
    ],
  },
};

module.exports = nextConfig;
