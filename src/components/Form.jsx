import React from 'react';
import { FiStar } from 'react-icons/fi';
import propTypes from 'prop-types';

import styles from '../styles/form.module.css';

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      evaluation: '',
      hasIssue: false,
      rating: '',
      reviews: [],
    };
  }

  componentDidMount = () => {
    const { id } = this.props;

    this.setState({ reviews: JSON.parse(localStorage.getItem(id)) || [] });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { email, evaluation, rating } = this.state;
    const { id } = this.props;

    if (email === '' || rating === '') {
      this.setState({ hasIssue: true });
      return;
    }

    const object = { email, evaluation, rating };

    this.storageReviews(id, object);
  };

  storageReviews = (product, newReview) => {
    this.setState(
      (prevState) => ({
        email: '',
        evaluation: '',
        hasIssue: false,
        reviews: [...prevState.reviews, newReview],
      }),
      () => {
        const { reviews } = this.state;

        localStorage.setItem(product, JSON.stringify(reviews));
      },
    );
  };

  render() {
    const { email, evaluation, hasIssue, reviews, rating } = this.state;
    const filledColor = 'rgba(0, 0, 0, 0.5)';

    return (
      <>
        <form className={ styles.form }>
          <div className={ styles.formWrapper }>
            <input
              name="email"
              type="text"
              value={ email }
              placeholder="E-mail"
              data-testid="product-detail-email"
              onChange={ this.handleChange }
            />
            <label htmlFor="rating1">
              <FiStar fill={ +rating >= 1 ? filledColor : 'none' } />
              <input
                type="radio"
                name="rating"
                id="rating1"
                value="1"
                data-testid="1-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="rating2">
              <FiStar fill={ +rating >= 2 ? filledColor : 'none' } />
              <input
                type="radio"
                name="rating"
                id="rating2"
                value="2"
                data-testid="2-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="rating3">
              <FiStar fill={ +rating >= 1 + 1 + 1 ? filledColor : 'none' } />
              <input
                type="radio"
                name="rating"
                id="rating3"
                value="3"
                data-testid="3-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="rating4">
              <FiStar fill={ +rating >= 2 + 2 ? filledColor : 'none' } />
              <input
                type="radio"
                name="rating"
                id="rating4"
                value="4"
                data-testid="4-rating"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="rating5">
              <FiStar fill={ +rating >= 2 + 2 + 1 ? filledColor : 'none' } />
              <input
                type="radio"
                name="rating"
                id="rating5"
                value="5"
                data-testid="5-rating"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <textarea
            cols="30"
            rows="10"
            value={ evaluation }
            data-testid="product-detail-evaluation"
            name="evaluation"
            onChange={ this.handleChange }
          />

          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.handleClick }
          >
            Avaliar
          </button>
        </form>
        {hasIssue && <p data-testid="error-msg">Campos inválidos</p>}
        {reviews.map((review) => (
          <div key={ Math.random() }>
            <p data-testid="review-card-email">{review.email}</p>
            <p data-testid="review-card-evaluation">{review.evaluation}</p>
            <p data-testid="review-card-rating">{review.rating}</p>
          </div>
        ))}
      </>
    );
  }
}

Form.propTypes = {
  id: propTypes.string.isRequired,
};

export default Form;
