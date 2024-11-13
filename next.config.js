/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'static1.squarespace.com',
      'bizweb.dktcdn.net',
      'r-xx.bstatic.com',
      "q-xx.bstatic.com",
      "firebasestorage.googleapis.com",
      "www.shutterstock.com",
      "example.com",
    ],
  },
};

module.exports = nextConfig;