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
  webpack: (config, { isServer }) => {
    // Completely exclude Payload CMS during build to avoid Node.js compatibility issues
    config.externals = config.externals || [];
    config.externals.push({
      'payload': 'payload',
      '@payloadcms/db-sqlite': '@payloadcms/db-sqlite',
      '@payloadcms/storage-r2': '@payloadcms/storage-r2',
      '@payloadcms/richtext-lexical': '@payloadcms/richtext-lexical',
      '@payloadcms/next': '@payloadcms/next',
    });

    // Exclude problematic Node.js modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        url: false,
        util: false,
        querystring: false,
        'child_process': false,
      };
    }

    // Ignore all libsql-related files
    config.module.rules.push({
      test: /node_modules\/@libsql.*\.(md|txt|LICENSE|node)$/,
      use: 'ignore-loader',
    });

    // Ignore Payload-related files
    config.module.rules.push({
      test: /node_modules\/payload.*\.(md|txt)$/,
      use: 'ignore-loader',
    });

    return config;
  },
};

export default nextConfig;
