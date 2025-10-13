/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'covers.openlibrary.org'
            },
            {
                hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
            }
        ],
    }
};

export default nextConfig;
