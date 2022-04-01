/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["pbs.twimg.com", "files.stripe.com"],
  },
};

module.exports = nextConfig
