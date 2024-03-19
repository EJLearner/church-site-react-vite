import {shallow} from 'enzyme';
import React from 'react';

import SubscribedEmailsAdmin from './SubscribedEmailsAdmin';

describe('', () => {
  it('render', () => {
    const wrapper = shallow(<SubscribedEmailsAdmin />);

    expect(wrapper.exists()).toBe(true);
  });
});
