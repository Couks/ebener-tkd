/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
        buildActivity: false,
    },
    images: {
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'oystr.com.br',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
