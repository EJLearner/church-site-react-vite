import PropTypes from 'prop-types';
import React from 'react';

import Checkbox from './Checkbox';

import './Checklist.css';

const Checklist = (props) => {
  const labelId = `${props.id}-label`;

  const renderedCheckboxes = props.checklistItems.map((checkbox, index) => {
    const ariaLabelledBy = index === 0 ? labelId : undefined;
    const {checked, disabled, label, value} = checkbox;
    return (
      <Checkbox
        ariaLabelledBy={ariaLabelledBy}
        checked={checked}
        disabled={disabled}
        id={value}
        inline={props.horizontal}
        key={value}
        label={label}
        onChange={props.onChange}
        value={value}
      />
    );
  });

  return (
    <div className="checklist-pattern">
      <label id={labelId}>
        {props.label}
        {props.required ? '*' : undefined}
      </label>
      {renderedCheckboxes}
    </div>
  );
};

Checklist.defaultProps = {
  horizontal: false,
  required: false,
};

Checklist.propTypes = {
  checklistItems: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  horizontal: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default Checklist;
