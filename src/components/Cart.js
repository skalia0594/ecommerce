import React, { Component } from 'react';
import formatCurrency from "../util"

export default class Cart extends Component {
    render() {
        let {cartItems} = this.props;
        let totalItems=0;
        cartItems.forEach(item => (totalItems += item["count"]));
        return (
            <div>
                {
                    (cartItems.length === 0) ? <div className="cart cart-header">Your cart is empty</div> : 
                    <div className="cart cart-header">You have {totalItems} items in cart</div>
                }
                <ul className="cart-list">
                    {cartItems.map(item => 
                        <li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="title">
                                {item.title}
                            </div>
                            <div className="details"> 
                                {item.count} x {formatCurrency(item.price)}
                                <button onClick={() => this.props.removeItem(item)} className="button">Remove</button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
