import { Dispatch } from "redux";
import { Actions } from "../actions/types";
import { GamesDb, toggleMenu, gamesDbLoaded, selectGame } from "../actions";

export const dispatchToggleMenu =
    (dispatch: Dispatch<Actions>) => (value: boolean) =>
        dispatch(toggleMenu(value));
export const dispatchGamesDbLoaded =
    (dispatch: Dispatch<Actions>) => (db: GamesDb) =>
        dispatch(gamesDbLoaded(db));
export const dispatchSelectGame =
    (dispatch: Dispatch<Actions>) => (id: string) =>
        dispatch(selectGame(id));
