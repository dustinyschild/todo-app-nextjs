/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: process.env.PORT || 3000
  },
  experimental: {
    outputStandalone: true
  },
  reactStrictMode: true
};

module.exports = nextConfig;
