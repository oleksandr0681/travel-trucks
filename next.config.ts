import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // cacheComponents: false,
  partialPrefetching: true,
  reactCompiler: true,
};

export default nextConfig;
