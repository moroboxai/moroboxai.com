import { combineReducers } from 'redux';
import games from './games';
import { routerReducer } from 'react-router-redux'


export default combineReducers({
    games,
    routing: routerReducer
});