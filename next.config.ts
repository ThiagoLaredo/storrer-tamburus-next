/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 🔥 ADICIONE ESTAS CONFIGURAÇÕES
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // 🔥 CONFIGURAÇÃO MODERNA - remove polyfills desnecessários
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
    qualities: [50, 70, 75],
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1600, 1920],
    imageSizes: [16, 32, 64, 128, 256],
    domains: ['images.ctfassets.net'],
  },
};

module.exports = nextConfig;