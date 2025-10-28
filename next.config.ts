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
    qualities: [50, 70, 80], // 🔥 Otimize as qualidades
    // 🔥 BREAKPOINTS OTIMIZADOS - baseado no seu uso real
    deviceSizes: [640, 750, 828, 1080, 1200, 1400, 1600, 1920, 2560, 3840], // 🔥 Adicione 1400, 1600
    imageSizes: [16, 32, 64, 128, 256, 384],
    domains: ['images.ctfassets.net'],
  },
};

module.exports = nextConfig;