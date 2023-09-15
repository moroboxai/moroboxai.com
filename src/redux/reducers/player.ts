import { Actions } from '../actions/types';

const REACT_APP_SELECTED_GAME = import.meta.env.VITE_SELECTED_GAME;

const initialState: {
    selectedGame: string | undefined
} = { selectedGame: REACT_APP_SELECTED_GAME};

export default (state = initialState, action: Actions) => {
    switch (action.type) {
        default:
            return state;
    }
};