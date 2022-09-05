import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/product-details.module.css';
import Card from '../components/Card';
import CartLink from '../components/CartLink';
import Form from '../components/Form';
import Loading from '../components/Loading';
import { addProductToCart, getCartProducts } from '../services/cart';

class ProductDetails extends React.Component {
  state = {
    isLoading: true,
    cartLength: getCartProducts().reduce(
      (current, product) => current + product.length,
      0,
    ),
  };

  componentDidMount = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const url = `https://api.mercadolibre.com/items/${id}`;

    const data = await fetch(url).then((response) => response.json());

    this.setState({
      isLoading: false,
      product: data,
    });
  };

  handleAddToCart = () => {
    const { product } = this.state;
    const cart = getCartProducts();
    const { id, available_quantity: availableQuantity } = product;
    const item = cart.find((element) => element.id === id);

    if (!item || item.length < availableQuantity) {
      addProductToCart({
        title: product.title,
        thumbnail: product.thumbnail,
        price: product.price,
        id: product.id,
        availableQuantity: product.available_quantity,
      });

      this.setState((state) => ({
        cartLength: state.cartLength + 1,
      }));
    }
  };

  render() {
    const { isLoading, product, cartLength } = this.state;

    const {
      match: {
        params: { id },
      },
    } = this.props;

    return (
      <div className={ styles.productDetailsPage }>
        <div className={ styles.productDetailsWrapper }>
          <header className={ styles.productDetailsPageHeader }>
            <CartLink cartLength={ cartLength } />
          </header>

          <main className={ styles.productDetailsPageContent }>
            {isLoading === true ? (
              <Loading />
            ) : (
              <Card product={ product } func={ this.handleAddToCart } />
            )}

            <Form id={ id } />
          </main>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  // location: PropTypes.shape({
  //   state: PropTypes.shape({
  //     cartProducts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
  //       .isRequired,
  //   }).isRequired,
  // }).isRequired,
};

export default ProductDetails;
