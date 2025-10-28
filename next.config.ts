/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 🔥 CONFIGURAÇÃO MODERNA SIMPLIFICADA
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 🔥 CONFIGURAÇÃO PARA BROWSERS MODERNOS
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
  },

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
    // qualities: [40, 60, 70],
    qualities: [35, 40, 55], 
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1400, 1600],
    imageSizes: [16, 32, 64, 128, 256],
    domains: ['images.ctfassets.net'],
  },
};

module.exports = nextConfig;