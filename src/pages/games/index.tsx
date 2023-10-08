"use client";

import React from "react";
import dynamic from "next/dynamic";
import { collectGames } from "./[id]/utils";
import type { InferGetStaticPropsType } from "next";

/**
 * Get static data for the games list.
 */
export async function getStaticProps() {
    return {
        props: {
            games: await collectGames("src/games")
        }
    };
}

const Games = dynamic(() => import("@/components/Games"), {
    ssr: false
});

export default function GamesPage({
    games
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Games games={games} />;
}
