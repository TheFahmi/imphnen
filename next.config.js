/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  eslint: {
    ignoreDuringBuilds: false,
    // Use the flat config system
    lintDuringBuild: true,
    dirs: ['src'],
  },
};

module.exports = nextConfig;
