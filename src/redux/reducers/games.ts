import { Constants, IGameInfo } from '../actions';
import { Actions } from '../actions/types';

const initialState: {
    games: Map<string, IGameInfo>
} = { games: new Map<string, IGameInfo>() };

export default (state = initialState, action: Actions) => {
    switch (action.type) {
        case Constants.GAMES_DB_LOADED:
            return { ...state, games: Object.fromEntries(action.payload.db.games.map(x => [x.name, x])) };
        default:
            return state;
    }
};