import type { NextConfig } from "next";

const isGithubPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactCompiler: true,
  basePath: isGithubPages ? "/forjex/plolux" : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
