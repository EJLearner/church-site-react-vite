import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

import MainWrapper from './MainWrapper';

describe('MainWrapper', () => {
  it('renders', () => {
    render(<MainWrapper />, {wrapper: BrowserRouter});
  });
});
