import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer";
import { orderReducer } from "./reducers/orderReducer";
import { productsReducer } from "./reducers/productsReducer";

const intitialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combineReducers({
    products : productsReducer,
    cart : cartReducer,
    order: orderReducer
}), 
intitialState,
composeEnhancer(applyMiddleware(thunk))
);

export default store;