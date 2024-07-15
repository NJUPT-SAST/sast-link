/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/apis/:slug*",
        destination: `http://10.11.12.13:8080/api/v1/:slug*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sast-link-1309205610.cos.ap-shanghai.myqcloud.com",
      },
    ],
  },
};

export default nextConfig;
