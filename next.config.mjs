/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * allowedDevOrigins は設定しない（Next のデフォルトは warn のみでブロックしない）。
   * 設定すると block モードになり、環境によってはスマホから /_next が 403 になることがある。
   */
  async redirects() {
    return [
      { source: '/feature', destination: '/service', permanent: true },
      { source: '/staff', destination: '/greeting', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'nagata-juku.net',
      },
    ],
  },
};

export default nextConfig;
