"use client";

import fs from "fs";
import path from "path";

import React from "react";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import type { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import type { Article, Category, Structure } from "@/components/Learn";

const RE_HEADER = /^\# (\w+)$/g;

function idToTitle(id: string): string {
    return id
        .split("-")
        .map((part) => part[0].toUpperCase() + part.substring(1))
        .join(" ");
}

function collectArticles(dir: string): Promise<Article[]> {
    return new Promise<Article[]>((resolve) => {
        fs.readdir(dir, async (_, files) => {
            const articles: Article[] = [];

            await Promise.all(
                files.map(async (file) => {
                    if (!file.endsWith(".mdx")) {
                        return;
                    }

                    const content = fs.readFileSync(path.join(dir, file));
                    const results = [...content.toString().matchAll(RE_HEADER)];
                    const id = file.substring(
                        file.indexOf("- ") + 2,
                        file.length - 4
                    );

                    articles.push({
                        id,
                        path: file,
                        title: idToTitle(id),
                        sections: results.map((value) => ({
                            id: value[1],
                            title: value[1]
                        }))
                    });
                })
            );

            return resolve(articles);
        });
    });
}

function collectStructure(dir: string): Promise<Structure> {
    // Read directories under learn repository
    return new Promise<Structure>((resolve) => {
        fs.readdir(dir, async (_, files) => {
            const rootContent = fs
                .readFileSync(path.join(dir, "README.md"))
                .toString();
            const result: Structure = {
                categories: [],
                mdxSource: await serialize(rootContent)
            };

            await Promise.all(
                files.map(async (file) => {
                    const _dir = path.join(dir, file);
                    const stat = fs.statSync(_dir);
                    if (!stat.isDirectory()) {
                        return;
                    }

                    const id = file.substring(file.indexOf("- ") + 2);

                    // Read articles for that directory
                    result.categories.push({
                        id,
                        path: file,
                        title: idToTitle(id),
                        articles: await collectArticles(_dir)
                    });
                })
            );

            return resolve(result);
        });
    });
}

function fillArticle(
    dir: string,
    structure: Structure,
    slug?: string[]
): Promise<void> {
    return new Promise<void>(async (resolve) => {
        if (slug === undefined || slug.length !== 2) {
            return resolve();
        }

        const category = structure.categories.find(
            (category) => category.id === slug[0]
        );
        if (category === undefined) {
            return resolve();
        }

        structure.category = category;
        const article = category.articles.find(
            (article) => article.id === slug[1]
        );
        if (article === undefined) {
            return resolve();
        }

        structure.article = article;
        const content = fs
            .readFileSync(path.join(dir, category.path, article.path))
            .toString();
        structure.mdxSource = await serialize(content);
        return resolve();
    });
}

/**
 * Get static data for learn articles.
 */
export async function getStaticProps(context: any) {
    const structure = await collectStructure("src/learn");
    fillArticle("src/learn", structure, context.params.slug);

    return {
        props: {
            structure
        }
    };
}

/**
 * Get static paths to learn articles.
 */
export async function getStaticPaths() {
    const structure = await collectStructure("src/learn");
    const result: {
        paths: any[];
        fallback: boolean;
    } = {
        // Add the root path
        paths: [{ params: { slug: [] } }],
        fallback: false
    };

    structure.categories.forEach((category) => {
        // Add a path for the category
        result.paths.push({ params: { slug: [category.id] } });

        category.articles.forEach((article) => {
            // Add a path for the article
            result.paths.push({
                params: { slug: [category.id, article.id] }
            });
        });
    });

    return result;
}

const Learn = dynamic(() => import("../../../components/Learn"), {
    ssr: false
});

export default function LearnPage({
    structure
}: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    const slug = router.query.slug ?? [];

    return (
        <Learn
            baseUrl="/learn"
            structure={structure}
            category={slug[0]}
            article={slug[1]}
        />
    );
}
