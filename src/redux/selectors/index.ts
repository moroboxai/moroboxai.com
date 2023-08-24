
export const getGamesState = (store: any) => store.games

export const getGames = (store: any) =>
    getGamesState(store) ? getGamesState(store).games : {}