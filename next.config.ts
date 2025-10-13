/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        pathname: '**', // permite qualquer caminho vindo do Contentful
      },
    ],
    formats: ['image/avif', 'image/webp'],
    loaderFile: './src/utils/contentfulLoader.js', // 🔥 caminho do seu loader personalizado
  },
};

module.exports = nextConfig;
