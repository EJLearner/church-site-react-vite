import {shallow} from 'enzyme';
import React from 'react';

import Menubar from './Menubar';

describe('MainHome', () => {
  it('renders', () => {
    expect(shallow(<Menubar menuItems={[]} />).exists()).toBe(true);
  });
});
