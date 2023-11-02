const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: false
});
const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export", // Outputs a Single-Page Application (SPA).
    distDir: "./dist" // Changes the build output directory to `./dist/`.
};

module.exports = withMDX(withBundleAnalyzer(nextConfig));
