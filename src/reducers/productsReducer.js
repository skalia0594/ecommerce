const { FETCH_PRODUCTS } = require("../constants");

export const productsReducer = (state={}, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS:
            return {items: action.payload};
        default:
            return state;
    }
};