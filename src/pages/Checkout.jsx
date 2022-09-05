/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartProducts } from '../services/cart';

import styles from '../styles/checkout.module.css';

export default class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      checkErroMsg: true,
      errorMsg: false,
      products: [],
      name: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereco: '',
      radio: '',
      // boleto: false,
      // visa: false,
      // masterCard: false,
      // elo: false,
    };
  }

  componentDidMount() {
    const dataProducts = getCartProducts();
    // console.log(dataProducts);
    this.setState({ products: dataProducts });
  }

  verifyInputs = () => {
    const { name, email, cpf, telefone, cep, endereco, radio } = this.state;
    const arrayInputs = [name, email, cpf, telefone, cep, endereco, radio];
    const verify = arrayInputs.some((input) => input.length === 0);
    // const finalVerify = verify && radio;
    // console.log(verify, radio);
    this.setState({ checkErroMsg: verify });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.verifyInputs());
  };

  handleRadios = ({ target: { value } }) => {
    // const value = target.checked;
    // console.log(value);
    this.setState({ radio: value }, () => this.verifyInputs());
  }

  handleSubmit = () => {
    // this.verifyInputs();
    const { checkErroMsg } = this.state;
    const { history } = this.props;
    // console.log(alertMsg);
    this.setState({ errorMsg: checkErroMsg }, () => {
      if (!checkErroMsg) {
        this.setState({ products: [] });
        localStorage.removeItem('cart-products');
        history.push('/');
      }
    });
  }

  render() {
    const { errorMsg, products, name, email, cpf, telefone, cep, endereco } = this.state;
    const mapProducts = products.map(({ id, length, price, thumbnail, title }) => (
      <li key={ id }>
        <p>{title}</p>
        <img src={ thumbnail } alt={ title } />
        <p>{ price }</p>
        <p>{ length }</p>
      </li>
    ));
    return (
      <div>
        <h2 className={ styles.title }>Checkout</h2>
        <section className={ styles.mainContainer }>
          <ul>{ mapProducts }</ul>
          { errorMsg && <p data-testid="error-msg">Campos inválidos</p> }
          <form>
            <div className={ styles.inputsWrapper }>
              <section className={ styles.personalData }>
                <p className={ styles.personalTitle }>Informações pessoais</p>
                <label htmlFor="inputName">
                  Nome completo:
                  <input
                    data-testid="checkout-fullname"
                    id="inputName"
                    type="text"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputEmail">
                  Email:
                  <input
                    data-testid="checkout-email"
                    id="inputEmail"
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputCpf">
                  CPF:
                  <input
                    data-testid="checkout-cpf"
                    id="inputCpf"
                    type="text"
                    name="cpf"
                    value={ cpf }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputTel">
                  Telefone:
                  <input
                    data-testid="checkout-phone"
                    id="inputTel"
                    type="text"
                    name="telefone"
                    value={ telefone }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputCep">
                  CEP:
                  <input
                    data-testid="checkout-cep"
                    id="inputCep"
                    type="text"
                    name="cep"
                    value={ cep }
                    onChange={ this.handleChange }
                  />
                </label>
                <label htmlFor="inputAddress">
                  Endereço:
                  <input
                    data-testid="checkout-address"
                    id="inputAddress"
                    type="text"
                    name="endereco"
                    value={ endereco }
                    onChange={ this.handleChange }
                  />
                </label>
              </section>
              <section>
                <section className={ styles.paymentData }>
                  <p className={ styles.personalTitle }>Escolha a forma de pagamento:</p>
                  <label htmlFor="boleto">
                    Boleto
                    <input
                      data-testid="ticket-payment"
                      type="radio"
                      id="boleto"
                      name="pagamento"
                      value="boleto"
                      onChange={ this.handleRadios }
                    />
                  </label>
                  <br />
                  <label htmlFor="visa">
                    Visa
                    <input
                      data-testid="visa-payment"
                      type="radio"
                      id="visa"
                      name="pagamento"
                      value="visa"
                      onChange={ this.handleRadios }
                    />
                  </label>
                  <br />
                  <label htmlFor="mc">
                    MasterCard
                    <input
                      data-testid="master-payment"
                      type="radio"
                      id="mc"
                      name="pagamento"
                      value="mastercard"
                      onChange={ this.handleRadios }
                    />
                  </label>
                  <br />
                  <label htmlFor="elo">
                    Elo
                    <input
                      data-testid="elo-payment"
                      type="radio"
                      id="elo"
                      name="pagamento"
                      value="elo"
                      onChange={ this.handleRadios }
                    />
                  </label>
                </section>
              </section>
            </div>
            <br />

            <button
              onClick={ this.handleSubmit }
              type="button"
              data-testid="checkout-btn"
            >
              Enviar

            </button>

          </form>
        </section>
      </div>
    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
