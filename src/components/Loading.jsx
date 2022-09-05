import React from 'react';

import styles from '../styles/loading.module.css';

class Loading extends React.Component {
  render() {
    return (
      <div className={ styles.loadingContainer }>
        <h1>Carregando...</h1>
      </div>
    );
  }
}

export default Loading;
