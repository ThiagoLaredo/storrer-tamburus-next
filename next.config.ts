// next.config.js
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
    formats: ['image/avif', 'image/webp'],
    loaderFile: './src/utils/contentfulLoader.js',
    qualities: [50, 65, 75], // 🔥 Otimize as qualidades
    deviceSizes: [640, 768, 1024, 1280, 1400, 1600], // 🔥 Remove 1920, foca em telas comuns
    imageSizes: [16, 32, 64, 128, 256],
    domains: ['images.ctfassets.net'],
  },
};

module.exports = nextConfig;