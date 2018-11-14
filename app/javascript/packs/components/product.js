import React, { Component } from 'react';

class Product extends Component {

  handleClick = () => { this.props.onClick(this.props.product.id) };

  handleDelete = () => { this.props.onDelete(this.props.product.id) };

  render() {
    return(
      <div className="product">
        <span className="prodDeleteButton" onClick={this.handleDelete}>&#10539;</span>
        <h4 className="prodName" onClick={this.handleClick}>{this.props.product.name}</h4>
        <h5 className="prodDesc" onClick={this.handleClick}>{this.props.product.description}</h5>
        Price: <p className="prodPrice" onClick={this.handleClick}>{this.props.product.price}</p>$
      </div>
    )
  }
}

export default Product;