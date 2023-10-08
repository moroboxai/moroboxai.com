"use client";

import fs from "fs";
import path from "path";

import React from "react";
import { remark } from "remark";
import type { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import type { Article, Structure } from "@/components/Learn";

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
                    if (!file.endsWith(".md")) {
                        return;
                    }

                    const content = fs.readFileSync(path.join(dir, file));
                    const results = [...content.toString().matchAll(RE_HEADER)];

                    file = file.substring(
                        file.indexOf("- ") + 2,
                        file.length - 3
                    );

                    articles.push({
                        id: file,
                        title: idToTitle(file),
                        sections: results.map((value) => ({
                            id: value[1],
                            title: value[1]
                        })),
                        content: String(await remark.process(content))
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
            const rootContent = fs.readFileSync(path.join(dir, "README.md"));
            const result: Structure = {
                categories: [],
                rootContent: String(await remark.process(rootContent))
            };

            await Promise.all(
                files.map(async (file) => {
                    const _dir = path.join(dir, file);
                    const stat = fs.statSync(_dir);
                    if (!stat.isDirectory()) {
                        return;
                    }

                    file = file.substring(file.indexOf("- ") + 2);

                    // Read articles for that directory
                    result.categories.push({
                        id: file,
                        title: idToTitle(file),
                        articles: await collectArticles(_dir)
                    });
                })
            );

            return resolve(result);
        });
    });
}

/**
 * Get static data for learn articles.
 */
export async function getStaticProps() {
    return {
        props: {
            structure: await collectStructure("src/learn")
        }
    };
}

/**
 * Get static paths to learn articles.
 */
export async function getStaticPaths() {
    const { props } = await getStaticProps();
    const result: {
        paths: any[];
        fallback: boolean;
    } = {
        // Add the root path
        paths: [{ params: { slug: [] } }],
        fallback: false
    };

    props.structure.categories.forEach((category) => {
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
