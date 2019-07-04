import React from 'react';
import PropTypes from 'prop-types';
import formatMoney from '../utils/helpers';

export const CryptoPrice = ({currency, price, amount = 1, isLoading = false}) => (
  <div className={`column ${currency}--section`}>
    <h5 className={isLoading && 'loading'}>{amount ? formatMoney(price * amount) : '-'}</h5>
    <p className="upper">{currency}</p>
  </div>
);

CryptoPrice.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isLoading: PropTypes.bool,
};
