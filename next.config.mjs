/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Cloudflare Pages（静的ホスティング）向け。
   * - `next build` で `out/` を生成する
   * - API は Pages Functions（/functions）で受ける
   */
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
