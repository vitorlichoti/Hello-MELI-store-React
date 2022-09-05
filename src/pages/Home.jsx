import React from 'react';

import styles from '../styles/home.module.css';
import CardProducts from '../components/CardProducts';
import { getCategories } from '../services/api';
import { addProductToCart, getCartProducts } from '../services/cart';
import HomeHeader from '../components/HomeHeader';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      inputText: '',
      products: [],
      searchVerify: false,
      cartLength: getCartProducts().reduce(
        (current, product) => current + product.length,
        0,
      ),
      sortBy: 'default',
    };
  }

  componentDidMount = async () => {
    const data = await getCategories();
    this.setState({ categories: data });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSearch = async (event) => {
    event.preventDefault();

    const { inputText } = this.state;
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${inputText}`;
    const fetchApi = await fetch(URL);
    const response = await fetchApi.json();
    const data = response.results;
    this.setState({
      products: data,
      searchVerify: !data.length > 0,
      sortBy: 'default',
    });
  };

  categoriesSelector = async ({ target: { value } }) => {
    const CATEGORY_ID = value;
    const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`;
    const fetchApi = await fetch(URL);
    const response = await fetchApi.json();
    const data = response.results;
    this.setState({
      products: data,
      sortBy: 'default',
    });
  };

  addToCart = (product) => {
    const cart = getCartProducts();
    const { id, availableQuantity } = product;
    const item = cart.find((element) => element.id === id);

    if (!item || item.length < availableQuantity) {
      addProductToCart(product);

      this.setState((state) => ({
        cartLength: state.cartLength + 1,
      }));
    }
  };

  sortProductList = (a, b) => {
    const { sortBy } = this.state;

    if (sortBy === 'default') return a.sold_quantity - b.sold_quantity;

    if (sortBy === 'ascending') return a.price - b.price;

    return b.price - a.price;
  };

  render() {
    const { categories, products, searchVerify, sortBy,
      cartLength, handleChange, handleSearch } = this.state;
    const productList = products.sort(this.sortProductList)
      .map((
        { id, title, thumbnail, price, available_quantity: availableQuantity, shipping },
      ) => (
        <li key={ id } data-testid="product">
          <CardProducts
            id={ id }
            title={ title }
            thumbnail={ thumbnail }
            price={ price }
            shipping={ shipping }
            availableQuantity={ availableQuantity }
            addToCart={ this.addToCart }
          />
        </li>
      ));
    return (
      <div>
        <HomeHeader
          cartLength={ cartLength }
          handleChange={ handleChange }
          handleSearch={ handleSearch }
        />
        <select
          className={ styles.sorter }
          name="sortBy"
          onChange={ this.handleChange }
          value={ sortBy }
        >
          <option value="default">Ordem padrão</option>
          <option value="ascending">Ordem crescente</option>
          <option value="descending">Ordem decrescente</option>
        </select>
        <section className={ styles.mainSection }>
          <aside className={ styles.categories }>
            {categories.map(({ id, name }) => (
              <div key={ id }>
                <input
                  type="radio"
                  id={ id }
                  value={ id }
                  name="categories"
                  onClick={ this.categoriesSelector }
                />
                <label htmlFor={ id } data-testid="category">
                  {name}
                </label>
              </div>
            ))}
          </aside>
          <main>
            {searchVerify && (
              <p>Nenhum produto foi encontrado</p>
            )}
            <ul className={ styles.products }>{productList}</ul>
          </main>
        </section>
      </div>
    );
  }
}

export default Home;
