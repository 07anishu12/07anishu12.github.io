import path from "node:path";
const nextConfig = {
  output: "standalone",
  trailingSlash: true,
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  poweredByHeader: false,
  outputFileTracingIncludes: { "/*": ["../../data/blog/**/*.md"] },
  async redirects() {
    return ["about", "contact", "privacy", "work"].map((name) => ({
      source: `/${name}.html`,
      destination: name === "work" ? "/projects" : `/${name}`,
      permanent: true,
    }));
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
