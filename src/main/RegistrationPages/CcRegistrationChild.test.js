import {shallow} from 'enzyme';
import React from 'react';

import routePaths from '../../routePaths';
import utils from '../../utils/commonUtils';
import constants from '../../utils/constants';

import CcRegistrationChild from './CcRegistrationChild';

jest.mock('../../utils/commonUtils.js');

describe('CcRegistrationChild', () => {
  it('render BaseCcRegistrationChild', () => {
    const wrapper = shallow(<CcRegistrationChild />);

    expect(wrapper.find('BaseCcRegistrationChild').exists()).toBe(true);
  });

  it('BaseCcRegistrationChild has correct props', () => {
    CcRegistrationChild.prototype.renderHeaderContent = jest.fn(
      () => 'Header Content',
    );

    const testYear = '2000';
    utils.getCcDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<CcRegistrationChild />);
    const baseRegistrationChild = wrapper.find('BaseCcRegistrationChild');

    expect(baseRegistrationChild.props().childIdPropName).toBe(
      constants.CC_REGISTERED_CHILD_ID_PROP,
    );

    expect(baseRegistrationChild.props().className).toBe('registration-page');

    expect(baseRegistrationChild.props().headerContent).toBe(
      wrapper.instance().renderHeaderContent(),
    );

    expect(baseRegistrationChild.props().refName).toBe(
      `${constants.CC_REGISTERED_CHILDREN_REF_NAME}/${testYear}`,
    );

    expect(baseRegistrationChild.props().routePath).toBe(
      routePaths.CE_CC_REG_CHILD,
    );
  });
});
