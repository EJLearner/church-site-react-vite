import {shallow} from 'enzyme';
import React from 'react';

import BaseRegistrationVolunteer from './BaseRegistrationVolunteer';

describe('BaseRegistrationVolunteer', () => {
  let props;
  beforeEach(() => {
    props = {
      refName: 'test-refname',
      volunteerIdPropName: 'volunteer',
    };
  });

  it('renders functional DisclaimerCheckbox', () => {
    const wrapper = shallow(<BaseRegistrationVolunteer {...props} />);
    const disclaimerCheckbox = wrapper.find('DisclaimerCheckbox');
    const checkboxId = 'agreementChecked';

    expect(disclaimerCheckbox.exists()).toBe(true);
    expect(disclaimerCheckbox.props().id).toBe(checkboxId);

    expect(disclaimerCheckbox.props().checked).toBeFalsy();

    disclaimerCheckbox.props().onChange(true, checkboxId);
    expect(wrapper.find('DisclaimerCheckbox').props().checked).toBeTruthy();

    disclaimerCheckbox.props().onChange(false, checkboxId);
    expect(wrapper.find('DisclaimerCheckbox').props().checked).toBeFalsy();
  });

  it('is not using test data', () => {
    const wrapper = shallow(<BaseRegistrationVolunteer {...props} />);

    expect(wrapper.state().address1).toBe('');
  });
});
