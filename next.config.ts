import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'hpjxsdxzuutfvdnbwggv.supabase.co'
      }
    ]
  }
}

export default nextConfig