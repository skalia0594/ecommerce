import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-count">{this.props.count} Products</div>
                <div className="filter-size">Size {" "}
                <select onChange={this.props.filterSize} value={this.props.size}>
                    <option value="">All</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
                </div>
                <div className="filter-order">Price {" "} 
                <select onChange={this.props.sortPrice} value={this.props.sort}>
                    <option>Latest</option>
                    <option value="Lowest">Lowest</option>
                    <option value="Highest">Highest</option>
                </select>
                </div>
            </div>
        )
    }
}
