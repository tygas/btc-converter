import waitUntil from 'async-wait-until';
import {shallow} from 'enzyme';
import nock from 'nock';
import React from 'react';

import Today from './Today';

describe('<Today />', () => {
  beforeAll(() => {
    // Prepare nock to respond to a request
    // to the weather API.
    // In this case our test will always think that london
    // is sunny.
    nock('https://api.coindesk.com/v1/bpi/currentprice.json')
      .get()
      .reply(200, {
        bpi: {
          USD: {
            rate_float: 100
          },
        }
      });
  });

  it('Component fetching weather from API', async (done) => {
    const root = shallow(<Today amount="1"/>);
    let today = {};
    await waitUntil(() => root.state('usd').usd);

    expect(today.usd).toEqual(100);
    done();
  });
});
