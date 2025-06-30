/** @type {import('next').NextConfig} */
const nextConfig = {
  // Handle optional dependencies
  webpack: (config, { isServer }) => {
    // Handle optional dependencies that might not be available
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Handle optional WebSocket dependencies
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'bufferutil': false,
        'utf-8-validate': false,
      };
    }

    return config;
  },

  // Handle experimental features
  experimental: {
    esmExternals: 'loose',
  },

  // Ignore build errors for optional dependencies
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig; 