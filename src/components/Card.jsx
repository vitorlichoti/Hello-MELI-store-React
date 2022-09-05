import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/card.module.css';

class Card extends React.Component {
  render() {
    const { product, func } = this.props;
    const { price, thumbnail, title, attributes } = product;

    return (
      <div className={ styles.cardProduct }>
        <div className={ styles.cardHeader }>
          <p className={ styles.cardTitle } data-testid="product-detail-name">
            {title}
            &nbsp;- R$&nbsp;
            <span data-testid="product-detail-price">{price}</span>
          </p>
        </div>

        <div className={ styles.cardDescription }>
          <img
            className={ styles.cardImage }
            src={ thumbnail }
            alt={ title }
            data-testid="product-detail-image"
          />

          <div>
            <h4>Especificações Técnicas</h4>

            <ul>
              {attributes.map(({ id, name, value_name: valueName }) => (
                <li key={ id }>
                  <strong>{name}</strong>
                  :
                  {' '}
                  {valueName}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={ func }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    attributes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value_name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  func: PropTypes.func.isRequired,
};

export default Card;
