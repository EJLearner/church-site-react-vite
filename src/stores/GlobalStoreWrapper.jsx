import PropTypes from 'prop-types';
import React, {createContext, useReducer} from 'react';

import constants from '../utils/constants';
import {getCookie} from '../utils/cookieUtils';

import globalReducer from './globalReducer';

const {VIEWS} = constants;

const savedCartCookie = getCookie(constants.COOKIE_KEYS.CART_DATA);
const savedCartValue = savedCartCookie && JSON.parse(savedCartCookie);

const initialState = {
  cart: savedCartValue || {},
  viewInfo: {view: VIEWS.STORE_FRONT},
};

const GlobalStoreWrapper = ({children}) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

GlobalStoreWrapper.propTypes = {
  children: PropTypes.node,
};

export const Context = createContext(initialState);

export default GlobalStoreWrapper;
