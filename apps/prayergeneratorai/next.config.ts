import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/prayer-for-anxiety-and-fear",
        destination: "/prayer-for-anxiety",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
