/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_FOOTBALL_HOST: process.env.NEXT_PUBLIC_API_FOOTBALL_HOST,
    API_FOOTBALL_KEY: process.env.API_FOOTBALL_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.api-sports.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
