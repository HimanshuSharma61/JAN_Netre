import type { NextConfig } from "next"

const nextConfig: NextConfig = {

    // Image optimization
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
                pathname: "/**"
            },
        ]
        // Vercel handles image optimization automatically
    },

    // Disable scroll restoration
    experimental: {
        scrollRestoration: false
    }
}

export default nextConfig
