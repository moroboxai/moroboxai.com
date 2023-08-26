import { IGameInfo } from "../actions"

export const getGamesState = (store: any) => store.games

export const getGames = (store: any): Map<string, IGameInfo> =>
    getGamesState(store) ? getGamesState(store).games : new Map<string, IGameInfo>()

export const getGame = (store: any, id: string): IGameInfo | undefined =>
    getGames(store).get(id)

export const getPlayerState = (store: any) => store.player

export const getSelectedGame = (store: any): IGameInfo | undefined =>
    getPlayerState(store) ? getGame(store, getPlayerState(store).selectedGame) : undefined
