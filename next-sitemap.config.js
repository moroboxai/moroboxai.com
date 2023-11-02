const SITE_URL = process.env.SITE_URL || "https://moroboxai.com";

const exclude = ["/embed*", "/games", "/learn"];

const NEXT_SSG_FILES = [
    "/*.json$",
    "/*_buildManifest.js$",
    "/*_middlewareManifest.js$",
    "/*_ssgManifest.js$",
    "/*.js$"
];

/** @type {import('next-sitemap').IConfig} */
const config = {
    exclude,
    siteUrl: SITE_URL,
    generateIndexSitemap: false,
    changefreq: "monthly",
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: NEXT_SSG_FILES
            }
        ]
    },
    outDir: "dist"
};

module.exports = config;
