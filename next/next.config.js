/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return process.env.NODE_ENV === 'development' ? [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*", // Proxy to Backend
      },
    ] : []
  }
};

module.exports = nextConfig;
