/* eslint-env node */
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['config', 'pages', 'src'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },

}

module.exports = nextConfig
