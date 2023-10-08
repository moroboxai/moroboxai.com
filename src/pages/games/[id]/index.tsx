"use client";

import fs from "fs";

import React from "react";
import { remark } from "remark";
import dynamic from "next/dynamic";
import type { InferGetStaticPropsType } from "next";
import { collectGame } from "./utils";
import { getStaticProps as getStaticGames } from "@/pages/games";

/**
 * Get static data for the game.
 */
export async function getStaticProps(context: any) {
    const id = context.params.id;
    const game = await collectGame("src/games", id);
    const readme = fs.readFileSync(`src/games/${id}/README.md`);

    return {
        props: {
            game,
            readme: String(await remark.process(readme))
        }
    };
}

/**
 * Get static paths to learn articles.
 */
export async function getStaticPaths() {
    const { props } = await getStaticGames();
    const result: {
        paths: any[];
        fallback: boolean;
    } = {
        paths: [],
        fallback: false
    };

    props.games.forEach((game) => {
        // Add a path for the game
        result.paths.push({ params: { id: game.id } });
    });

    return result;
}

const Game = dynamic(() => import("@/components/Games/Game"), {
    ssr: false
});

export default function GamePage({
    game,
    readme
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Game game={game} readme={readme} />;
}
