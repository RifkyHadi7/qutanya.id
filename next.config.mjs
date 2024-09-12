/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://i.pravatar.cc", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "oadqfnknwbaahnminxvl.supabase.co",
        port: "",
        pathname: "**",
      },
    ],
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: "/qutanya-be.vercel.app/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};
// source: '/qutanya-be.vercel.app/:path*',
//         destination: 'https://qutanya-be.vercel.app/:path*',
export default nextConfig;
