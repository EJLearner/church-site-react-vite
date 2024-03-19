import {shallow} from 'enzyme';
import React from 'react';

import utils from '../../utils/commonUtils';
import constants from '../../utils/constants';

import VbsRegistrationVolunteer from './VbsRegistrationVolunteer';

jest.mock('../../utils/commonUtils.js');

describe('VbsRegistrationVolunteer', () => {
  it('render BaseRegistrationVolunteer', () => {
    const wrapper = shallow(<VbsRegistrationVolunteer />);

    expect(wrapper.find('BaseRegistrationVolunteer').exists()).toBe(true);
  });

  it('BaseRegistrationVolunteer has correct props', () => {
    VbsRegistrationVolunteer.prototype.renderHeaderContent = jest.fn(
      () => 'Header Content',
    );

    const testYear = '2000';
    utils.getVbsDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<VbsRegistrationVolunteer />);
    const baseRegistrationChild = wrapper.find('BaseRegistrationVolunteer');

    expect(baseRegistrationChild.props().askAvailability).toBe(true);

    expect(baseRegistrationChild.props().className).toBe('registration-page');

    expect(baseRegistrationChild.props().volunteerIdPropName).toBe(
      constants.VBS_REGISTERED_VOLUNTEER_ID_PROP,
    );

    expect(baseRegistrationChild.props().headerContent).toBe(
      wrapper.instance().renderHeaderContent(),
    );

    expect(baseRegistrationChild.props().refName).toBe(
      `${constants.VBS_REGISTERED_VOLUNTEER_REF_NAME}/${testYear}`,
    );
  });
});
