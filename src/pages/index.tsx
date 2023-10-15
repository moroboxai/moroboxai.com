"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { InferGetStaticPropsType } from "next";
import { collectGame } from "@/lib/utils";

const HOME_GAME_ID = process.env.NEXT_PUBLIC_HOME_GAME_ID!;

/**
 * Get static data for the game.
 */
export async function getStaticProps() {
    const game = await collectGame("src/games", HOME_GAME_ID);

    return {
        props: {
            game
        }
    };
}

const Home = dynamic(() => import("@/components/Home"), { ssr: false });

export default function HomePage({
    game
}: InferGetStaticPropsType<typeof getStaticProps>) {
    return <Home game={game} />;
}
