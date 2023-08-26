import { combineReducers } from 'redux';
import games from './games';
import player from './player';
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    games,
    player,
    routing: routerReducer
});