import { action } from 'typesafe-actions';

export enum Constants {
    GAMES_DB_LOADED = 'games/gamesDbLoaded',
    SELECT_GAME = "player/selectGame"
}

export interface IGameInfo {
    id: string;
    name: string;
    url: string;
}

export interface IGamesDb {
    games: Array<IGameInfo>;
}

export const gamesDbLoaded = (db: IGamesDb) => action(Constants.GAMES_DB_LOADED, { db });

export const selectGame = (id: string) => action(Constants.SELECT_GAME, { id });