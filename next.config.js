/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all hostnames
      },
    ],
  },
  env: {
    GMAIL_USER: process.env.GMAIL_USER,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  }
};

module.exports = nextConfig;