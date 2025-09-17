/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lwvcddvxctpkyuyfwihi.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'lwvcddvxctpkyuyfwihi.supabase.co',
        port: '',
        pathname: '/storage/v1/render/image/public/**',
      },
    ],
  },
};

export default nextConfig;
