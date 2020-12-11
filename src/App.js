//feature 1
import React from "react";
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
  render(){
    return (
      <div className="grid-container">
        <header>
          <a href="/">eCommerce</a>
        </header>
        <main>
          <div className="content">
            <div className="main-content">
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
