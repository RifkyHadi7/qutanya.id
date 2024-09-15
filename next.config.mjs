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
};
// source: '/qutanya-be.vercel.app/:path*',
//         destination: 'https://qutanya-be.vercel.app/:path*',
export default nextConfig;
