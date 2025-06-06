/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GMAIL_USER: process.env.GMAIL_USER,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

module.exports = nextConfig;
