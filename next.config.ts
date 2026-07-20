import type { NextConfig } from "next";

// Static export so the site can also be served from GitHub Pages, giving
// judges a guaranteed-public link independent of Vercel deployment protection.
// On Vercel these are inert (no basePath, server rendering as normal) because
// the GITHUB_PAGES env var is only set in the Pages workflow.
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isPages
    ? {
        output: "export",
        basePath: "/aval-site",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
