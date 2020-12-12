//feature 1
import React from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
class App extends React.Component {
  constructor(props) {
    super();
    this.state={
      products: data.products,
      sort : "",
      size : ""
    }
  }
  filterSize = e => {
    if(e.target.value){ 
      this.setState({
        size: e.target.value,
        products : data.products.filter(product => 
                      product["availableSizes"].includes(e.target.value)
                  ),
        sort:""
      })
    }else {  // all case
      this.setState({
        size: e.target.value,
        products: data.products
      });
    }
  }
  sortPrice = e => {
    // console.log(e.target.value);
    this.setState((prevState)=>({
      sort: e.target.value,
      products : prevState.products.slice().sort((a,b) =>(
        e.target.value === "Highest" ?(a["price"]<b["price"]? 1:-1) : 
        e.target.value === "Lowest" ?(a["price"]>b["price"]? 1:-1) :
        (a["_id"]>b["_id"]? 1:-1)
      )),
    }));
      
  }
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">eCommerce</a>
        </header>
        <main>
          <div className="content">
            <div className="main-content">
              <Filter count={this.state.products.length} 
                      sort={this.state.sort} 
                      size={this.state.size}
                      filterSize={this.filterSize}
                      sortPrice={this.sortPrice}
              />
              <Products products={this.state.products} />
            </div>
            <div className="side-bar">Cart</div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }
  
}

export default App;
