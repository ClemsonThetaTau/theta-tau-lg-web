import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['localhost']
  },
  experimental: {
    reactCompiler: false
  }
}

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(nextConfig) 