/** @type {import('next').NextConfig} */
const fs = require('fs');
const path = require('path');

// Load env vars from root .env.local
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });
// Optional local-only overrides for development.
const devEnvPath = path.resolve(__dirname, '../.env.dev');
if (process.env.NODE_ENV === 'development' && fs.existsSync(devEnvPath)) {
    require('dotenv').config({ path: devEnvPath, override: true });
}

// Keep local auth flows local when dev bypass is enabled.
if (process.env.NODE_ENV === 'development' && process.env.ENABLE_DEV_AUTH_BYPASS === '1' && !process.env.VERCEL) {
    const localUrl = `http://localhost:${process.env.PORT || '3000'}`;
    process.env.NEXTAUTH_URL = localUrl;
    process.env.NEXTAUTH_URL_INTERNAL = localUrl;
}

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
