import { action } from 'typesafe-actions';
import { Dispatch } from "redux";

export enum Constants {
    GAMES_DB_LOADED = 'games/gamesDbLoaded'
}

export interface IGameInfo {
    name: string
}

export interface IGamesDb {
    games: Array<IGameInfo>
}

export const gamesDbLoaded = (db: IGamesDb) => action(Constants.GAMES_DB_LOADED, { db });
