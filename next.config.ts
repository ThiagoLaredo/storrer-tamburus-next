/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    loaderFile: './src/utils/contentfulLoader.js',
    qualities: [30, 45, 65, 75], 
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1400, 1600, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    domains: ['images.ctfassets.net'],
  },
};

// 🔥 ADICIONE o bundle analyzer condicionalmente
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);