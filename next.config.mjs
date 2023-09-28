/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/apis/:slug*",
        destination: `http://81.68.225.220:8080/api/v1/:slug*`,
      },
    ];
  },
};

export default nextConfig;
