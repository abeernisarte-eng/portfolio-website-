import type { NextConfig } from "next";

const isVercel = process.env.VERCEL === "1";

function getBackendImagePattern() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) return null;

  try {
    const { protocol, hostname } = new URL(apiUrl);
    if (protocol !== "https:" && protocol !== "http:") return null;
    return {
      protocol: protocol.replace(":", "") as "http" | "https",
      hostname,
    };
  } catch {
    return null;
  }
}

const backendImagePattern = getBackendImagePattern();

const nextConfig: NextConfig = {
  async rewrites() {
    if (isVercel) return [];

    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5100/api/:path*",
      },
      {
        source: "/uploads/:path*",
        destination: "http://localhost:5100/uploads/:path*",
      },
      {
        source: "/health",
        destination: "http://localhost:5100/health",
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5100",
      },
      ...(backendImagePattern ? [backendImagePattern] : []),
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
