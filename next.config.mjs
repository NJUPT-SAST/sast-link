/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(process.env.OUTPUT_STANDALONE && { output: "standalone" }),
  async rewrites() {
    return [
      {
        source: "/apis/:slug*",
        destination: `http://118.25.23.101:8081/api/v1/:slug*`,
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
