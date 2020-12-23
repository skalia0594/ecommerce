import React, { Component } from 'react';
import formatCurrency from "../util"
import Fade from "react-reveal/Fade"
import { connect } from 'react-redux';
import { removeItem } from '../actions/cartActions';
import { createOrder, clearOrder} from "../actions/orderActions";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            showCheckout: false,
            email : "",
            name : "",
            address : ""
        }
    } 
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    submitOrder = e => { 
        e.preventDefault();
        const order = {
            "name" : this.state.name,
            "email": this.state.email,
            "address": this.state.address,
            "cartItems": this.props.cartItems,
            "total": this.props.cartItems.reduce((acc, curr) => acc + (curr["price"]*curr["count"]), 0),
          }
        this.props.createOrder(order);
    }
    closeModal = () => {
        this.props.clearOrder();
    }
    render() {
        let {cartItems, order} = this.props;
        let totalItems=0;
        cartItems.forEach(item => (totalItems += item["count"]));
        return (
            <div>
                {
                    (cartItems.length === 0) ? <div className="cart cart-header">Your cart is empty</div> : 
                    <div className="cart cart-header">You have {totalItems} items in cart</div>
                }
                <Fade left cascade>
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
                </Fade>
                
                {cartItems.length !==0 && 
                    <div className="total-proceed">
                        <div>
                            Total: {" "}
                            {formatCurrency(cartItems.reduce((acc, curr) => acc + curr["price"] * curr["count"], 0))}
                        </div>
                        <button className="button primary" onClick= { () => this.setState({showCheckout: true})}>Proceed</button>
                    </div>
                } 
                {this.state.showCheckout &&
                <Fade right cascade>
                    <form onSubmit={this.submitOrder}>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required></input>
                        </div>
                        <div>
                            <label>Name:</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required></input>
                        </div>
                        <div>
                            <label>Address:</label>
                            <input type="text" name="address" value={this.state.address} onChange={this.handleChange} required></input>
                        </div>
                        <div>
                            <button type="submit" className="button primary">Order</button>
                        </div>
                    </form>
                </Fade>
                }
                {
                    order && 
                    (
                        <Modal isOpen={true} ariaHideApp={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button onClick={this.closeModal} className="close-modal">x</button>
                                <div className="order-details">
                                    <h3>Your order has been placed.</h3>
                                    <h2>Order {order["_id"]}</h2>
                                    <ul>
                                    <li>
                                        <div>Name:</div>
                                        <div>{order["name"]}</div>
                                    </li>
                                    <li>
                                        <div>Email:</div>
                                        <div>{order["email"]}</div>
                                    </li>
                                    <li>
                                        <div>Address:</div>
                                        <div>{order["address"]}</div>
                                    </li>
                                    <li>
                                        <div>Total:</div>
                                        <div>{formatCurrency(order["total"])}</div>
                                    </li>
                                    <li>
                                        <div>Cart Items:</div>
                                        <div>{order["cartItems"].map(item => <div>{item["count"]+ "x" +item["title"]}</div>)}</div>
                                    </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }

            </div>
        )
    }
}
export default connect((state)=> ({   //map state to props
    cartItems: state.cart.cartItems,
    order: state.order.order
}), 
{ //action prop functions
    removeItem,
    createOrder,
    clearOrder      
}
)(Cart);