import fs from "fs";
import path from "path";
import YAML from "yaml";
import type { GameMetadata } from "@/components/PlayerSection";
import type { GameHeader } from "moroboxai-game-sdk";

const GAMES_URL = process.env.NEXT_PUBLIC_GAMES_URL;

export function collectGame(dir: string, id: string): Promise<GameMetadata> {
    // Read directories under games repository
    return new Promise<GameMetadata>((resolve) => {
        // Check if header.yml exists
        const gameDir = path.join(dir, id);
        const headerFile = path.join(gameDir, "header.yml");
        if (!fs.existsSync(headerFile)) {
            throw `missing ${headerFile}`;
        }

        // Load game header
        const header = YAML.parse(
            fs.readFileSync(headerFile).toString()
        ) as GameHeader;

        // Skip invalid headers
        if (
            header.id === undefined ||
            header.title === undefined ||
            header.width === undefined ||
            header.height === undefined ||
            header.date === undefined
        ) {
            throw `incomplete ${headerFile}`;
        }

        const url = `${GAMES_URL}/${header.id}`;

        return resolve({
            id: id,
            title: header.title,
            href: `/game/${header.id}`,
            url,
            previewUrl: `${url}/assets/preview.png`,
            width: header.width,
            height: header.height,
            scale: header.scale ?? 1,
            date: header.date
        });
    });
}

export function collectGames(dir: string): Promise<GameMetadata[]> {
    // Read games under games repository
    return new Promise<GameMetadata[]>((resolve) => {
        fs.readdir(dir, async (_, files) => {
            const result: GameMetadata[] = [];

            await Promise.allSettled(
                files.map(async (file) => {
                    // Check if header.yml exists
                    const gameDir = path.join(dir, file);
                    const headerFile = path.join(gameDir, "header.yml");
                    if (fs.existsSync(headerFile)) {
                        result.push(await collectGame(dir, file));
                    }
                })
            );

            return resolve(result);
        });
    });
}
