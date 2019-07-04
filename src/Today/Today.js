import PropTypes from 'prop-types';
import React, {Component} from 'react';
import axios from 'axios';

import {CryptoPrice} from './CryptoPrice';

import {CURRENCY_PRICE_API} from '../App';

import './Today.scss';

const RATE_UPDATE_TIMEOUT = 5000;

class Today extends Component {
  state = {
    amount: 0,
    eur: 0,
    gbp: 0,
    usd: 0,
    isFetching: false,
  };

  componentDidMount() {
    if (!global.navigator.onLine) {
      return this.restoreStateFromLocalStorage();
    }
    this.getConversionRates();
    this.cryptoSubscription = setInterval(this.getConversionRates, RATE_UPDATE_TIMEOUT);
  }

  componentWillUnmount() {
    clearInterval(this.cryptoSubscription);
  }

  getConversionRates = () => {
    this.setState({isFetching: true});
    axios.get(CURRENCY_PRICE_API)
      .then(({data}) => {
        const {bpi: {USD, GBP, EUR}, time: {updated}} = data;

        this.setState({
          usd: USD.rate_float,
          eur: EUR.rate_float,
          gbp: GBP.rate_float,
          updateTime: updated,
          isFetching: false,
        }, this.saveStateToLocalStorage);
      })
      .catch(
        // console.error
      );
  }

  saveStateToLocalStorage = () => {
    global.localStorage.setItem('today-state', JSON.stringify(this.state));
  };

  restoreStateFromLocalStorage = () => {
    const state = JSON.parse(global.localStorage.getItem('today-state'));
    this.setState(state);
  };

  render() {
    const {amount, currencies} = this.props;
    const {updated, isFetching} = this.state;
    return (
      <div className="today--section container">
        <h2>Current Price</h2>
        <div className="columns today--section__box">
          {currencies.length > 0 && Object.values(currencies)
            .map(currency => (
              <CryptoPrice
                isLoading={isFetching}
                key={currency}
                price={this.state[currency]}
                currency={currency}
                amount={amount}/> // eslint-disable-line
            ))}
        </div>
        <small>{updated}</small>
      </div>
    );
  }
}

Today.propTypes = {
  amount: PropTypes.number,
  currencies: PropTypes.array,
};

export default Today;
