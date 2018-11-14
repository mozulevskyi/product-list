import React, { Component } from 'react';
import axios from 'axios';
import NumericInput from 'react-numeric-input';

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.product.name,
      description: this.props.product.description,
      price: this.props.product.price
    }
    axios.defaults.withCredentials = true;
  }

  handleNemeInput = (e) => {
    this.setState({name: e.target.value})
  };

  handleDescInput = (e) => {
    this.setState({description: e.target.value})
  };

  handlePriceInput = (e) => {
    this.setState({price: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const product = {name: this.state.name, description: this.state.description, price: this.state.price}
    axios.put(`/products/${this.props.product.id}`, {product: product})
      .then(response => {
        console.log(response)
        this.props.updateProduct(response.data)
        this.setState(response.data)
      })
      .catch(error => console.log(error))
  };

  render() {
    return(
      <div className="product">
        <form>
          <input className="nameInput" type="text" name="name" placeholder="Enter name of the product"
                 value={this.state.name} onChange={this.handleNemeInput}
                 ref={this.props.nameRef} />
          <input className="descInput" type="text" name="description" placeholder="Enter description of the product"
                 value={this.state.description} onChange={this.handleDescInput} />
          <input className="priceInput" value={this.state.price} type="number" onChange={this.handlePriceInput} />
          <button className="saveProdButton" type="submit" onClick={this.handleSubmit}>Save</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;