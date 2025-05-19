/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.cnn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.newsapi.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.nytimes.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.bbc.co.uk',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.reuters.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.ap.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.bloomberg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.wsj.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.time.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.forbes.com',
        pathname: '/**',
      }
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/globnews' : '',
}

module.exports = nextConfig 