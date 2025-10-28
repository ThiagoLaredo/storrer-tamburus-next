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
    qualities: [25, 50, 70, 90], // Isso deve resolver o aviso
  },
};

module.exports = nextConfig;