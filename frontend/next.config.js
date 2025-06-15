/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
  },
  experimental: {
    // Disable Service Worker registration in development mode
    serviceWorker: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig