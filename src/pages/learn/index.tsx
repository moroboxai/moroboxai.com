"use client";

import React from "react";
import type { InferGetStaticPropsType } from "next";
import dynamic from "next/dynamic";

const Learn = dynamic(() => import("../../components/Learn"), { ssr: false });

export async function getStaticProps() {
    return {
        props: {
            articles: ["a", "c"]
        }
    };
}

export default function LearnPage({
    articles
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Learn articles={articles} />;
}
