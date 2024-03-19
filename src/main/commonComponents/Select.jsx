import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import InputLabel from './InputLabel';

const SelectStyle = styled.div`
  display: inline-block;
  margin: 1em 16px 0.5em 0;

  select {
    background-color: white;
  }
`;

function renderedOptions(options) {
  return options.map((option) => {
    const {label, value} = option;

    return (
      <option key={value} value={value}>
        {label}
      </option>
    );
  });
}

const Select = ({
  className,
  onChange,
  id,
  labelSameLine,
  options,
  value,
  label,
}) => {
  return (
    <SelectStyle
      className={['select-outer-div', className].filter(Boolean).join(' ')}
    >
      {label && (
        <InputLabel htmlFor={id} inline={labelSameLine}>
          {label}
        </InputLabel>
      )}
      <select
        id={id}
        name={id}
        onChange={(event) => onChange(event.target.value, id, event)}
        value={value}
      >
        {renderedOptions(options)}
      </select>
    </SelectStyle>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  labelSameLine: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
};

export default Select;
