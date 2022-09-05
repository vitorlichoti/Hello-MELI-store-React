import React from 'react';
import PropTypes from 'prop-types';
import { FiXCircle, FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

import styles from '../styles/cart-product-card.module.css';

class CardProductCard extends React.Component {
  render() {
    const {
      id,
      price,
      length,
      title,
      availableQuantity,
      thumbnail,
      handleRemoveProduct,
      handleDecreaseClick,
      handleIncreaseClick,
    } = this.props;

    return (
      <div key={ id } className={ styles.cartProductCard }>
        <button
          className={ styles.iconButton }
          type="button"
          data-testid="remove-product"
          onClick={ () => handleRemoveProduct(id) }
        >
          <FiXCircle />
        </button>
        <img src={ thumbnail } alt={ title } />
        <p className={ styles.title } data-testid="shopping-cart-product-name">{title}</p>

        <button
          className={ styles.iconButton }
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ () => handleDecreaseClick(id, length) }
        >
          <FiMinusCircle />
        </button>
        <p data-testid="shopping-cart-product-quantity">{length}</p>
        <button
          className={ styles.iconButton }
          type="button"
          data-testid="product-increase-quantity"
          onClick={ () => handleIncreaseClick(id, length, availableQuantity) }
        >
          <FiPlusCircle />
        </button>

        <p className={ styles.price }>
          R$
          {' '}
          {price * length}
        </p>
      </div>
    );
  }
}

CardProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  availableQuantity: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
  handleRemoveProduct: PropTypes.func.isRequired,
  handleDecreaseClick: PropTypes.func.isRequired,
  handleIncreaseClick: PropTypes.func.isRequired,
};

export default CardProductCard;
