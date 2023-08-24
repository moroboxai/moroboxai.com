import { Dispatch } from "redux";
import { Actions } from "../actions/types"
import { IGamesDb, gamesDbLoaded } from "../actions";

export const dispatchGamesDbLoaded = (dispatch: Dispatch<Actions>) => (db: IGamesDb) => dispatch(gamesDbLoaded(db));