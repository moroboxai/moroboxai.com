import { combineReducers } from "redux";
import menu from "./menu";
import games from "./games";
import player from "./player";
import { routerReducer } from "react-router-redux";

export default combineReducers({
    menu,
    games,
    player,
    routing: routerReducer
});
