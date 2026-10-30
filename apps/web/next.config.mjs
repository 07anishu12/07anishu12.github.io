import path from "node:path";
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@portfolio/contracts"],
  trailingSlash: true,
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  poweredByHeader: false,
  outputFileTracingIncludes: {
    "/*": ["../../data/blog/**/*.md", "./generated/**/*.json"],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aniket.app" }],
        destination: "https://aniket.app/:path*",
        permanent: true,
      },
      ...["about", "contact", "privacy", "work"].map((name) => ({
        source: `/${name}.html`,
        destination: name === "work" ? "/projects/" : `/${name}/`,
        permanent: true,
      })),
      {
        source: "/author/aniket-thakur.html",
        destination: "/author/aniket-thakur/",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/blog/page/:page(\\d+)",
          destination: "/blog/page/:page/index.html",
        },
        {
          source: "/blog/:category/page/:page(\\d+)",
          destination: "/blog/:category/page/:page/index.html",
        },
        {
          source: "/author/aniket-thakur/",
          destination: "/author/aniket-thakur.html",
        },
      ],
      fallback: [{ source: "/:path*", destination: "/:path*/index.html" }],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
        ],
      },
    ];
  },
};
export default nextConfig;
