import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/cart.module.css';
import CartProductCard from '../components/CartProductCard';
import {
  getCartProducts,
  increaseCartProduct,
  decreaseCartProduct,
  removeProductFromCart,
} from '../services/cart';

export default class Cart extends Component {
  handleIncreaseClick = (id, length, availableQuantity) => {
    if (length < availableQuantity) {
      increaseCartProduct(id);
      this.forceUpdate();
    }
  };

  handleDecreaseClick = (id, length) => {
    if (length > 1) {
      decreaseCartProduct(id);
      this.forceUpdate();
    }
  };

  handleRemoveProduct = (id) => {
    removeProductFromCart(id);
    this.forceUpdate();
  };

  render() {
    const cartProducts = getCartProducts();
    const createProductsCards = cartProducts.map((product) => (
      <li key={ product.id }>
        <CartProductCard
          handleRemoveProduct={ this.handleRemoveProduct }
          handleDecreaseClick={ this.handleDecreaseClick }
          handleIncreaseClick={ this.handleIncreaseClick }
          { ...product }
        />
      </li>
    ));

    return (
      <div className={ styles.cartPage }>
        <div>
          {!cartProducts.length && (
            <p data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </p>
          )}
          <ul>
            {createProductsCards === undefined ? '' : createProductsCards}
          </ul>
          <p className={ styles.cartTotalPrice }>
            <strong>Valor Total da Compra: </strong>
            {cartProducts
              .reduce(
                (total, product) => total + product.price * product.length,
                0,
              )
              .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <Link to="/checkout">
            <button type="submit" data-testid="checkout-products">
              Finalizar compra
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
