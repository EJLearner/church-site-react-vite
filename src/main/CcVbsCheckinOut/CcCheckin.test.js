import {shallow} from 'enzyme';
import React from 'react';

import routePaths from '../../routePaths';
import commonUtils from '../../utils/commonUtils';
import constants from '../../utils/constants';

import CcCheckin from './CcCheckin';

describe('#render', () => {
  it('renders BaseCheckin', () => {
    const wrapper = shallow(<CcCheckin />);
    expect(wrapper.find('BaseCheckin').exists()).toBe(true);
  });

  it('BaseCheckin has correct properties', () => {
    const testYear = '2000';
    commonUtils.getCcDbYear = jest.fn(() => testYear);

    const wrapper = shallow(<CcCheckin />);
    const baseCheckin = wrapper.find('BaseCheckin');

    expect(baseCheckin.props().logbookRefName).toBe(
      constants.CC_LOGBOOK_REF_NAME,
    );

    expect(baseCheckin.props().registerLink).toBe(routePaths.CE_CC_REG_CHILD);

    expect(baseCheckin.props().registeredChildrenRefName).toBe(
      `${constants.CC_REGISTERED_CHILDREN_REF_NAME}/${testYear}`,
    );

    expect(baseCheckin.props().registryAccessRefName).toBe(
      constants.CC_REGISTRY_ACCESS_REF_NAME,
    );

    expect(baseCheckin.props().registryIdName).toBe(
      constants.CC_REGISTERED_CHILD_ID_PROP,
    );

    expect(baseCheckin.props().welcomeName).toBe('Children’s Church');
  });
});
