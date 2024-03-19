import {shallow} from 'enzyme';
import React from 'react';

import DisclaimerCheckbox from './DisclaimerCheckbox';

describe('DisclaimerCheckbox', () => {
  let props;

  beforeEach(() => {
    props = {
      checked: false,
      id: 'test-disclaimer-checkbox',
      onChange: jest.fn(),
    };
  });

  it('renders a checkbox', () => {
    const disclaimerCheckbox = shallow(<DisclaimerCheckbox {...props} />);
    expect(disclaimerCheckbox.find('Checkbox').exists()).toBeTrue;
  });

  it('checkbox has correct props', () => {
    const disclaimerCheckbox = shallow(<DisclaimerCheckbox {...props} />);
    const input = disclaimerCheckbox.find('input');

    expect(input.props().checked).toEqual(props.checked);
    expect(input.props().id).toEqual(props.id);
  });

  it('has label', () => {
    const disclaimerCheckbox = shallow(<DisclaimerCheckbox {...props} />);

    expect(disclaimerCheckbox.find('label').exists()).toBeTrue;
  });

  it('calls onChange prop function on change', () => {
    const disclaimerCheckbox = shallow(<DisclaimerCheckbox {...props} />);
    const input = disclaimerCheckbox.find('input');
    const testEvent = {target: {}};

    input.simulate('change', testEvent);

    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange.mock.calls[0]).toEqual([
      testEvent.target.checked,
      props.id,
      testEvent,
    ]);
  });
});
