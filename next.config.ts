import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [375, 768, 1024, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
