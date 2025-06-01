/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
};

module.exports = nextConfig;
