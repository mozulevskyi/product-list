import React, { Component } from 'react';
import axios from 'axios';
import update from 'immutability-helper'
import Product from './product';
import ProductForm from './productForm'

class productsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      editingProductId: false,
    }
    // axios.defaults.withCredentials = true;
  }

  componentDidMount() {
    axios.get('/products.json' )
      .then(response => {
        this.setState({ products: response.data });

      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  };

  addNewProduct = () => {
    axios.post('/products', {product: {name: '', description: '', price: 0}})
      .then(response => {
        const products = update(this.state.products, { $splice: [[0, 0, response.data]]})
        this.setState({products: products, editingProductId: response.data.id})
      })
      .catch(error => console.log(error))
  };

  updateProduct = (product) => {
    const productIndex = this.state.products.findIndex(x => x.id === product.id)
    const products = update(this.state.products, {[productIndex]: {$set: product }})
    this.setState({products: products, editingProductId: false})
  };

  enableEditing = (id) => {
    this.setState({editingProductId: id}, () => { this.name.focus() })
  };

  deleteProduct = (id) => {
    axios.delete(`/products/${id}`)
      .then(response => {
        const productIndex = this.state.products.findIndex(x => x.id === id)
        const products = update(this.state.products, { $splice: [[productIndex, 1]]})
        this.setState({products: products})
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div>
        <div>
          <button className="newProdButton" onClick={this.addNewProduct}>
            New Product
          </button>
        </div>
        {this.state.products.map((product) => {
          if(this.state.editingProductId === product.id) {
            return(<ProductForm product={product} key={product.id} updateProduct={this.updateProduct}
                                nameRef={input => this.name = input} />)
          } else {
            return (<Product product={product} key={product.id} onClick={this.enableEditing}
                             onDelete={this.deleteProduct} />)
          }
        })}
      </div>
    )
  }
}

export default productsContainer;