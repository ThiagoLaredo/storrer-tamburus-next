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
  },
};

module.exports = nextConfig;
