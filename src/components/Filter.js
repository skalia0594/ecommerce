import React, { Component } from 'react'
import { connect } from 'react-redux'
import { filterProducts, sortProducts } from '../actions/productActions';

class Filter extends Component {
    render() {
        return (
            !this.props.filteredProducts ? <div>Loading...</div> :
            <div className="filter">
                <div className="filter-count">{this.props.filteredProducts.length} Products</div>
                <div className="filter-size">Size {" "}
                <select onChange={(e) => this.props.filterProducts(this.props.products, e.target.value)} 
                        value={this.props.size}
                >
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
                <select onChange={(e) => this.props.sortProducts(this.props.filteredProducts, e.target.value)} 
                        value={this.props.sort}
                >
                    <option value="Latest">Latest</option>
                    <option value="Lowest">Lowest</option>
                    <option value="Highest">Highest</option>
                </select>
                </div>
            </div>
        )
    }
}

export default connect((state)=> ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
}),{
    filterProducts,
    sortProducts
}
)(Filter);