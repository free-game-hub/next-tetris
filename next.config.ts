import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/next-tetris",
  assetPrefix: "/next-tetris/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
