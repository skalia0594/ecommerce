import React, { Component } from 'react';
import formatCurrency from "../util"
import Fade from "react-reveal/Fade"

export default class Cart extends Component {
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
            "cartItems": this.props.cartItems
          }
        this.props.createOrder(order);
    }
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

            </div>
        )
    }
}
