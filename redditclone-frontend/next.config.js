/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd'],
  swcMinify: true,
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
