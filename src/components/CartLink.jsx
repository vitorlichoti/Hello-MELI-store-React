import React from 'react';
import PropTypes from 'prop-types';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import styles from '../styles/cart-link.module.css';

class CartLink extends React.Component {
  render() {
    const { cartLength } = this.props;
    return (
      <Link
        className={ styles.cartLink }
        to="/cart"
        data-testid="shopping-cart-button"
      >
        <FiShoppingCart />
        <span data-testid="shopping-cart-size">{cartLength}</span>
      </Link>
    );
  }
}

CartLink.propTypes = {
  cartLength: PropTypes.number.isRequired,
};

export default CartLink;
