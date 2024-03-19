import {shallow} from 'enzyme';
import React from 'react';

import routePaths from '../../routePaths';
import ErrorList from '../commonComponents/ErrorList';

import BaseCcRegistrationChild from './BaseCcRegistrationChild';

jest.mock('firebase');
jest.mock('./registrationUtils.js');

describe('BaseCcRegistrationChild', () => {
  let props;

  beforeEach(() => {
    jest.mock('firebase');
    jest.mock('./registrationUtils.js');

    props = {
      childIdPropName: 'testId',
      className: 'test-class',
      headerContent: <h1 id="header-content">test-header</h1>,
      refName: 'test-ref-name',
      routePath: '/test/path',
    };
  });

  it('should redirect if redirect state is truthy', () => {
    const wrapper = shallow(<BaseCcRegistrationChild {...props} />);
    wrapper.setState({redirect: true});

    const redirect = wrapper.find('Redirect');

    expect(redirect.exists()).toBe(true);
    expect(redirect.props().push).toBe(true);
    expect(redirect.props().to.pathname).toBe(routePaths.CE_THANK_YOU);
    expect(redirect.props().to.state.forMessage).toBe('you for registering.');
  });

  it('should render outer div with className from prop', () => {
    const wrapper = shallow(<BaseCcRegistrationChild {...props} />);

    expect(wrapper.find(`div.${props.className}`).exists()).toBe(true);
  });

  it('renders headerContent', () => {
    const wrapper = shallow(<BaseCcRegistrationChild {...props} />);

    expect(wrapper.containsMatchingElement(props.headerContent)).toBe(true);
  });

  it('render errors when error state is not empty', () => {
    const wrapper = shallow(<BaseCcRegistrationChild {...props} />);
    wrapper.setState({errors: ['one', 'two']});

    expect(
      wrapper.containsMatchingElement(
        <ErrorList errors={wrapper.state().errors} />,
      ),
    ).toBe(true);
  });

  it('does not render errors when error state is empty', () => {
    const wrapper = shallow(<BaseCcRegistrationChild {...props} />);
    wrapper.setState({errors: []});

    expect(
      wrapper.containsMatchingElement(
        <ErrorList errors={wrapper.state().errors} />,
      ),
    ).not.toBe(true);
  });

  it('renders functional DisclaimerCheckbox', () => {
    const wrapper = shallow(<BaseCcRegistrationChild {...props} />);
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
});
