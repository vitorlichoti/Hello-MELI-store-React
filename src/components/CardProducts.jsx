import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/card-products.module.css';

export default class CardProducts extends Component {
  render() {
    const {
      id,
      title,
      thumbnail,
      price,
      shipping,
      availableQuantity,
      addToCart,
    } = this.props;

    return (
      <div className={ styles.cardProduct }>
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <div>
            <h3>{title}</h3>
            <div className={ styles.cardProductImageContainer }>
              <img src={ thumbnail } alt={ title } />
              {shipping.free_shipping && (
                <p data-testid="free-shipping">Frete Grátis</p>
              )}
            </div>
            <p className={ styles.cardProductPrice }>
              R$
              {' '}
              {price}
            </p>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addToCart({ id, thumbnail, title, price, availableQuantity }) }
        >
          Add to cart
        </button>
      </div>
    );
  }
}

CardProducts.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  shipping: PropTypes.shape({
    free_shipping: PropTypes.bool.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  availableQuantity: PropTypes.number.isRequired,
};
