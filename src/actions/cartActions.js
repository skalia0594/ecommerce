import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";
import store from "../store"
export const addToCart = (product) => (dispatch) => {
    const cartItems = store.getState().cart.cartItems.slice();
    let alreadyPresent= false;
    cartItems.forEach(item => {
      if(item["_id"] === product["_id"]){ 
        item["count"] +=1;
        alreadyPresent = true;  
      } 
    });
    if(!alreadyPresent) {
      cartItems.push({...product, count:1});
    }
    dispatch({
        type: ADD_TO_CART,
        payload: {cartItems}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
export const removeItem= (product) => (dispatch) => {
    const cartItems = store.getState().cart.cartItems.slice().filter(item => item["_id"]!== product["_id"]);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: {cartItems}
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }