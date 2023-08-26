import { Dispatch } from "redux";
import { Actions } from "../actions/types"
import { IGamesDb, gamesDbLoaded, selectGame } from "../actions";

export const dispatchGamesDbLoaded = (dispatch: Dispatch<Actions>) => (db: IGamesDb) => dispatch(gamesDbLoaded(db));
export const dispatchSelectGame = (dispatch: Dispatch<Actions>) => (id: string) => dispatch(selectGame(id));