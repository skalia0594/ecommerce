import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import { productsReducer } from "./reducers/productsReducer";

const intitialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    products : productsReducer
}), 
intitialState,
composeEnhancer(applyMiddleware(thunk))
);

export default store;