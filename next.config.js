/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    BASE_API_URL: process.env.BASE_API_URL
  },
  images: {
    domains: ['res.cloudinary.com']
  }
};

module.exports = nextConfig;
