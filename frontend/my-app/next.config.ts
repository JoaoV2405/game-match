import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://cdn.cloudflare.steamstatic.com/steam/apps/**'),new URL('https://images.igdb.com/igdb/image/upload/**')],
  },
};

export default nextConfig;
