import { Constants, GameInfo } from "../actions";
import { Actions } from "../actions/types";

const initialState: {
    games: Map<string, GameInfo>;
} = { games: new Map<string, GameInfo>() };

export default (state = initialState, action: Actions) => {
    switch (action.type) {
        case Constants.GAMES_DB_LOADED:
            return {
                ...state,
                games: new Map<string, GameInfo>(
                    Object.entries(
                        Object.fromEntries(
                            action.payload.db.games.map((x) => [
                                x.id,
                                {
                                    ...x,
                                    url:
                                        x.url !== undefined
                                            ? x.url
                                            : `http://localhost:3000/${x.id}/header.yml`
                                }
                            ])
                        )
                    )
                )
            };
        default:
            return state;
    }
};
