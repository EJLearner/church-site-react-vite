import {shallow} from 'enzyme';
import React from 'react';

import utils from '../../utils/commonUtils';
import constants from '../../utils/constants';

import CcRegistrationVolunteer from './CcRegistrationVolunteer';

jest.mock('../../utils/commonUtils.js');

describe('CcRegistrationVolunteer', () => {
  it('render BaseRegistrationVolunteer', () => {
    const wrapper = shallow(<CcRegistrationVolunteer />);

    expect(wrapper.find('BaseRegistrationVolunteer').exists()).toBe(true);
  });

  it('BaseRegistrationVolunteer has correct props', () => {
    CcRegistrationVolunteer.prototype.renderHeaderContent = jest.fn(
      () => 'Header Content',
    );

    const testYear = '2000';
    utils.getCcDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<CcRegistrationVolunteer />);
    const baseRegistrationChild = wrapper.find('BaseRegistrationVolunteer');

    expect(baseRegistrationChild.props().askAvailability).toBeFalsy();

    expect(baseRegistrationChild.props().className).toBe('registration-page');

    expect(baseRegistrationChild.props().volunteerIdPropName).toBe(
      constants.CC_REGISTERED_VOLUNTEER_ID_PROP,
    );

    expect(baseRegistrationChild.props().headerContent).toBe(
      wrapper.instance().renderHeaderContent(),
    );

    expect(baseRegistrationChild.props().refName).toBe(
      `${constants.CC_REGISTERED_VOLUNTEER_REF_NAME}/${testYear}`,
    );
  });
});
