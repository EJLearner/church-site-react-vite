import {shallow} from 'enzyme';
import React from 'react';

import Textbox from '../commonComponents/Textbox';

import VbsRegistrationStudent, {STUDENT_TYPES} from './VbsRegistrationStudent';
jest.mock('../../utils/commonUtils.js');

describe('VbsRegistrationStudent', () => {
  let props;

  beforeEach(() => {
    props = {
      studentType: STUDENT_TYPES.ADULT,
    };
  });

  describe('for adult page type', () => {
    beforeEach(() => {
      props.studentType = STUDENT_TYPES.ADULT;
    });

    it('does not ask for child date of birth', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(wrapper.find('Text').find({id: 'childDob'}).exists()).toBe(false);
    });

    it('does not ask for parent name', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(wrapper.find('Text').find({id: 'parentName'}).exists()).toBe(
        false,
      );
    });

    it('does not have parent/guardian information header', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(wrapper.text()).not.toMatch('Guardian Information');
    });
  });

  describe('for child page type', () => {
    beforeEach(() => {
      props.studentType = STUDENT_TYPES.CHILD;
    });

    it('asks for child date of birth', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(wrapper.find(Textbox).find({id: 'childDob'}).exists()).toBe(true);
    });

    it('asks for parent name', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(wrapper.find(Textbox).find({id: 'parentName'}).exists()).toBe(
        true,
      );
    });

    it('has parent/guardian information header', () => {
      const wrapper = shallow(<VbsRegistrationStudent {...props} />);

      expect(wrapper.text()).toMatch('Guardian Information');
    });
  });

  it('renders functional DisclaimerCheckbox', () => {
    const wrapper = shallow(<VbsRegistrationStudent {...props} />);
    const disclaimerCheckbox = wrapper.find('DisclaimerCheckbox');
    const checkboxId = 'agreement-checked';

    expect(disclaimerCheckbox.exists()).toBe(true);
    expect(disclaimerCheckbox.props().id).toBe(checkboxId);

    expect(disclaimerCheckbox.props().checked).toBeFalsy();

    disclaimerCheckbox.props().onChange(true, checkboxId);
    expect(wrapper.find('DisclaimerCheckbox').props().checked).toBeTruthy();

    disclaimerCheckbox.props().onChange(false, checkboxId);
    expect(wrapper.find('DisclaimerCheckbox').props().checked).toBeFalsy();
  });
});
