import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next 15.1 only supports Node 18/20/22. On Node 26 the parallel static-export
  // workers crash natively (STATUS_STACK_BUFFER_OVERRUN / exit 3221226505) during
  // "Generating static pages". Building in a single process avoids it. Remove this
  // once the project runs on a Node LTS (22 or 24) or Next is upgraded.
  experimental: { workerThreads: false, cpus: 1 },
  // Lint is run separately via `npm run lint`; don't fail production builds on
  // stylistic lint rules (type errors are still enforced by tsc).
  eslint: { ignoreDuringBuilds: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
