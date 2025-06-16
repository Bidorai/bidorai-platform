/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['via.placeholder.com', 'images.unsplash.com'],
  },
  // Removed the invalid serviceWorker configuration
  // Next.js doesn't have an experimental.serviceWorker option
}

module.exports = nextConfig