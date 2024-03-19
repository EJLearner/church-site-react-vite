import {shallow} from 'enzyme';
import React from 'react';

import CcRegistrationLanding from './CcRegistrationLanding';

describe('CcRegistrationLanding', () => {
  it('renders without error', () => {
    expect(() => shallow(<CcRegistrationLanding />)).not.toThrow();
  });
});
