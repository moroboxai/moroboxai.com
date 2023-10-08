import { action } from "typesafe-actions";

export enum Constants {
    TOGGLE_MENU = "menu/toggleMenu",
    GAMES_DB_LOADED = "games/gamesDbLoaded",
    SELECT_GAME = "player/selectGame"
}

export interface MenuState {
    toggled?: boolean;
}

export interface GameInfo {
    id: string;
    name: string;
    url: string;
}

export interface GamesDb {
    games: Array<GameInfo>;
}

export const toggleMenu = (value: boolean) =>
    action(Constants.TOGGLE_MENU, { value });

export const gamesDbLoaded = (db: GamesDb) =>
    action(Constants.GAMES_DB_LOADED, { db });

export const selectGame = (id: string) => action(Constants.SELECT_GAME, { id });
