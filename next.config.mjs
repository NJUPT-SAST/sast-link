/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/apis/:slug*",
        destination: `http://${process.env.DB_IP}:8080/api/v1/:slug*`,
      },
    ];
  },
};

export default nextConfig;
