/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Remove the 'server' field and use this instead:
  env: {
    HOST: '127.0.0.1',
    PORT: '3000'
  },
  async headers() {
    return [
      {
        source: '/.well-known/appspecific/com.chrome.devtools.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/appspecific/com.chrome.devtools.json',
        destination: '/api/block-chrome-devtools',
      },
    ];
  },
};

module.exports = nextConfig;