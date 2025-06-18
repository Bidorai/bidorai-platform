/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization configuration
  images: {
    domains: [
      'via.placeholder.com',
      'images.unsplash.com',
      'maps.googleapis.com',
      'maps.gstatic.com',
      'lh3.googleusercontent.com', // For Google Places photos
      'streetviewpixels-pa.googleapis.com', // For Street View images
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_GOOGLE_MAPS_LIBRARIES: process.env.NEXT_PUBLIC_GOOGLE_MAPS_LIBRARIES || 'places,geometry',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Experimental features
  experimental: {
    // Enable app directory (if using Next.js 13+)
    appDir: true,
    // Optimize bundle size
    optimizeCss: true,
    // Enable modern bundling
    esmExternals: 'loose',
    // Improve build performance
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        googlemaps: {
          test: /[\\/]node_modules[\\/]@googlemaps[\\/]/,
          name: 'googlemaps',
          chunks: 'all',
          priority: 10,
        },
      },
    };

    // Add support for SVG imports
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // Optimize for Google Maps API
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }

    return config;
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self), microphone=(), camera=()',
          },
          // CORS headers for Google Maps API
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://maps.googleapis.com',
          },
        ],
      },
      // Specific headers for API routes
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/restaurants',
        destination: '/browse',
        permanent: true,
      },
    ];
  },

  // Rewrites for API proxying (if needed)
  async rewrites() {
    return [
      // Proxy Google Maps API requests through your domain (optional for analytics)
      {
        source: '/api/maps/:path*',
        destination: 'https://maps.googleapis.com/maps/api/:path*',
      },
    ];
  },

  // Build optimization
  output: 'standalone',
  
  // Compression
  compress: true,

  // Power pack optimization
  poweredByHeader: false,
  
  // Strict mode for React
  reactStrictMode: true,

  // SWC minification
  swcMinify: true,

  // Trailing slash configuration
  trailingSlash: false,

  // Generate ETags for caching
  generateEtags: true,

  // Page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // Bundle analyzer (uncomment when needed)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },

  // Dev indicators
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },

  // Internationalization (if needed in the future)
  // i18n: {
  //   locales: ['en-US', 'es-ES'],
  //   defaultLocale: 'en-US',
  // },
};

module.exports = nextConfig;