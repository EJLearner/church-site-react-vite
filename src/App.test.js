import {shallow} from 'enzyme';
import moment from 'moment';
import React from 'react';

import App from './App';
import TopRoutes from './TopRoutes';

it('sets updateLocal function for moment', () => {
  moment.updateLocale = jest.fn();
  shallow(<App />);

  expect(moment.updateLocale.mock.calls).toHaveLength(1);

  expect(moment.updateLocale.mock.calls[0][0]).toBe('en');

  const meridiemFunction = moment.updateLocale.mock.calls[0][1].meridiem;
  expect(meridiemFunction(5)).toBe('am');
  expect(meridiemFunction(12)).toBe('pm');
  expect(meridiemFunction(22)).toBe('pm');
});

it('should render Routes', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(TopRoutes).exists()).toBe(true);
});
