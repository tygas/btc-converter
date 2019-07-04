import React, { useState } from 'react';

import './App.scss';
import Today from './Today/Today';
import CurrencySelector from './Today/CurrencySelector';

export const CURRENCY_PRICE_API = 'https://api.coindesk.com/v1/bpi/currentprice.json';
export const FETCH_TIMEOUT = 5000;

function App() {
  const [currencies, setCuriencies] = useState(['usd', 'eur', 'gbp']);
  const [amount, setAmount] = useState(0);

  return (
    <div className="">
      <div className="topheader">
        <header className="container">
          <h1 className="navbar-item loading">₿</h1>
        </header>
      </div>
      <section className="results--section">
        <div className="container">
          <h1>Convert your BTC holdings to FIAT?</h1>
        </div>
        <div className="results--section__inner">
          <form className="form">

            <input
              className="input"
              onChange={ee => setAmount(parseFloat(ee.target.value))}
              placeholder="Enter amount of ₿"
            />
            <CurrencySelector
              onChange={values => {
                values && setCuriencies(values.map(item => item.value));
              }}
              options={currencies}
            />
          </form>
          <Today amount={amount} currencies={currencies} />
        </div>
        <h4 className="center">Good time to buy was 5 years ago, next best time to buy is now</h4>
      </section>
    </div>
  );
}

export default App;
