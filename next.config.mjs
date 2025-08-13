/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portfolio-nextjs_actions',
  assetPrefix: '/portfolio-nextjs_action/',
  images: { unoptimized: true },   // Pages에서 권장
};


export default nextConfig;