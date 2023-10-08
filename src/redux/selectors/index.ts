import { MenuState, GameInfo } from "../actions";

export const getMenuState = (store: any) => store.menu;

export const getMenu = (store: any): MenuState =>
    getMenuState(store) ? getMenuState(store) : {};

export const getGamesState = (store: any) => store.games;

export const getGames = (store: any): Map<string, GameInfo> =>
    getGamesState(store)
        ? getGamesState(store).games
        : new Map<string, GameInfo>();

export const getGame = (store: any, id: string): GameInfo | undefined =>
    getGames(store).get(id);

export const getPlayerState = (store: any) => store.player;

export const getSelectedGame = (store: any): GameInfo | undefined =>
    getPlayerState(store)
        ? getGame(store, getPlayerState(store).selectedGame)
        : undefined;
