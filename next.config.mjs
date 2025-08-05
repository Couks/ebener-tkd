/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    },
    devIndicators: false,
    images: {
        remotePatterns: [new URL('https://oystr.com.br/**')]
    }
};

export default nextConfig;
