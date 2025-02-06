import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // basePath: "/LeagueWorstPerformanceTracker", FOR GIT PAGES ONLY
  // output: "export",  // <=== enables static exports
  output: "standalone",  // <=== enables static exports
  reactStrictMode: true,
  env: {
    RIOT_KEY: process.env.RIOT_KEY,
  }
};

export default nextConfig;
