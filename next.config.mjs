/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/cinema',
        destination: '/taste',
        permanent: true,
      },
      {
        source: '/ordinary-days',
        destination: '/archive',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
