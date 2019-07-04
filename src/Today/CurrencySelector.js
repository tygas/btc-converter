import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const options = [{
  value: 'usd',
  label: 'USD',
}, {
  value: 'eur',
  label: 'EUR',
}, {
  value: 'gbp',
  label: 'GBP',
}];

const CurrencySelector = ({ onChange }) => (
  <Select
    options={options}
    onChange={optionSelected => onChange(optionSelected)}
    isMulti
    defaultValue={options}
    className="currency-selector"
  />
);

CurrencySelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CurrencySelector;
