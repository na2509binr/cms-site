import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;





// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   async proxy() {
//     return [
//       // Allow login page
//       {
//         path: "/cms/login",
//         destination: "/cms/login",
//       },

//       // Protect CMS area
//       {
//         path: "/cms/:path*",
//         has: [
//           { type: "cookie", key: "accessToken" }
//         ],
//         missing: [
//           { type: "cookie", key: "accessToken" }
//         ],
//         destination: "/cms/login",
//       }
//     ];
//   },

//   async proxy1(): Promise<(
//     {
//       path: string;
//       destination: string;
//       has?: undefined;
//       missing?: undefined;
//     } | {
//       path: "/cms/:path*";
//       has: [{ type: "cookie", key: "accessToken" }];
//       missing: [{ type: "cookie", key: "accessToken" }];
//       destination: "/cms/login";
//     })[]>
  
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//         // console.log(`${process.env.API_URL}`)
//     return [
//       {
//         source: '/api/:path*',
//         destination: `${process.env.API_URL}/:path*`
//       }
//     ];
//   }
// };

// module.exports = nextConfig;







// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   async proxy() {
//     return [
//       // allow login page
//       {
//         path: "/cms/login",
//         destination: "/cms/login",
//       },

//       // protect CMS routes
//       {
//         path: "/cms/:path*",
//         has: [{ type: "cookie", key: "accessToken" }],
//         missing: [{ type: "cookie", key: "accessToken" }],
//         destination: "/cms/login",
//       }
//     ];
//   },
// };

// export default nextConfig;







// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   async rewrites() {
//     return [
//       // Cho phép truy cập login page
//       {
//         source: "/cms/login",
//         destination: "/cms/login",
//       },

//       // Bảo vệ khu vực CMS
//       {
//         source: "/cms/:path*",
//         has: [
//           {
//             type: "cookie",
//             key: "accessToken",
//           },
//         ],
//         missing: [
//           {
//             type: "cookie",
//             key: "accessToken",
//           },
//         ],
//         destination: "/cms/login",
//       },
//     ];
//   },
// };

// export default nextConfig;

