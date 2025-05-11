/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,

  async redirects() {
    return [
      // Redirect non-www to www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "algotradingelite.com",
          },
        ],
        destination: "https://www.algotradingelite.com/:path*",
        permanent: true,
      },

      // Or redirect www to non-www (choose one block to keep)
      // {
      //   source: '/:path*',
      //   has: [
      //     {
      //       type: 'host',
      //       value: 'www.algotradingelite.com',
      //     },
      //   ],
      //   destination: 'https://algotradingelite.com/:path*',
      //   permanent: true,
      // },
    ];
  },
};

module.exports = nextConfig;
