/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    BASE_API_URL: process.env.BASE_API_URL
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'picsum.photos',
      'images.unsplash.com',
      'loading.io'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo-**'
      }
    ]
  }
};

module.exports = nextConfig;
