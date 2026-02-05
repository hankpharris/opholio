/** @type {import('next').NextConfig} */
const path = require('path');

// Load env vars from root .env.local
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const nextConfig = {
    output: 'standalone',
    experimental: {
        externalDir: true,
    },
    transpilePackages: ["database"],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_API_URL?.replace('https://', '') || 'localhost',
                pathname: '/api/**',
            },
        ],
        unoptimized: true,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/:path*',
            },
        ];
    },
    webpack: (config, { isServer }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            database: path.resolve(__dirname, '../packages/database/src'),
        };
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };
        }
        return config;
    },
};

module.exports = nextConfig;
