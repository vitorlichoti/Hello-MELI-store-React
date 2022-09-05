import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../assets/Logo.svg';
import styles from '../styles/home-header.module.css';
import CartLink from './CartLink';

class HomeHeader extends React.Component {
  render() {
    const { handleSearch, handleChange, cartLength } = this.props;

    return (
      <header className={ styles.homeHeader }>
        <div>
          <img className={ styles.homeHeaderLogo } src={ Logo } alt="Hello" />

          <form onSubmit={ handleSearch }>
            <div>
              <input
                type="text"
                data-testid="query-input"
                onChange={ handleChange }
              />

              <button type="submit" data-testid="query-button">
                Search
              </button>
            </div>
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          </form>

          <CartLink cartLength={ cartLength } />
        </div>
      </header>
    );
  }
}

HomeHeader.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  cartLength: PropTypes.number.isRequired,
};

export default HomeHeader;
